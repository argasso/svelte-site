import type { CategoryResolved, LinkInfo, MdsvexModule, Slug } from 'src/types'
import type { Category } from 'src/types/netlify-types'

export function allCategories(): (Category & Slug)[] {
  return Object.entries(
    import.meta.glob<MdsvexModule<CategoryResolved>>('./**/index.mdx', { eager: true }),
  ).map(([path, module]) => {
    const slug = path.replace('./', '').replace('/index.mdx', '')
    const metadata = module.metadata as Category
    return {
      ...metadata,
      slug,
    }
  })
}

export function getLinkInfo(category: Category & Slug): LinkInfo {
  return {
    name: category.title,
    href: `/${category.slug}`,
  }
}

export function getCategory(slug: string): (Category & Slug) | undefined {
  return allCategories().find((c) => c.slug === slug.replace('/index', ''))
}

export function getCategoryBreadcrumbs(categorySlug: string): LinkInfo[] {
  if (categorySlug) {
    const slug = categorySlug.replace('/index', '')
    return slug
      .split('/')
      .reduce<{ slug: string; link: LinkInfo }[]>((prev, next, index) => {
        const parent = prev[index - 1]
        const slug = parent ? `${parent.slug}/${next}` : next
        const category = getCategory(slug)
        const link = category
          ? {
              name: category.title,
              href: `/${slug}`,
            }
          : { name: unslug(next) }
        prev.push({ slug, link })
        return prev
      }, [])
      .map(({ link }) => link)
  }
  return []
}

function unslug(slug: string) {
  return slug
    .replace(/-/g, ' ')
    .replace(/aa/g, 'å')
    .replace(/ae/g, 'ä')
    .replace(/oe/g, 'ö')
    .replace(/ue/g, 'ü')
    .toLowerCase()
}
