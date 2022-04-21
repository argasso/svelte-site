import type { RequestHandler } from '@sveltejs/kit'
import type { SvelteComponent } from 'svelte'
import type { Book } from './netlify-types'

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
}

export type BookThumbPromo = BookThumb & {
  text: string
  categories: LinkInfo[]
}

export interface LinkInfo {
  href: string
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

export type MyRequestHandler<T> = RequestHandler<Record<string, any>, unknown, Typify<T>>
