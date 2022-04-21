import type { BookThumb, Filter, FilterParam } from 'src/types'
import { writable } from 'svelte/store'
import type { Readable } from 'svelte/store'
import { page } from '$app/stores'
import { updateQuery } from '$lib/URLSearchParamsStore'
import { bookSorters } from '$lib/utils/sortUtil'

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
  // console.log('filter()', key, values)
  return values.length == 0 || filterFn[key](book, values)
}

interface BookFilterStore {
  books: BookThumb[]
  total: number
  filters: Filter[]
  filtering: boolean
  pageing: Pageing
}

export interface Pageing {
  count: number
  page: number
  size: number
}

interface BookFilterStoreApi {
  reset: () => void
}

export type Store = Readable<BookFilterStore> & BookFilterStoreApi

export function createBookFilterStore(books: BookThumb[], filters: Filter[]): Store {
  const total = books.length
  let query: URLSearchParams
  let path: string

  // console.log('createBookFilterStore')
  const value = calculate(query)
  const { subscribe, set } = writable(value)

  page.subscribe((p) => {
    path = p.path
    query = p.query
    set(calculate(query))
  })

  function filterBooks(query: URLSearchParams) {
    return books.filter((book) => filters.every((f) => filter(query, f.key, book)))
  }

  function appendQuery(key: string, value: string): URLSearchParams {
    const newQuery = new URLSearchParams(query)
    newQuery.append(key, value)
    return newQuery
  }

  function calculateCount(key: string, params: FilterParam[]): FilterParam[] {
    return params.map((p) => {
      const count = filterBooks(appendQuery(key, p.value)).length.toString()
      if (p.children) {
        const children = calculateCount(key, p.children)
        return { ...p, count, children }
      }
      return { ...p, count }
    })
  }

  function calculate(query: URLSearchParams): BookFilterStore {
    const filteredBooks = filterBooks(query)
    const sorter = bookSorters.find((sorter) => sorter.key === query?.get('sort')) || bookSorters[0]
    const sortedBooks = sorter.sort(filteredBooks)
    const page = (parseInt(query?.get('page')) || 1) - 1
    const size = parseInt(query?.get('size')) || 20
    const start = page * size
    const end = start + size
    const pagedBooks = sortedBooks.slice(start, end)

    const f = filters.map((f) => {
      const params = calculateCount(f.key, f.params)
      return { ...f, params }
    })
    const filtering = filters.map((f) => query?.getAll(f.key) || []).some((v) => v.length > 0)
    // console.log({ page, size, start, end, count: sortedBooks.length, pagedBooks, filtering })

    // console.log('calculate new filters', f)
    return {
      books: pagedBooks,
      total,
      filters: f,
      filtering,
      pageing: {
        count: sortedBooks.length,
        page,
        size,
      },
    }
  }

  return {
    subscribe,
    reset: () => {
      const newQuery = new URLSearchParams(query)
      filters.forEach((f) => newQuery.delete(f.key))
      updateQuery(newQuery, path)
    },
  }
}
