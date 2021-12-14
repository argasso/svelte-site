<script context="module" lang="ts">
  export const prerender = true

  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ page }) => {
    try {
      const indexPage = getIndexPage()
      return {
        props: {
          indexPage,
        },
      }
    } catch (error) {
      console.error(error)
    }
  }
</script>

<script lang="ts">
  import Section from '$lib/Section.svelte'
  import Hero from '$lib/Hero.svelte'
  import BookCardBig from '$lib/BookCardBig.svelte'
  import { getIndexPage, IndexContent } from '$lib/content/loader'

  export let indexPage: IndexContent

  const { data, body, kommande } = indexPage
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<Hero title={data.title} intro={data.intro} />

<Section title="Nyheter">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
    {#each kommande as bok}
      <BookCardBig text={bok.text} book={bok.data} />
    {/each}
  </div>
</Section>

<Section title="Kommande" color="gray">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each kommande as bok}
      <BookCardBig text={bok.text} book={bok.data} />
    {/each}
  </div>
</Section>

<Section title="Nyheter" />

<Section title="Twitter" color="green" />

<svelte:component this={body} />
