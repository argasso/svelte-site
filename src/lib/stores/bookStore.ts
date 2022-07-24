import type { BookThumb, Filter, FilterParam } from 'src/types'
import { writable } from 'svelte/store'
import type { Readable } from 'svelte/store'
import { page } from '$app/stores'
import { getSingleValueQueryStore, updateQuery } from '$lib/URLSearchParamsStore'
import { sortBooks } from '$lib/utils/sortUtil'
import { browser } from '$app/env'

interface BookStoreValue {
  filters: Filter[]
  filtering: boolean
  books: BookThumb[]
  count: number
  page: number
  size: number
}

interface BookStoreApi {
  reset: () => void
  init: (books: BookThumb[], filters: Filter[]) => void
}

type FilterFn = (book: BookThumb, values: string[]) => boolean

const filterFn: Record<string, FilterFn> = {
  category: (book, values = []) =>
    values.length == 0 || values.some((value) => book.kategori?.some((k) => k.includes(value))),
  binding: (book, values = []) =>
    values.length == 0 || values.some((value) => book.generalDetails?.binding === value),
}

function getMostSpecificCriteria(query: URLSearchParams, key: string): string[] {
  const criterias = query?.getAll(key) || []
  return criterias.filter(
    (criteria, _index, array) => array.findIndex((c) => c.startsWith(`${criteria}/`)) === -1,
  )
}

function filter(query: URLSearchParams, key: string, book: BookThumb): boolean {
  const values = getMostSpecificCriteria(query, key)
  return values.length == 0 || filterFn[key](book, values)
}

export const bookStore = createBookStore()

function createBookStore(): Readable<BookStoreValue> & BookStoreApi {
  let books: BookThumb[] = []
  let filters: Filter[] = []
  let query: URLSearchParams
  let path: string

  const { subscribe, set } = writable(calculate(query))

  function filterBooks(query: URLSearchParams) {
    return books.filter((book) => filters.every((f) => filter(query, f.key, book)))
  }

  function pageBooks(b: BookThumb[]) {
    const page = (parseInt(query?.get('page')) || 1) - 1
    const size = parseInt(query?.get('size')) || 20
    const start = page * size
    const end = start + size
    const books = b.slice(start, end)
    return {
      page,
      size,
      books,
    }
  }

  function appendQuery(query: URLSearchParams, key: string, value: string): URLSearchParams {
    const newQuery = new URLSearchParams(query)
    newQuery.append(key, value)
    return newQuery
  }

  function calculateCount(
    query: URLSearchParams,
    key: string,
    params: FilterParam[],
  ): FilterParam[] {
    return params.map((p) => {
      const count = filterBooks(appendQuery(query, key, p.value)).length.toString()
      if (p.children) {
        const children = calculateCount(query, key, p.children)
        return { ...p, count, children }
      }
      return { ...p, count }
    })
  }

  function calculate(query: URLSearchParams): BookStoreValue {
    const filtered = filterBooks(query)
    const sorted = sortBooks(filtered, query?.get('sort'))
    const count = sorted.length
    const { page, size, books } = pageBooks(sorted)

    const filtering = filters.map((f) => query?.getAll(f.key) || []).some((v) => v.length > 0)
    const f = filters.map((f) => {
      const params = calculateCount(query, f.key, f.params)
      return { ...f, params }
    })

    return {
      filters: f,
      filtering,
      books,
      count,
      page,
      size,
    }
  }

  function handleQuery(oldPath: string, newPath: string, newQuery: URLSearchParams) {
    if (newPath != null && newPath !== oldPath) {
      const updatedQuery = new URLSearchParams(newQuery)
      filters.forEach((f) => updatedQuery.delete(f.key))
      addExpandedFilter(newPath, updatedQuery)
      if (browser) {
        updateQuery(updatedQuery, newPath)
      }
      return updatedQuery
    }
    return newQuery
  }

  return {
    subscribe,
    reset: () => {
      const newQuery = new URLSearchParams(query)
      filters.forEach((f) => newQuery.delete(f.key))
      updateQuery(newQuery, path)
    },
    init: (b: BookThumb[], f: Filter[]) => {
      books = b
      filters = f
      page.subscribe((p) => {
        // if (!p.url.pathname.startsWith('/boecker')) {
        //   return
        // }
        if (p.url.pathname != path || p.url.searchParams?.toString() != query?.toString()) {
          const updatedQuery = handleQuery(path, p.url.pathname, p.url.searchParams)
          path = p.url.pathname
          query = updatedQuery
          set(calculate(updatedQuery))
        }
      })
      set(calculate(query))
    },
  }
}

function addExpandedFilter(path: string, query: URLSearchParams) {
  const categories = path.split('/').filter((c) => c)
  if (categories.length > 1) {
    categories
      .map((_c, index) => categories.slice(0, index + 1).join('/'))
      .forEach((c) => {
        if (c !== 'boecker') {
          query.append('category', c)
        }
      })
  }
}
