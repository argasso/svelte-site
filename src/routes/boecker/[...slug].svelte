<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import {
    BookContent,
    CategoryContent,
    getBooks,
    getCategory,
    getCategorySlugs,
  } from '$lib/content/loader'
  import { bookSorters } from '$lib/utils/sortUtil'
  import { browser } from '$app/env'

  export const prerender = true

  export const load: Load = async ({ page }) => {
    const { path } = page
    const category = getCategory(path)
    if (category) {
      const categories = getCategorySlugs()
        .filter((c) => c.startsWith(path) && c !== path)
        .sort()
        .map((c) => c.split('/'))

      const books = bookSorters[0].sort(getBooks())

      if (browser) {
        console.log('[...slug] load() page:', page)
      }
      return {
        props: {
          category,
          books,
        },
      }
    }
  }
</script>

<script lang="ts">
  import H1 from '$lib/components/H1.svelte'
  import H4 from '$lib/components/H4.svelte'
  import H3 from '$lib/components/H3.svelte'
  import BookCard from '$lib/BookCard.svelte'
  import LinkList from '$lib/LinkList.svelte'
  import { flip } from 'svelte/animate'
  import { fade, blur } from 'svelte/transition'
  import * as eases from 'svelte/easing'
  import { BookBindingFilter } from '$lib/filter/BookBindingFilter'
  import { BookCategoryFilter } from '$lib/filter/BookCategoryFilter'
  import BookCategorySelect from '$lib/BookCategorySelect.svelte'
  import GridSortSelect from '$lib/grid/GridSortSelect.svelte'
  import type { BookSortOption } from '$lib/utils/sortUtil'
  import Breadcrumb from '$lib/Breadcrumb.svelte'

  export let category: CategoryContent
  export let books: BookContent[]
  export let sorter = bookSorters[0]

  const bookBindingFilter = new BookBindingFilter()
  //const bookCategoryFilter = new BookCategoryFilter(categories)
  let filterOpen = false
  let sorterKey = ''

  $: links = category.children.map((c) => ({ href: c.slug, label: c.data.title }))
  // $: console.log('sorter', sorter)
  // $: console.log('sorterKey', sorterKey)
  $: sorter = bookSorters.find((sorter) => sorter.key === sorterKey)
  $: books = sorter ? sorter.sort(books).slice(1) : bookSorters[0].sort(books)
  // $: console.log('books', books)
  $: crumbs = getCrumbs(category).map((c) => ({ href: c.slug, name: c.data.title }))

  function getCrumbs(category: CategoryContent): CategoryContent[] {
    if (category.parent) {
      const c = getCrumbs(category.parent)
      c.push(category)
      return c
    } else {
      return [category]
    }
  }
</script>

<svelte:head>
  <title>{category.data.title}</title>
</svelte:head>

<Breadcrumb {crumbs} />

<div class="flex flex-col md:flex-row items-start gap-2">
  <div class="flex-auto">
    <h1>{category.data.title}</h1>
    <div class="max-w-3xl">
      <svelte:component this={category.body} />
    </div>
  </div>
  <LinkList title="Avdelningar" {links} />
</div>

<div class="border-t pt-5 mt-10">
  <div class="flex-auto">
    <div class="flex gap-3 justify-between items-center py-2">
      <H3>Böcker</H3>
      <button on:click={() => (filterOpen = !filterOpen)}>Filter</button>
      <!-- <FilterButton
        {criterias}
        class="flex-none inline-flex items-center justify-center uppercase"
        onClick={() => setFilterOpen(!filterOpen)} /> -->
      <GridSortSelect sorters={bookSorters} bind:sorterKey class="hidden md:block" />
    </div>

    {#if filterOpen}
      <div>
        <a href="#">Nollställ filter</a>
        <div class="flex flex-col md:flex-row md:border-b">
          <div class="block border-b md:border-none py-3">
            <H4>Filter title</H4>
            <BookCategorySelect {category} />
          </div>
        </div>
      </div>
    {/if}

    <!-- <AnimateHeight duration={500} height={filterOpen ? 'auto' : 0}>
          <BookFilter2<T> filters={filters} items={items}></BookFilter2>
        </AnimateHeight> -->
    <div
      class="grid gap-x-3 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-start py-10">
      {#each books as bookContent (bookContent.slug)}
        <div animate:flip={{ duration: 500, easing: eases.backOut }} class="self-end">
          <div class="self-end">
            <BookCard {bookContent} />
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
