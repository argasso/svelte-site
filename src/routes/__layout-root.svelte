<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch }) => {
    const response = await fetch('/layout.json')

    return {
      status: response.status,
      props: response.ok && (await response.json()),
    }
  }
</script>

<script lang="ts">
  import Footer from '$lib/footer/Footer.svelte'
  import Nav from '$lib/nav/Nav.svelte'
  import { noScroll } from '$lib/stores/store'
  import { browser } from '$app/env'
  import type { MenuItem } from './layout.json'
  import '../app.postcss'

  export let menuItems: MenuItem[]

  $: if (browser) document.body.classList.toggle('noscroll', $noScroll)
</script>

<Nav {menuItems} />

<main class="bg-white min-h-screen">
  <slot />
</main>

<Footer />

<style>
  :global(body.noscroll) {
    position: fixed;
    width: 100%;
    overflow-y: hidden;
  }
</style>
