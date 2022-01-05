<script lang="ts">
  import type { BookThumbPromo } from 'src/types'
  import Link from './components/Link.svelte'

  export let bookThumbPromo: BookThumbPromo
</script>

<div class="flex flex-row items-start">
  <div class="w-2/5 rounded-sm shadow-md overflow-hidden">
    <Link href={bookThumbPromo.href}>
      <img src={bookThumbPromo.image} alt="Omslag för {bookThumbPromo.title}" />
    </Link>
  </div>
  <div class="flex flex-col w-3/5 justify-center items-start pl-6">
    <p class="text-sm uppercase">
      {#each bookThumbPromo.authors as author}
        <Link class="text-xs" href={author.href}>
          {author.name}
        </Link>
      {/each}
    </p>

    <h3 class="my-0"><Link href={bookThumbPromo.href}>{bookThumbPromo.title}</Link></h3>
    <p class="leading-normal mb-4 line-clamp-6">{bookThumbPromo.text}</p>
  </div>
</div>
