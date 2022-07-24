import type {
  CMS,
  CmsFieldObject,
  CmsFieldSelect,
  CmsFieldBase,
  CmsField,
  CmsFieldMeta,
} from 'netlify-cms-core'
import { getDocumentStyles } from '$lib/utils/documentHelper'
import React from 'react'
import type { ReactElement, RefObject } from 'react'
import MdxComponent from './MdxComponent'
import { PreviewTemplateMenysida } from '$lib/admin/components/PreviewTemplateMenysida'

const mdxComponentElementNames = ['blockquote', 'ul', 'li', 'img', 'KatalogForm']
export const mdxComponents = mdxComponentElementNames.reduce((obj, name) => {
  obj[name] = (props) => {
    console.log('mdx bridge', 'name', name, 'props', props)
    return MdxComponent({ ...props, name })
  }
  return obj
}, {})

export const mdPlugins = []

const components = {
  ...mdxComponents,
  // KatalogForm: (props) => {
  //   console.log('cmsHelper (components)', 'props', props)
  //   return MdxComponent({ ...props, name: 'KatalogForm' })
  // },
  // 'Components.KatalogForm': (props) => {
  //   console.log('cmsHelper (components)', 'props', props)
  //   return MdxComponent({ ...props, name: 'KatalogForm' })
  // },
}

const scope = {
  KatalogForm: (props) => {
    console.log('cmsHelper (scope)', 'props', props)
    return MdxComponent({ ...props, name: 'KatalogForm' })
  },
}

// const Avoid: FC<{ label: string; message: string }> = ({ label, message, children }) => (
//   <div className="border-red-700 border-2 p-1 rounded bg-red-50">
//     {children}
//     <p className="text-red-700">
//       Undvik <code>{label}</code>. {message}
//     </p>
//   </div>
// )

// function AvoidH1(props: PropsWithChildren<{}>) {
//   return (
//     <Avoid label="H1" message="'Titel' visas som H1. Rekommendationen är att ha en H1 per sida. ">
//       <H1 {...props} />
//     </Avoid>
//   )
// }

export async function customizeCms(cms: CMS) {
  await registerMdxWidget(cms)
  registerPreviewStyle(cms)
  registerPreviewTemplates(cms)
}

async function registerMdxWidget(cms: CMS) {
  const mdx = await import('netlify-cms-widget-mdx')

  const preview = mdx.setupPreview({
    components,
    scope,
    mdPlugins,
  })
  const control = mdx.MdxControl
  cms.registerWidget('mdx', control, preview)
}

function registerPreviewStyle(cms: CMS) {
  const styles = getDocumentStyles()
  cms.registerPreviewStyle(styles, { raw: true })
}

function registerPreviewTemplates(cms: CMS) {
  cms.registerPreviewTemplate('Category', PreviewTemplateMenysida)
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

type Props = {
  this: any
}

export default class SvelteComponent extends React.Component<Props> {
  container: RefObject<any>
  instance: any
  div: ReactElement<JSX.IntrinsicElements['div']>
  constructor(props: Props) {
    super(props)

    this.container = React.createRef()
    this.instance = null
    this.div = React.createElement('div', { ref: this.container })
  }

  componentDidMount(): void {
    const { this: Constructor, ...data } = this.props

    this.instance = new Constructor({
      target: this.container.current,
      data,
    })
  }

  componentDidUpdate(): void {
    this.instance.set(this.props)
  }

  componentWillUnmount(): void {
    this.instance.destroy()
  }

  render() {
    return this.div
  }
}
