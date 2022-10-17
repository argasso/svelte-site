import type { Collection } from '../config'
import seo from '../partials/seo'

const bookCollection: Collection = {
  name: 'Book',
  label: 'Böcker',
  label_singular: 'Bok',
  folder: 'src/routes/bok',
  create: true,
  slug: '{{slug}}',
  media_folder: '{{media_folder}}/boecker',
  public_folder: '{{public_folder}}/boecker',
  preview_path: '/boecker/{{slug}}',
  fields: [
    { label: 'Titel', name: 'title', widget: 'string' },
    {
      label: 'Författare',
      name: 'author',
      widget: 'relation',
      collection: 'Author',
      search_fields: ['name'],
      value_field: '{{slug}}',
      display_fields: ['name'],
      multiple: true,
    },
    {
      label: 'Kategori',
      name: 'kategori',
      widget: 'relation',
      collection: 'Category',
      search_fields: ['title'],
      value_field: '{{slug}}',
      display_fields: ['title'],
      multiple: true,
      required: false,
    },
    {
      label: 'ISBN',
      name: 'isbn',
      widget: 'string',
      pattern: ['[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*', 'Must be ISBN format'],
    },
    {
      label: 'Pris',
      name: 'price',
      widget: 'number',
      value_type: 'int',
      min: 1,
      max: 999,
      required: false,
    },
    {
      label: 'Publicerad',
      name: 'published',
      widget: 'boolean',
      required: false,
    },

    {
      label: 'Utgått',
      name: 'discontinued',
      widget: 'boolean',
      required: false,
    },
    { label: 'Omslag', name: 'image', widget: 'image', required: false },
    {
      label: 'Kort Beskrivning',
      name: 'shortDescription',
      widget: 'text',
      required: false,
    },
    { label: 'Fullständig Beskrivning', name: 'body', widget: 'markdown' },
    {
      label: 'Detaljer',
      hint: 'Information som visas i en faktaruta.',
      name: 'generalDetails',
      widget: 'object',
      required: false,
      fields: [
        {
          label: 'Illustrationer',
          name: 'illustrations',
          widget: 'string',
          required: false,
        },
        {
          label: 'Manusbearbetning',
          name: 'manuscript',
          widget: 'string',
          required: false,
        },
        {
          label: 'Utgivningsmånad',
          name: 'publishMonth',
          widget: 'datetime',
          format: 'MMM -YY',
          time_format: false,
          required: false,
        },
        {
          label: 'Bindning',
          name: 'binding',
          widget: 'select',
          options: ['Kartonnage', 'Häftad', 'Inbunden', 'Flexband', 'Danskt band', 'CD-bok'],
          required: false,
        },
        {
          label: 'Rekommenderad ålder',
          name: 'age',
          widget: 'string',
          required: false,
        },
        {
          label: 'Antal sidor',
          name: 'numPages',
          widget: 'string',
          required: false,
        },
      ],
    },
    {
      label: 'Översatt bok',
      name: 'translationDetails',
      hint: 'Extra information för översatta böcker, visas i faktarutan.',
      widget: 'object',
      required: false,
      fields: [
        {
          label: 'Översättare',
          name: 'translator',
          widget: 'string',
          required: false,
        },
        {
          label: 'Orginaltitel',
          name: 'originalTitle',
          widget: 'string',
          required: false,
        },
        {
          label: 'Innehåller',
          hint: 'T.ex. antal cd, dvs Innehåller: 2 cd.',
          name: 'contains',
          widget: 'string',
          required: false,
        },
      ],
    },
    {
      label: 'Ljudbok',
      name: 'audioDetails',
      hint: 'Extra information för översatta böcker, visas i faktarutan.',
      widget: 'object',
      required: false,
      fields: [
        {
          label: 'Speltid',
          name: 'duration',
          widget: 'string',
          required: false,
        },
        {
          label: 'Uppläsare',
          name: 'reciter',
          widget: 'string',
          required: false,
        },
      ],
    },
    seo,
  ],
}

export default bookCollection
