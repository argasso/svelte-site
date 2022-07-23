<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/boecker/layout.json')
    if (res.ok) {
      return {
        props: {
          ...(await res.json()),
        },
      }
    }
  }
</script>

<script lang="ts">
  import BookCard from '$lib/BookCard.svelte'
  import { flip } from 'svelte/animate'
  import { fade, blur } from 'svelte/transition'
  import * as eases from 'svelte/easing'
  import { bookSorters } from '$lib/utils/sortUtil'
  import FilterButton from '$lib/filter/FilterButton.svelte'
  import { getMostSpecificCriteria } from '$lib/filter'
  import type { BookThumb, Filter } from 'src/types'
  import BookFilter from '$lib/filter/BookFilter.svelte'
  import { bookStore } from '$lib/stores/bookStore'
  import GridSelect from '$lib/grid/GridSelect.svelte'
  import Pagination from '$lib/grid/Pagination.svelte'
  import Modal from '$lib/Modal.svelte'
  import { isOverlayOpen } from '$lib/stores/overlayStore'

  export let books: BookThumb[]
  export let filters: Filter[]

  bookStore.init(books, filters)

  const sortOptions = bookSorters.map((s) => ({ value: s.key, title: s.title }))

  $: criterias = filters
    .map((filter) => getMostSpecificCriteria(new URLSearchParams(), filter.key))
    .reduce((x, y) => x.concat(y), [])
</script>

<slot />

<Modal title="Edit your details" open={$isOverlayOpen} on:close={() => isOverlayOpen.set(false)}>
  <div class="">
    <div>
      <h3>Urval</h3>
      {#if $bookStore.filtering}
        <button class="btn-square px-5" on:click={() => bookStore.reset()}>Nollställ urval</button>
      {:else}
        <p class="leading-9 p-0 m-0 font-light text-sm">Gör ett urval nedan</p>
      {/if}
    </div>
    {#each $bookStore.filters as filter}
      <div class="flex flex-col md:flex-row md:border-b">
        <BookFilter {filter} />
      </div>
    {/each}
  </div>
</Modal>

<div class="container">
  <div class="flex-auto mt-5">
    <!-- <div class="flex gap-3 items-stretch">
      <h4>Visar {$bookFilterStore.books.length} av {$bookFilterStore.total} böcker</h4>
    </div> -->

    <div class="flex gap-10 items-start">
      <div class="flex-none w-52 hidden lg:block">
        <div>
          <h3>Urval</h3>
          {#if $bookStore.filtering}
            <button class="btn-square px-5" on:click={() => bookStore.reset()}
              >Nollställ urval</button>
          {:else}
            <p class="leading-9 p-0 m-0 font-light text-sm">Gör ett urval nedan</p>
          {/if}
        </div>
        {#each $bookStore.filters as filter}
          <div class="flex flex-col md:flex-row md:border-b">
            <BookFilter {filter} />
          </div>
        {/each}
      </div>
      <div class="flex-1">
        <h3>
          {$bookStore.count} böcker
          {#if $bookStore.filtering}
            i urvalet
          {:else}
            i denna avdelning
          {/if}
        </h3>
        <div class="flex flex-col sm:flex-row flex-1 gap-5 items-stretch">
          <FilterButton class="lg:hidden" {criterias} />

          <GridSelect queryKey="sort" prefix="Visa" prefixSelected="Visar" options={sortOptions} />

          <GridSelect
            queryKey="size"
            suffix="per sida"
            options={['20', '50', '100']}
            class="hidden lg:flex" />

          <Pagination class="hidden lg:flex" pageing={$bookStore} />
        </div>
        <div
          class="flex-auto grid py-5 gap-x-3 gap-y-10 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-start">
          {#each $bookStore.books as bookThumb (bookThumb.href)}
            <div
              animate:flip={{ duration: 500, easing: eases.backOut }}
              class="self-end"
              class:hide={bookThumb.hidden}>
              <div class="self-end">
                <BookCard {bookThumb} />
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .hide {
    display: none;
  }
</style>
