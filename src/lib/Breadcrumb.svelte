<script lang="ts">
  import { parseArgassoDate } from './grid/SortOnDateNewest'

  export let crumbs: {
    href: string
    name: string
  }[] = []
</script>

<nav aria-label="breadcrumbs">
  <ol class="flex">
    <li>
      <a href="/">Argasso</a>
    </li>
    {#each crumbs as { href, name }}
      <li class="breadcrumb-items ml-3 pl-2">
        <a {href}>{name}</a>
      </li>
    {/each}
  </ol>
</nav>

<style>
  li.breadcrumb-items {
    list-style: '/' outside;
  }
</style>
