import type { Collection } from '../config'
import seo from '../partials/seo'

const authorCollection: Collection = {
  name: 'Author',
  label: 'Författare',
  label_singular: 'Författare',
  folder: 'src/routes/foerfattare',
  create: true,
  slug: '{{slug}}',
  identifier_field: 'name',
  media_folder: '{{media_folder}}/foerfattare',
  public_folder: '{{public_folder}}/foerfattare',
  fields: [
    { label: 'Namn', name: 'name', widget: 'string' },
    {
      label: 'Publicerad',
      name: 'published',
      widget: 'boolean',
      required: false,
    },
    { label: 'Porträtt', name: 'image', widget: 'image', required: false },
    { label: 'Beskrivning', name: 'body', widget: 'markdown' },
    seo,
  ],
}

export default authorCollection
