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

export const unSlug = (slug: string): string => {
  return slug
    .replace(/-/g, ' ')
    .replace(/aa/g, 'å')
    .replace(/ae/g, 'ä')
    .replace(/oe/g, 'ö')
    .replace(/ue/g, 'ü')
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
