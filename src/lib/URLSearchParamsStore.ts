import { goto } from '$app/navigation'

import { page } from '$app/stores'

function queryToObject(params) {
  const obj = {}
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key)
    } else {
      obj[key] = params.get(key)
    }
  }
  return obj
}

export function createQueryStore(prop: string) {
  let query = undefined
  let path: string
  page.subscribe((p) => {
    path = p.path
  })

  return {
    subscribe: (h) => {
      return page.subscribe((p) => {
        query = queryToObject(p.query)
        h(query[prop] || '')
      })
    },
    set: (v: string) => {
      if (v) {
        query[prop] = v
      } else {
        delete query[prop]
      }
      const urlSearchParams = new URLSearchParams(query).toString()
      const url = urlSearchParams.length > 0 ? `?${urlSearchParams}` : path
      // const url = `?${urlSearchParams}`
      goto(url, { keepfocus: true, replaceState: true, noscroll: true })
    },
  }
}
