<script lang="ts">
  import Link from './components/Link.svelte'
  import type { BookContent } from './content/loader'

  export let bookContent: BookContent

  const { data, slug, authors } = bookContent
  const href = `/boecker/${slug}`
</script>

<div
  class="mt-auto rounded-md shadow-md overflow-hidden ease-in-out hover:shadow-lg w-40 smx:w-44 mdx:w-40 lgx:w-48">
  <Link {href}>
    <img src={data.image} alt={`Omslag för ${data.title}`} />
  </Link>
  <div class="px-3 py-1 h-20">
    <Link {href} class="">
      <h4 class="text-base my-0">{data.title}</h4>
    </Link>
    <div class="">
      {#each authors as author}
        <Link class="text-xs" href={`/foerfattare/${author.slug}`}>
          {author.data.name}
        </Link>
      {/each}
    </div>
  </div>
</div>
