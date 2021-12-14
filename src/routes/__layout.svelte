<script lang="ts">
  import Footer from '$lib/footer/Footer.svelte'

  import Nav from '$lib/nav/Nav.svelte'
  import '../app.postcss'
</script>

<Nav />

<main>
  <slot />
</main>

<Footer />

<style>
</style>
