import type { BookThumb, LinkInfo, MyRequestHandler, Slug } from 'src/types'
import type { Category } from 'src/types/netlify-types'
import { allBooks, mapBookThumb } from './bok/[slug].json'

const ENDPOINT_PREFIX = 'api/'
const ENDPOINT_SUFFIX = '.json'

type Output = {
  books: BookThumb[]
  breadcrumbs: LinkInfo[]
  categories: LinkInfo[]
}

export const get: MyRequestHandler<Output> = async ({ params }) => {
  const { slug } = params
  if (!slug.startsWith(ENDPOINT_PREFIX) || !slug.endsWith(ENDPOINT_SUFFIX)) {
    return
  }

  const category = getCategory(slug.replace(ENDPOINT_PREFIX, '').replace(ENDPOINT_SUFFIX, ''))
  if (category) {
    const books = await Promise.all(allBooks().map((b) => mapBookThumb(b)))

    const categories = allCategories()
      .filter(
        (c) =>
          c.slug.includes(category.slug) &&
          c.slug.split('/').length - category.slug.split('/').length == 1,
      )
      .map((c) => getCategoryLinkInfo(c))

    const breadcrumbs = getCategoryBreadcrumbs(category.slug)

    return {
      body: {
        books,
        categories,
        breadcrumbs,
      },
    }
  }
}

export function allCategories(): (Category & Slug)[] {
  return Object.entries(import.meta.globEager('./**/index.mdx')).map(([path, module]) => {
    const slug = path.replace('./', '').replace('/index.mdx', '')
    const metadata = module.metadata as Category
    return {
      ...metadata,
      slug,
    }
  })
}

export function getCategoryLinkInfo(category: Category & Slug): LinkInfo {
  return {
    name: category.title,
    href: `/${category.slug}`,
  }
}

export function getCategory(slug: string): Category & Slug {
  return allCategories().find((c) => c.slug === slug.replace('/index', ''))
}

export function getCategoryBreadcrumbs(categorySlug: string): LinkInfo[] {
  if (categorySlug) {
    const slug = categorySlug.replace('/index', '')
    return slug.split('/').reduce<LinkInfo[]>((prev, next, index) => {
      const parent = prev[index - 1]
      const slug = parent ? `${parent.href.slice(1)}/${next}` : next
      prev.push(getCategoryLinkInfo(getCategory(slug)))
      return prev
    }, [])
  }
  return []
}
