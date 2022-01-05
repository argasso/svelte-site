<script lang="ts">
  import type { LinkInfo } from 'src/types'
  import Link from './components/Link.svelte'

  export let title: string
  export let links: LinkInfo[] = []
</script>

{#if links.length > 0}
  <div
    class="w-full mt-5 md:w-auto md:flex-none justify-start p-6 md:p-10 md:py-7 bg-gray-100 rounded shadow-lg">
    <h2>{title}</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1">
      {#each links as link}
        <div class="my-1">
          <Link href={link.href}>
            {link.name}
          </Link>
        </div>
      {/each}
    </div>
  </div>
{/if}
