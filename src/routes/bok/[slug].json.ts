import type { BookThumb, LinkInfo, MyRequestHandler, Slug } from 'src/types'
import type { Book } from 'src/types/netlify-types'
import { getAuthorLinkInfo } from '../foerfattare/[slug].json'
import { getCategory, getCategoryBreadcrumbs, getCategoryLinkInfo } from '../[...slug]'

const PATH = '/bok'

type Output = {
  authors: LinkInfo[]
  breadcrumbs: LinkInfo[]
  categories: LinkInfo[]
}

export const get: MyRequestHandler<Output> = async ({ params }) => {
  const { slug } = params

  const book = getBook(slug)
  if (book) {
    const authors = book.author?.map((slug) => getAuthorLinkInfo(slug)) || []
    const breadcrumbs = [...getCategoryBreadcrumbs(book.kategori?.[0]), getBookLinkInfo(book)]
    const categories = book.kategori
      .map((slug) => getCategory(slug))
      .filter((c) => c != null)
      .map((c) => getCategoryLinkInfo(c))
    return {
      body: {
        authors,
        breadcrumbs,
        categories,
      },
    }
  }
}

export function allBooks(): (Book & Slug)[] {
  return Object.entries(import.meta.globEager('./*.md')).map(([path, module]) => {
    const slug = path.replace('./', '').replace('.md', '')
    const metadata = module.metadata as Book
    return {
      ...metadata,
      slug,
    }
  })
}

export function getBookThumb(slug: string): BookThumb {
  const book = getBook(slug)
  return mapBookThumb({ ...book, slug })
}

export function mapBookThumb(book: Book & Slug): BookThumb {
  const authors = book.author?.map((slug) => getAuthorLinkInfo(slug)) || []
  const { title, image, slug, generalDetails, kategori } = book
  const href = `${PATH}/${slug}`
  return {
    title,
    image,
    href,
    authors,
    generalDetails,
    kategori,
  }
}

function getBook(slug: string): Book & Slug {
  return allBooks().find((b) => b.slug === slug)
}

function getBookLinkInfo(book: Book & Slug): LinkInfo {
  return {
    name: book.title,
    href: `${PATH}/${book.slug}`,
  }
}
