<script lang="ts">
  import type { BookThumb } from 'src/types'
  import Link from './components/Link.svelte'

  export let bookThumb: BookThumb

  const { title, image, href, authors } = bookThumb
</script>

<div
  class="mt-auto rounded-md shadow-md overflow-hidden ease-in-out hover:shadow-lg w-40 smx:w-44 mdx:w-40 lgx:w-48">
  <Link {href}>
    <img data-blink-src={image} alt={`Omslag för ${title}`} />
  </Link>
  <div class="px-3 py-1 h-20 bg-white">
    <Link {href} class="">
      <h4 class="text-base my-0">{title}</h4>
    </Link>
    <div class="">
      {#each authors as author}
        <Link class="text-xs" href={author.href}>
          {author.name}
        </Link>
      {/each}
    </div>
  </div>
</div>
