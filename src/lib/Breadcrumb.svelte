<script lang="ts">
  import type { Crumb } from './utils/util'

  export let crumbs: Crumb[] = []
</script>

<nav aria-label="breadcrumbs">
  <ol class="flex text-gray-500 py-2 font-light text-sm">
    <li>
      <a sveltekit:prefetch href="/">Argasso</a>
    </li>
    {#each crumbs as { href, name }}
      <li class="breadcrumb-items">
        <a class="first-letter:uppercase inline-block" sveltekit:prefetch {href}>{name}</a>
      </li>
    {/each}
  </ol>
</nav>

<style>
  li + li:before {
    content: '/';
    padding: 0 0.5rem;
  }
</style>
