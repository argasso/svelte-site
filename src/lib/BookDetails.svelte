<script lang="ts">
  import type { CmsField } from 'netlify-cms-core'
  import bookCollection from './cms/collections/bookCollection'
  import { isFieldMeta } from './utils/util'
  import type { Book } from 'src/types/netlify-types'
  import type { LinkInfo } from 'src/types'
  import Pill from './Pill.svelte'

  export let details: Pick<Book, 'generalDetails' | 'translationDetails' | 'audioDetails'>
  export let categories: LinkInfo[] = []

  $: labels = reduceLabels(bookCollection.fields || [])

  function reduceLabels(fields: CmsField[]): { [key: string]: string } {
    return (
      fields.reduce<{ [key: string]: string }>((acc, val) => {
        if (val?.widget === 'object' && !isFieldMeta(val)) {
          const subLabels = reduceLabels(val.fields)
          return { ...acc, ...subLabels }
        } else if (val.name && val.label) {
          acc[val.name] = val.label
        }
        return acc
      }, {}) || {}
    )
  }

  $: rows = Object.entries({
    ...details.generalDetails,
    ...details.audioDetails,
    ...details.translationDetails,
  })
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg m-1">
  <div class="px-4 py-1 text-gray-500 bg-gray-100">
    <h4>Detaljer</h4>
  </div>
  <div class="border-t border-gray-200">
    <dl>
      <div class="bg-white px-5 py-3 grid grid-cols-3 gap-4">
        <dt class="text-sm font-medium text-gray-500 overflow-hidden text-ellipsis">
          Ingår i kategori
        </dt>
        <dd class="col-span-2 text-sm text-gray-900">
          {#each categories as category}
            <Pill {category} />
          {/each}
        </dd>
      </div>
      {#each rows as [key, value], index}
        <div
          class={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-5 py-3 grid grid-cols-3 gap-4`}>
          <dt class="text-sm font-medium text-gray-500 overflow-hidden text-ellipsis">
            {labels[key]}
          </dt>
          <dd class="col-span-2 text-sm text-gray-900">
            {value}
          </dd>
        </div>
      {/each}
    </dl>
  </div>
</div>
