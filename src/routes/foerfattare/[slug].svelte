<script context="module" lang="ts">
  import { AuthorContent, getAuthor } from '$lib/content/loader'
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ page, fetch }) => {
    const { slug } = page.params

    try {
      const authorContent = getAuthor(slug)
      if (authorContent) {
        return {
          props: {
            authorContent,
          },
        }
      }
    } catch (error) {
      return
    }
  }
</script>

<script lang="ts">
  import H1 from '$lib/components/H1.svelte'
  import Img from '$lib/components/Img.svelte'
  import BookCard from '$lib/BookCard.svelte'
  export let authorContent: AuthorContent
  const { data, body, slug, books } = authorContent
</script>

<svelte:head>
  <title>{data.name}</title>
</svelte:head>

<article>
  <div class="flex flex-col md:flex-row items-start gap-2">
    <div class="flex-1">
      <H1>{data.name}</H1>
      <svelte:component this={body} />
    </div>
    <div class="flex-1">
      <Img src={data.image} alt={data.name} title={data.name} />
    </div>
  </div>
</article>

<section>
  <div
    class="grid gap-x-3 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-start py-10">
    {#each books as bookContent (bookContent.slug)}
      <div class="self-end">
        <BookCard {bookContent} />
      </div>
    {/each}
  </div>
</section>
