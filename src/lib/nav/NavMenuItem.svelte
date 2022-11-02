<script lang="ts">
  import type { MenuItem } from 'src/routes/layout.json'
  import { isMenuOpen } from '$lib/stores/store'

  import { slide, fade } from 'svelte/transition'
  import ExpandToggle from './ExpandToggle.svelte'

  export let menuItem: MenuItem

  $: ({
    link: { name, href },
    children,
  } = menuItem)

  let open = false
  let onClick = (): void => {
    $isMenuOpen = false
  }
</script>

<li class="border-b border-gray-700">
  <div class="flex" class:open>
    <a class="flex-grow py-4" {href} on:click={onClick}>
      {name}
    </a>
    {#if children.length}
      <ExpandToggle bind:open />
    {/if}
  </div>
  {#if children.length && open}
    <div class="border-t border-gray-700" transition:fade>
      <ul class="list-none border-l-4 border-l-argasso-700 m-0 pl-3.5 p-0" transition:slide>
        {#each children as child}
          <svelte:self menuItem={child} />
        {/each}
      </ul>
    </div>
  {/if}
</li>

<style>
  li:last-child {
    border: none;
  }
</style>
