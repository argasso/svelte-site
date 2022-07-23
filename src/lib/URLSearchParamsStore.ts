import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

const singleValueQueryStoreCache = {}

export function getSingleValueQueryStore(prop: string): Writable<string> {
  if (singleValueQueryStoreCache[prop] == null) {
    singleValueQueryStoreCache[prop] = createSingleValueQueryStore(prop)
  }
  return singleValueQueryStoreCache[prop]
}

function createSingleValueQueryStore(prop: string): Writable<string> {
  const { subscribe, set, update } = createQueryStore(prop)
  return {
    subscribe: (handler) => subscribe((value) => handler(value[0] || '')),
    set: (value) => set(value && value.length > 0 ? [value] : []),
    update: (updater) => update((values) => [updater(values[0] || '')]),
  }
}

const queryStoreCache = {}

export function getQueryStore(prop: string): Writable<string[]> {
  if (queryStoreCache[prop] == null) {
    queryStoreCache[prop] = createQueryStore(prop)
  }
  return queryStoreCache[prop]
}

function createQueryStore(prop: string): Writable<string[]> {
  const value = writable([] as string[])
  let path: string
  let query: URLSearchParams

  page.subscribe((p) => {
    path = p.url.pathname
    query = p.url.searchParams
    const next = query.getAll(prop)
    value.update((prev) => (arrayEquals(prev, next) ? prev : next))
  })

  const set = (values: string[]) => {
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
