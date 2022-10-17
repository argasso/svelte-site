<script lang="ts">
  import type { Author_seo, Book_seo, Category_seo } from 'src/types/netlify-types'

  export let title = 'Lorem ipsum dolor'
  export let description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  export let path = 'exempel'
  export let seo: Author_seo | Book_seo | Category_seo

  $: googleTitle = seo?.title || title
  $: googleText = shorten(seo?.description || description)

  function shorten(text: string | undefined) {
    return text && text.length > 160 ? text.substring(0, 160) + '...' : text
  }
</script>

<hr class="border mb-6 mt-6" />

<p class="font-semibold text-2xl">
  Sökresultat på <span class="text-blue-600">G</span><span class="text-red-700">o</span><span
    class="text-yellow-400">o</span
  ><span class="text-blue-600">g</span><span class="text-green-600">l</span><span
    class="text-red-700">e</span>
</p>
<p class="text-gray-900 text-sm">
  https://www.argasso.se
  <span class="text-gray-600"> › {path}</span>
</p>

{#if googleTitle}
  <h3 class="font-sans text-2xl text-blue-800">{googleTitle}</h3>
{:else}
  <h3 class="font-sans text-2xl italic text-red-800">Ingen titel angiven</h3>
{/if}

{#if googleText}
  <p class="text-sm text-gray-900">{googleText}</p>
{:else}
  <p class="text-sm text-gray-900 italic">Ingen beskrivning angiven</p>
{/if}
