<script context="module">
  const _expansionState = {}
</script>

<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { CategoryContent } from './content/loader'
  export let category: CategoryContent
  const label = category.data.title
  const children = category.children

  let expanded = _expansionState[label] || false
  const toggleExpansion = () => {
    expanded = _expansionState[label] = !expanded
  }
  $: arrowDown = expanded
</script>

<ul transition:slide>
  <li>
    {#if children}
      <span on:click={toggleExpansion}>
        <span class="arrow" class:arrowDown>&#x25b6</span>
        {label}
      </span>
      {#if expanded}
        {#each children as child}
          <svelte:self category={child} />
        {/each}
      {/if}
    {:else}
      <span>
        <span class="no-arrow" />
        {label}
      </span>
    {/if}
  </li>
</ul>

<style>
  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2rem;
    user-select: none;
  }
  .no-arrow {
    padding-left: 1rem;
  }
  .arrow {
    cursor: pointer;
    display: inline-block;
    /* transition: transform 200ms; */
  }
  .arrowDown {
    transform: rotate(90deg);
  }
</style>
