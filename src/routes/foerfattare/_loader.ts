import type { AuthorResolved, LinkInfo, MdsvexModule, Slug } from 'src/types'
import type { Author } from 'src/types/netlify-types'

export function getAuthorLinkInfo(slug: string): LinkInfo {
  const author = getAuthor(slug)
  if (author) {
    const { name } = author
    return {
      name,
      href: `/foerfattare/${slug}`,
    }
  }
  return {
    name: slug.replace('-', ' '),
  }
}

export function getAuthor(slug: string): Author | undefined {
  return allAuthors().find((a) => a.slug === slug)
}

// export async function getAuthorModule(slug: string): Promise<MdsvexModule<Author>> {
//   return import(`./${slug}.md`)
// }

export function allAuthors(): (Author & Slug)[] {
  return Object.entries(
    import.meta.glob<MdsvexModule<AuthorResolved>>('./*.md', { eager: true }),
  ).map(([path, module]) => {
    const slug = path.replace('./', '').replace('.md', '')
    const metadata = module.metadata as Author
    return {
      ...metadata,
      slug,
    }
  })
}
