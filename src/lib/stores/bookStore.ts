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
  console.log('filter()', key, values)
  return values.length == 0 || filterFn[key](book, values)
}

interface BookFilterStore {
  books: BookThumb[]
  total: number
  filters: Filter[]
}

interface BookFilterStoreApi {
  reset: () => void
}

type Store = Readable<BookFilterStore> & BookFilterStoreApi

export function createBookFilterStore(books: BookThumb[], filters: Filter[]): Store {
  const total = books.length
  let query: URLSearchParams
  let path: string

  const value = calculate(query)
  console.log(value)
  const { subscribe, set } = writable(value)

  page.subscribe((p) => {
    path = p.path
    query = p.query

    const value = calculate(query)
    set(value)
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
      const count = filterBooks(appendQuery(key, p.value)).length
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

    const f = filters.map((f) => {
      const params = calculateCount(f.key, f.params)
      return { ...f, params }
    })

    return {
      books: sortedBooks,
      total,
      filters: f,
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
