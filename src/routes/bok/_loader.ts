import type { BookResolved, BookThumb, LinkInfo, MdsvexModule, Slug } from 'src/types'
import type { Book } from 'src/types/netlify-types'
import { getAuthorLinkInfo } from '../foerfattare/_loader'

const PATH = '/bok'

export function allBooks(): (Book & Slug)[] {
  return Object.entries(
    import.meta.glob<MdsvexModule<BookResolved>>('./*.md', { eager: true }),
  ).map(([path, module]) => {
    const slug = path.replace('./', '').replace('.md', '')
    const metadata = module.metadata as Book
    return {
      ...metadata,
      slug,
    }
  })
}

export function getBookThumb(slug: string): BookThumb | undefined {
  const book = getBook(slug)
  if (book) {
    return mapBookThumb(book)
  }
}

export function mapBookThumb(book: Book & Slug): BookThumb {
  const authors = book.author?.map((slug) => getAuthorLinkInfo(slug)).filter((a) => a != null) || []
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

function getBook(slug: string): (Book & Slug) | undefined {
  return allBooks().find((b) => b.slug === slug)
}

function getBookLinkInfo(book: Book & Slug): LinkInfo {
  return {
    name: book.title,
    href: `${PATH}/${book.slug}`,
  }
}
