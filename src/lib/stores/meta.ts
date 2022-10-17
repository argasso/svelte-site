import { writable } from 'svelte/store'
import type { AuthorResolved, BookResolved, CategoryResolved } from 'src/types'

export const bookMeta = writable<BookResolved>()

export const authorMeta = writable<AuthorResolved>()

export const categoryMeta = writable<CategoryResolved>()
