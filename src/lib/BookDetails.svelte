<script lang="ts">
  import type { CmsField } from 'netlify-cms-core'
  import type { BookContent } from './content/loader'
  import bookCollection from './cms/collections/bookCollection'
  import { isFieldMeta } from './utils/util'

  export let bookContent: BookContent

  const labels = reduceLabels(bookCollection.fields || [])

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

  const { data } = bookContent
  const details = Object.entries({
    ...data.generalDetails,
    ...data.audioDetails,
    ...data.translationDetails,
  })
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    <h3>Detaljer</h3>
  </div>
  <div class="border-t border-gray-200">
    <dl>
      {#each details as detail, index}
        <div
          class={`${
            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
          } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
          <dt class="text-sm font-medium text-gray-500">
            {labels[detail[0]]}
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {detail[1]}
          </dd>
        </div>
      {/each}
    </dl>
  </div>
</div>
