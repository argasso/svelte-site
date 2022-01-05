<script lang="ts">
  import Footer from '$lib/footer/Footer.svelte'

  import Nav from '$lib/nav/Nav.svelte'
  import '../app.postcss'
</script>

<Nav />

<main class="bg-white min-h-screen">
  <slot />
</main>

<Footer />
