import type { BookContent } from '$lib/content/loader'

const months = [
  'januari',
  'februari',
  'mars',
  'april',
  'maj',
  'juni',
  'juli',
  'augusti',
  'september',
  'oktober',
  'november',
  'december',
]

export type SortOption<T> = {
  title: string
  key: string
  sort: (items: T[]) => T[]
}

export type BookSortOption = SortOption<BookContent>

export function parseArgassoDate(book: BookContent): string {
  const argassoDate = book.data.generalDetails?.publishMonth || ''
  const parts = argassoDate.split(' ')
  if (parts.length == 2) {
    const monthIndex = months.indexOf(parts[0])
    return `${parts[1]}${monthIndex < 10 ? '0' : ''}${monthIndex}`
  }
  return ''
}

export const sortBookOnDateNewest: BookSortOption = {
  title: 'nyaste först',
  key: '',
  sort: (items) => items.sort((a, b) => parseArgassoDate(b).localeCompare(parseArgassoDate(a))),
}

export const sortBookOnDateOldest: BookSortOption = {
  title: 'äldsta först',
  key: 'oldest',
  sort: (items) => items.sort((a, b) => parseArgassoDate(a).localeCompare(parseArgassoDate(b))),
}

export const bookSorters = [sortBookOnDateNewest, sortBookOnDateOldest]
