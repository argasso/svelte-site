<script lang="ts">
  import { page } from '$app/stores'

  let active = false
  $: active =
    href != null && page != null && $page.url.pathname != null && $page.url.pathname.includes(href)

  let className = ''
  export { className as class }

  export let href: string | undefined = undefined
</script>

{#if href}
  <a {href} class="animate-link {className}" class:active>
    <slot />
  </a>
{:else}
  <slot />
{/if}

<style>
  .animate-link {
    position: relative;
    text-decoration: none;
  }

  .animate-link:hover {
    text-decoration: none;
  }

  .animate-link::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .animate-link:hover::before {
    transform: scaleX(1);
  }
</style>
