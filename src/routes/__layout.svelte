<script lang="ts">
  import Footer from '$lib/footer/Footer.svelte'

  import Nav from '$lib/nav/Nav.svelte'
  import { isOverlayOpen } from '$lib/stores/overlayStore'
  import '../app.postcss'
  import { browser } from '$app/env'
  $: if (browser) document.body.classList.toggle('noscroll', $isOverlayOpen)
</script>

<Nav />

<main class="bg-white min-h-screen">
  <slot />
</main>

<Footer />

<style>
  :global(body.noscroll) {
    position: fixed;
    overflow-y: hidden;
  }
</style>
