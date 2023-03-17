<script lang="ts">
  import BookDetails from '$lib/BookDetails.svelte'
  import Breadcrumb from '$lib/Breadcrumb.svelte'
  import PlaceholderBook from '$lib/components/PlaceholderBook.svelte'
  import Image from '$lib/Image.svelte'
  import type { BookResolved } from 'src/types'

  export let book: BookResolved

  $: ({
    title,
    image,
    isbn,
    generalDetails,
    audioDetails,
    translationDetails,
    authors = [],
    categories,
    breadcrumbs,
  } = book)
</script>

<div class="container">
  <Breadcrumb crumbs={breadcrumbs} />

  <section class="text-gray-700 body-font overflow-hidden py">
    <div class="mx-auto flex flex-wrap my-10">
      <div class="w-1/3 sm:w-1/3">
        {#if image}
          <Image
            src={image}
            alt={`Omslag för ${title}`}
            class="h-auto object-contain object-top rounded" />
        {:else}
          <PlaceholderBook />
        {/if}
      </div>
      <div class="w-2/3 pl-5 sm:pl-10 ">
        <div class="flex justify-between items-center">
          <h2 class="text-xl uppercase title-font text-gray-900 tracking-widest my-1">
            {#each authors as author}
              <a class="author" href={author.href}>{author.name}</a>
            {/each}
          </h2>
          <div class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <!-- <a class="text-gray-500"> -->
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
            <!-- </a>
          <a class="ml-2 text-gray-500"> -->
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <path
                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
            <!-- </a>
          <a class="ml-2 text-gray-500"> -->
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <path
                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            <!-- </a> -->
          </div>
        </div>
        <h1 class="text-gray-900 text 3xl lg:text-4xl xl:text-5xl title-font font-medium my-3">
          {title}
        </h1>
        <h3 class="uppercase text-base text-gray-500 mb-5">
          {[generalDetails?.binding, generalDetails?.publishMonth]
            .filter((b) => b != null)
            .join(', ')}
        </h3>

        <div class="hidden sm:block">
          <slot />
          <div class="flex mx-1 my-5">
            <a
              href={`https://www.bokfynd.nu/${isbn}`}
              target="_blank"
              class="flex ml-auto bg-argasso-600 hover:bg-argasso-500 active:bg-argasso-700 text-white rounded-full py-4 px-12 shadow-lg focus:shadow-outline">
              Köp via Bokfynd
            </a>
          </div>
        </div>

        <div class="hidden lg:block">
          <BookDetails
            {categories}
            details={{ generalDetails, audioDetails, translationDetails }} />
        </div>
      </div>
    </div>
    <div class="sm:hidden">
      <slot />
      <div class="flex mx-1 my-5">
        <a
          href={`https://www.bokfynd.nu/${isbn}`}
          target="_blank"
          class="flex ml-auto bg-argasso-600 hover:bg-argasso-500 active:bg-argasso-700 text-white rounded-full py-4 px-12 shadow-lg focus:shadow-outline">
          Köp via Bokfynd
        </a>
      </div>
    </div>
    <div class="lg:hidden">
      <BookDetails {categories} details={{ generalDetails, audioDetails, translationDetails }} />
    </div>
  </section>
</div>

<style>
  .author ~ .author::before {
    content: ', ';
  }
</style>
