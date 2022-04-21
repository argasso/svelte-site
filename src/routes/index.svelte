<script context="module" lang="ts">
  export const prerender = true

  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch }) => {
    const startPage = await getStartPage()
    const res = await fetch('/index.json')
    if (startPage && res.ok) {
      return {
        props: {
          body: startPage.default,
          data: startPage.metadata,
          ...(await res.json()),
        },
      }
    }
  }
</script>

<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import type { BookThumbPromo } from 'src/types'
  import type { StartPage } from 'src/types/netlify-types'
  import Section from '$lib/Section.svelte'
  import Hero from '$lib/Hero.svelte'
  import BookCardPromo from '$lib/BookCardPromo.svelte'
  import { getStartPage } from './index.json'
  import Hero2 from '$lib/Hero2.svelte'

  export let data: StartPage
  export let body: SvelteComponent
  export let nyheter: BookThumbPromo[]
  export let kommande: BookThumbPromo[]

  const { title, intro } = data
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<Hero2 {title} {intro} />

<Section title="Nyheter">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
    {#each nyheter as bok}
      <BookCardPromo bookThumbPromo={bok} />
    {/each}
  </div>
</Section>

<Section title="Kommande" color="gray">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each kommande as bok}
      <BookCardPromo bookThumbPromo={bok} />
    {/each}
  </div>
</Section>

<Section title="Twitter" />

<svelte:component this={body} />
