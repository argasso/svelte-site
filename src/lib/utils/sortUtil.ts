import type { BookThumb } from 'src/types'

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

type SortOption<T> = {
  title: string
  key: string
  sort: (items: T[]) => T[]
}

type BookSortOption = SortOption<BookThumb>

function parseArgassoDate(book: BookThumb): string {
  const argassoDate = book.generalDetails?.publishMonth || ''
  const parts = argassoDate.split(' ')
  if (parts.length == 2) {
    const monthIndex = months.indexOf(parts[0])
    return `${parts[1]}${monthIndex < 10 ? '0' : ''}${monthIndex}`
  }
  return ''
}

const sortBookOnDateNewest: BookSortOption = {
  title: 'nyaste först',
  key: '',
  sort: (items) => items.sort((a, b) => parseArgassoDate(b).localeCompare(parseArgassoDate(a))),
}

const sortBookOnDateOldest: BookSortOption = {
  title: 'äldsta först',
  key: 'oldest',
  sort: (items) => items.sort((a, b) => parseArgassoDate(a).localeCompare(parseArgassoDate(b))),
}

export const bookSorters = [sortBookOnDateNewest, sortBookOnDateOldest]

export function sortBooks(books: BookThumb[], key = ''): BookThumb[] {
  const sorter = bookSorters.find((s) => s.key === key) || bookSorters[0]
  return sorter.sort(books)
}
