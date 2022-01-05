<script lang="ts">
  import type { Crumb } from './utils/util'

  export let crumbs: Crumb[] = []
</script>

<nav aria-label="breadcrumbs">
  <ol role="list" class="flex text-gray-500 py-2 text-sm">
    <li>
      <a href="/">Argasso</a>
    </li>
    {#each crumbs as { href, name }}
      <li class="breadcrumb-items">
        {#if href}
          <a {href}>{name}</a>
        {:else}
          {name}
        {/if}
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
