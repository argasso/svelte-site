<script context="module" lang="ts">
  export const prerender = true

  import type { Load } from '@sveltejs/kit'

  async function fetchTweets(fetch) {
    const response = await fetch('tweets.json')
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error(response.statusText)
    }
  }

  export const load: Load = async ({ fetch }) => {
    const tweets = fetchTweets(fetch)
    return {
      props: {
        tweets,
      },
    }
  }
</script>

<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import type { StartpageResolved } from 'src/types'
  import type { Tweet } from './tweets.json'
  import Section from '$lib/Section.svelte'
  import Hero from '$lib/Hero.svelte'
  import Hero2 from '$lib/Hero2.svelte'
  import ShareButtons from '$lib/share/index.svelte'
  import TweetCard from '$lib/TweetCard.svelte'
  import BookCardPromo from '$lib/BookCardPromo.svelte'
  import * as module from './_content/index.md'

  export let tweets: Promise<Tweet[]>

  const body = module.default as SvelteComponent
  const meta = module.metadata as StartpageResolved
  $: ({ title, intro, nyheterResolved, kommandeResolved } = meta)
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<Hero2 {title} {intro} />

<Section title="Nyheter">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
    {#each nyheterResolved as bok}
      <BookCardPromo bookThumbPromo={bok} />
    {/each}
  </div>
</Section>

<Section title="Kommande" color="gray">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each kommandeResolved as bok}
      <BookCardPromo bookThumbPromo={bok} />
    {/each}
  </div>
</Section>

<Section title="Twitter">
  {#await tweets}
    <p>...waiting</p>
  {:then tweets}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each tweets as tweet}
        <TweetCard {tweet} />
      {/each}
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</Section>

<!-- <a
  class="twitter-timeline"
  data-lang="sv"
  data-width="250"
  data-height="500"
  href="https://twitter.com/ArgassoBok?ref_src=twsrc%5Etfw">Tweets by ArgassoBok</a> -->

<!-- <a
  class="twitter-timeline"
  href="https://twitter.com/ArgassoBok"
  data-lang="sv"
  data-tweet-limit="3"
  data-theme="light"
  data-chrome="noheader, nofooter, noborders, transparent, noscrollbar" /> -->

<!-- <ShareButtons slug="/" title="Argasso testing" /> -->

<svelte:component this={body} />
