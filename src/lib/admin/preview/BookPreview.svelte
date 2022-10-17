<script lang="ts">
  import BookLayout from '$lib/layouts/BookLayout.svelte'
  import ReactAdapter from '../ReactAdapter.svelte'
  import GoogleSearchResult from './GoogleSearchResult.svelte'
  import {
    getBookResolved,
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
  $: book = getBookResolved(entry, fieldsMetaData, getAsset)
  $: seo = book.seo
  $: title = book.title
  $: description = book.shortDescription
</script>

<div class="bg-white p-5">
  <BookLayout {book}>
    <ReactAdapter element={widgetFor('body')} />
  </BookLayout>
  <GoogleSearchResult {title} {description} {seo} {path} />
</div>
