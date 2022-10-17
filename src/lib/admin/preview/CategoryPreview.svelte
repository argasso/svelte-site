<script lang="ts">
  import ReactAdapter from '../ReactAdapter.svelte'
  import CategoryLayout from '$lib/layouts/CategoryLayout.svelte'
  import GoogleSearchResult from './GoogleSearchResult.svelte'
  import {
    getCategoryResolved,
    type Entry,
    type FieldsMetaData,
    type GetAsset,
    type WidgetFor,
  } from './previewUtils'

  export let entry: Entry
  export let widgetFor: WidgetFor
  export let fieldsMetaData: FieldsMetaData
  export let getAsset: GetAsset

  $: path = entry.getIn(['meta']).toJS().path
  $: category = getCategoryResolved(entry, fieldsMetaData, getAsset)
  $: seo = category.seo
  $: title = category.title
  $: description = undefined
</script>

<div class="bg-white p-5">
  <CategoryLayout {category}>
    <ReactAdapter element={widgetFor('body')} />
  </CategoryLayout>
  <GoogleSearchResult {title} {description} {seo} {path} />
</div>
