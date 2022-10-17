import { unSlug } from '$lib/utils/util'
import type { PreviewTemplateComponentProps } from 'netlify-cms-core'
import type { AuthorResolved, BookResolved, BookThumb, CategoryResolved, LinkInfo } from 'src/types'
import type { Author, Book, Category } from 'src/types/netlify-types'

export type FieldsMetaData = PreviewTemplateComponentProps['fieldsMetaData']
export type Entry = PreviewTemplateComponentProps['entry']
export type WidgetFor = PreviewTemplateComponentProps['widgetFor']
export type GetAsset = PreviewTemplateComponentProps['getAsset']

export function getCategoryResolved(
  entry: Entry,
  fieldsMetaData: FieldsMetaData,
  getAsset: GetAsset,
): CategoryResolved {
  const data = entry.getIn(['data']).toJS() as Category
  const path = entry.getIn(['meta']).toJS().path as string
  const slug = path?.replace('src/routes/', '').replace('/index.md', '')
  const breadcrumbs = getBreadcrumbs(fieldsMetaData, slug)
  if (data.image) {
    const asset = getAsset(data.image)
    data.image = asset.toString()
  }
  const categories = ['Underkategori 1', 'Underkategori 2', 'Underkategori 3'].map((name) => ({
    name,
  }))
  return {
    ...data,
    slug,
    breadcrumbs,
    categories,
  }
}

export function getAuthorResolved(
  entry: Entry,
  fieldsMetaData: FieldsMetaData,
  getAsset: GetAsset,
): AuthorResolved {
  const data = entry.getIn(['data']).toJS() as Author
  const path = entry.getIn(['meta']).toJS().path as string
  const slug = path?.replace('src/routes/foerfattare/', '').replace('.md', '')
  const breadcrumbs = getBreadcrumbs(fieldsMetaData, 'information/foerfattare', data.name)
  const authoredBooks = [] as BookThumb[]
  if (data.image) {
    const asset = getAsset(data.image)
    data.image = asset.toString()
  }
  return {
    ...data,
    slug,
    breadcrumbs,
    authoredBooks,
  }
}

export function getBookResolved(
  entry: Entry,
  fieldsMetaData: FieldsMetaData,
  getAsset: GetAsset,
): BookResolved {
  const data = entry.getIn(['data']).toJS() as Book
  const path = entry.getIn(['meta']).toJS().path as string
  const slug = path?.replace('src/routes/bok/', '').replace('.md', '')
  const authors = getAuthors(fieldsMetaData, data.author)
  const breadcrumbs = getBreadcrumbs(fieldsMetaData, data.kategori?.[0] || '', data.title)
  console.log('breadcrumbs', breadcrumbs)
  const categories = getCategories(fieldsMetaData, data.kategori)
  if (data.image) {
    const asset = getAsset(data.image)
    data.image = asset.toString()
  }
  return {
    ...data,
    slug,
    authors,
    breadcrumbs,
    categories,
  }
}

export function getAuthors(fieldsMetaData: FieldsMetaData, slugs?: string[]): LinkInfo[] {
  return (
    slugs
      ?.map((slug) => getAuthor(fieldsMetaData, slug))
      .filter((name) => name != null)
      .map((name) => ({ name })) || []
  )
}

function getAuthor(fieldsMetaData: FieldsMetaData, slug: string): string {
  return fieldsMetaData.getIn(['author', 'Author', slug, 'name'])
}

export function getCategories(fieldsMetaData: FieldsMetaData, slugs?: string[]): LinkInfo[] {
  return (
    slugs
      ?.map((slug) => getCategory(fieldsMetaData, slug))
      .filter((title) => title != null)
      .map((name) => ({ name })) || []
  )
}

function getCategory(fieldsMetaData: FieldsMetaData, slug: string): string {
  return fieldsMetaData.getIn(['kategori', 'Category', slug, 'title'])
}

export function getBreadcrumbs(
  fieldsMetaData: FieldsMetaData,
  category: string,
  name?: string,
): LinkInfo[] {
  const breadcrumbs = category
    .replace('/index', '')
    .split('/')
    .reduce((prev, next, index) => {
      const parent = prev[index - 1]
      const slug = parent ? `${parent.slug}/${next}` : next
      const name = getCategory(fieldsMetaData, slug + '/index') || unSlug(next)
      prev.push({ name, slug })
      return prev
    }, [] as { name: string; slug: string }[])
    .map(({ name }) => ({ name }))
  if (name) {
    breadcrumbs.push({ name })
  }
  return breadcrumbs
}
