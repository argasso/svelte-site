import type { RequestHandler } from '@sveltejs/kit'
import type { SvelteComponent } from 'svelte'
import type { Author, Book, Category, StartPage } from './netlify-types'

export type MdsvexModule<T> = {
  default: SvelteComponent
  metadata: T
}

export type Slug = {
  slug: string
}

export type BookThumb = Pick<Book, 'title' | 'image' | 'generalDetails' | 'kategori'> & {
  href: string
  authors: LinkInfo[]
  hidden?: boolean
  categories?: LinkInfo[]
}

export type BookThumbPromo = BookThumb & {
  text: string
}

type Resolved = Slug & {
  breadcrumbs: LinkInfo[]
}

export type BookResolved = Resolved &
  Book & {
    authors: LinkInfo[]
    categories: LinkInfo[]
  }

export type AuthorResolved = Resolved &
  Author & {
    authoredBooks: BookThumb[]
  }

export type CategoryResolved = Resolved &
  Category & {
    categories: LinkInfo[]
  }

export type StartpageResolved = StartPage & {
  nyheterResolved: BookThumbPromo[]
  kommandeResolved: BookThumbPromo[]
}

export interface LinkInfo {
  href?: string
  name: string
}

export interface Filter {
  title: string
  key: string
  params: FilterParam[]
}

export interface FilterParam {
  label: string
  value: string
  children: FilterParam[]
  count?: string
}

type Typify<T> = { [K in keyof T]: Typify<T[K]> }

export type MyRequestHandler<T> = RequestHandler<Record<string, string>, Typify<T>>
