<script lang="ts">
  import type { LinkInfo } from 'src/types'
  import Link from './components/Link.svelte'

  export let title: string
  export let links: LinkInfo[] = []
</script>

{#if links.length > 0}
  <div
    class="w-full bg-gray-200 md:bg-transparent md:w-80 md:bg-gradient-to-b md:from-gray-200 md:flex-none justify-start p-6 md:p-10 md:py-7 md:rounded">
    <h2>{title}</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 ">
      {#each links as link}
        <div class="my-1">
          {#if link.href}
            <Link href={link.href}>
              {link.name}
            </Link>
          {:else}
            {link.name}
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}
