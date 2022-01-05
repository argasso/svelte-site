<script context="module" lang="ts">
  import { blockquote, img } from '$lib/components'
  export { blockquote, img }
</script>

<script lang="ts">
  import BookCard from '$lib/BookCard.svelte'
  import Img from '$lib/components/Img.svelte'
  import Breadcrumb from '$lib/Breadcrumb.svelte'

  export let name //: string
  export let image //: string
  export let authoredBooks //:BookThumb[]
  export let breadcrumbs
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<div class="container">
  <Breadcrumb crumbs={breadcrumbs} />

  <article>
    <div class="flex flex-col md:flex-row items-start gap-2">
      <div class="flex-1">
        <h2>{name}</h2>
        <slot />
      </div>
      <div class="flex-shrink max-w-xs">
        <Img src={image} alt={name} title={name} />
      </div>
    </div>
  </article>

  <section>
    <div
      class="grid gap-x-3 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-start py-10">
      {#each authoredBooks as bookThumb (bookThumb.href)}
        <div class="self-end">
          <BookCard {bookThumb} />
        </div>
      {/each}
    </div>
  </section>
</div>
