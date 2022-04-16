import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export function createSingleValueQueryStore(prop: string): Writable<string> {
  const { subscribe, set, update } = createQueryStore(prop)
  return {
    subscribe: (handler) => subscribe((value) => handler(value[0] || '')),
    set: (value) => set(value && value.length > 0 ? [value] : []),
    update: (updater) => update((values) => [updater(values[0] || '')]),
  }
}

export function createQueryStore(prop: string): Writable<string[]> {
  const value = writable([] as string[])
  let path: string
  let query: URLSearchParams
  //let subs: Subscriber<string[]>[] = []
  //const d = derived(page, ($page => $page.query.getAll(prop)))

  page.subscribe((p) => {
    path = p.path
    query = p.query
    const next = query.getAll(prop)
    value.update((prev) => (arrayEquals(prev, next) ? prev : next))
  })

  // const subscribe = (h: Subscriber<string[]>) => {
  //   return page.subscribe((p) => {
  //     const query = p.query
  //     if (query.has(prop)) {
  //       console.log('subscribe has prop', prop, query.has(prop))
  //       h(query.getAll(prop))
  //     } else {
  //       console.log('subscribe has NOT prop', prop)
  //       h([])
  //     }
  //   })
  // }
  // const subscribe = (handler: Subscriber<string[]>) => {
  //   subs = [...subs, handler] // add handler to the array of subscribers
  //   handler(value) // call handler with current value
  //   return () => (subs = subs.filter((sub) => sub !== handler)) // return unsubscribe function
  // }

  const set = (values: string[]) => {
    // const current = get(value)
    // if (arrayEquals(current, values)) {
    //   return
    // }
    if (arrayEquals(query.getAll(prop), values)) {
      return
    }
    const newQuery = new URLSearchParams(query)
    newQuery.delete(prop)
    values.forEach((v) => {
      newQuery.append(prop, v)
    })
    updateQuery(newQuery, path)
  }

  const update = (updater) => {
    const values = query.getAll(prop)
    const updated = updater(values)
    set(updated)
  }

  return {
    subscribe: (handler) => value.subscribe((v) => handler(v)),
    set,
    update,
  }
}

export function updateQuery(query: URLSearchParams, path: string): void {
  const queryString = query.toString()
  const url = queryString.length > 0 ? `?${queryString}` : path
  goto(url, { keepfocus: true, replaceState: true, noscroll: true })
}

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}