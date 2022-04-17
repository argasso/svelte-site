import type { BookThumb, LinkInfo, MyRequestHandler, Slug } from 'src/types'
import type { Author } from 'src/types/netlify-types'
import { allBooks, mapBookThumb } from '../bok/[slug].json'

type Output = {
  authoredBooks: BookThumb[]
  breadcrumbs: LinkInfo[]
}

export const get: MyRequestHandler<Output> = async ({ params }) => {
  const { slug } = params

  const module = getAuthor(slug)
  if (module) {
    const authoredBooks = await Promise.all(
      allBooks()
        .filter((b) => b.author.includes(slug))
        .map((b) => mapBookThumb(b)),
    )
    const breadcrumbs = [getAuthorLinkInfo(slug)]
    return {
      body: {
        authoredBooks,
        breadcrumbs,
      },
    }
  }
}

export function getAuthorLinkInfo(slug: string): LinkInfo {
  const { name } = getAuthor(slug)
  return {
    name,
    href: `/foerfattare/${slug}`,
  }
}

export function getAuthor(slug: string): Author {
  return allAuthors().find((a) => a.slug === slug)
}

// export async function getAuthorModule(slug: string): Promise<MdsvexModule<Author>> {
//   return import(`./${slug}.md`)
// }

export function allAuthors(): (Author & Slug)[] {
  return Object.entries(import.meta.globEager('./*.md')).map(([path, module]) => {
    const slug = path.replace('./', '').replace('.md', '')
    const metadata = module.metadata as Author
    return {
      ...metadata,
      slug,
    }
  })
}
