<script lang="ts">
  import { page } from '$app/stores'

  let className = ''
  export { className as class }
  export let href: string
  export let exact = false

  let isMatching = false
  $: isMatching =
    $page.url.pathname && href && exact
      ? $page.url.pathname === href
      : $page.url.pathname.includes(href)

  let activeClass = ''
  $: activeClass = isMatching ? 'mt-1 border-b-4' : 'animate-link'
</script>

<a sveltekit:prefetch {href} class="{className} {activeClass} text-white flex">
  <span class="my-auto">
    <slot />
  </span>
</a>

<style>
  .animate-link {
    position: relative;
    text-decoration: none;
  }

  .animate-link:hover {
    text-decoration: none;
  }

  .animate-link::before {
    opacity: 0.6;
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 4px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .animate-link:hover::before {
    transform: scaleX(1);
  }
</style>
