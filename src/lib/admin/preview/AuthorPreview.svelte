<script lang="ts">
  import ReactAdapter from '../ReactAdapter.svelte'
  import AuthorLayout from '$lib/layouts/AuthorLayout.svelte'
  import GoogleSearchResult from './GoogleSearchResult.svelte'
  import {
    getAuthorResolved,
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
  $: author = getAuthorResolved(entry, fieldsMetaData, getAsset)
  $: seo = author.seo
  $: title = author.name
  $: description = undefined
</script>

<div class="bg-white p-5">
  <AuthorLayout {author}>
    <ReactAdapter element={widgetFor('body')} />
  </AuthorLayout>
  <GoogleSearchResult {title} {description} {seo} {path} />
</div>
