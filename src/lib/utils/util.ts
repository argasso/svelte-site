import type { CategoryContent } from '$lib/content/loader'
import type {
  CmsField,
  CmsFieldBase,
  CmsFieldMeta,
  CmsFieldObject,
  CmsFieldSelect,
} from 'netlify-cms-core'

export const slugFromPath = (path: string): string =>
  path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null

export function asArray(value?: string | string[]): string[] {
  const nonNull = value || []
  return Array.isArray(nonNull) ? nonNull : [nonNull]
}

export function unSlug(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/aa/g, 'å')
    .replace(/ae/g, 'ä')
    .replace(/oe/g, 'ö')
    .replace(/ue/g, 'ü')
    .toLowerCase()
}

export function slug(text: string): string {
  return text
    .replace(/ /g, '-')
    .replace(/å/g, 'aa')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .toLowerCase()
}

export function getObjectField(name: string, fields?: CmsField[]): CmsFieldBase & CmsFieldObject {
  const field = fields?.find((f) => f.name === name)
  if (field?.widget === 'object' && !isFieldMeta(field)) {
    return field
  }
  throw new Error('Field is not a CmsFieldObject')
}

export function getSelectField(name: string, fields?: CmsField[]): CmsFieldBase & CmsFieldSelect {
  const field = fields?.find((f) => f.name === name)
  if (field?.widget === 'select' && !isFieldMeta(field)) {
    return field
  }
  throw new Error('Field is not a CmsFieldSelect')
}

export function isFieldMeta(field: CmsField): field is CmsFieldBase & CmsFieldMeta {
  return (field as CmsFieldMeta).meta !== undefined
}

export type Crumb = {
  href?: string
  name: string
}

export function getCrumbs(category: CategoryContent, name?: string): Crumb[] {
  const crumbs: Crumb[] = getCategoryCrumbs(category).map((c) => ({
    href: c.slug,
    name: c.data.title,
  }))
  if (name) {
    crumbs.push({ name })
  }
  return crumbs
}

function getCategoryCrumbs(category: CategoryContent): CategoryContent[] {
  if (category.parent) {
    const c = getCategoryCrumbs(category.parent)
    c.push(category)
    return c
  } else {
    return [category]
  }
}
