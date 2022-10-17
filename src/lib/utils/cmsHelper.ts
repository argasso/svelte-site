import type {
  CMS,
  CmsFieldObject,
  CmsFieldSelect,
  CmsFieldBase,
  CmsField,
  CmsFieldMeta,
} from 'netlify-cms-core'
import { getDocumentStyles } from '$lib/utils/documentHelper'
import Img from '$lib/components/Img.svelte'
import KatalogForm from '$lib/components/KatalogForm.svelte'
import toReact from '$lib/admin/SvelteInReact'
import { AvoidH1 } from '$lib/admin/components/AvoidElement'
import AuthorPreview from '$lib/admin/preview/AuthorPreview.svelte'
import BookPreview from '$lib/admin/preview/BookPreview.svelte'
import CategoryPreview from '$lib/admin/preview/CategoryPreview.svelte'

export const mdPlugins = []

const ReactImg = toReact(Img)
const ReactKatalogForm = toReact(KatalogForm)

const components = {
  img: ReactImg,
  h1: AvoidH1,
}

const scope = {
  Components: {
    KatalogForm: ReactKatalogForm,
  },
}

export async function customizeCms(cms: CMS) {
  await registerMdxWidget(cms)
  registerPreviewStyle(cms)
  registerPreviewTemplates(cms)
}

async function registerMdxWidget(cms: CMS) {
  const { MdxControl, setupPreview } = await import('netlify-cms-widget-mdx')
  const preview = setupPreview({
    components,
    scope,
    mdPlugins,
  })
  cms.registerWidget('mdx', MdxControl, preview)
}

function registerPreviewStyle(cms: CMS) {
  const styles = getDocumentStyles()
  cms.registerPreviewStyle(styles, { raw: true })
}

function registerPreviewTemplates(cms: CMS) {
  cms.registerPreviewTemplate('Category', toReact(CategoryPreview))
  cms.registerPreviewTemplate('Author', toReact(AuthorPreview))
  cms.registerPreviewTemplate('Book', toReact(BookPreview))
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
