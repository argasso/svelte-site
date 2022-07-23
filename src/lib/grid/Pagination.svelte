<script context="module">
</script>

<script lang="ts">
  import { getSingleValueQueryStore } from '$lib/URLSearchParamsStore'

  let className = ''
  export { className as class }
  export let pageing: { count: number; size: number }
  export let buttons = [-2, -1, 0, 1, 2]
  export let labels = {
    first: '<<',
    last: '>>',
    next: '>',
    previous: '<',
  }

  const pageStore = getSingleValueQueryStore('page')
  $: page = (parseInt($pageStore) || 1) - 1

  $: pageCount = Math.floor(pageing.count / pageing.size)
  $: {
    if (page > pageCount) {
      gotoPage(0)
    }
  }

  function gotoPage(page: number) {
    const pageString = page === 0 ? '' : (page + 1).toString()
    pageStore.set(pageString)
  }
</script>

<div class={`flex items-stretch gap-1 ${className}`}>
  <button
    class="btn-square w-10"
    class:disabled={page === 0}
    disabled={page === 0}
    on:click={() => gotoPage(0)}>
    {labels.first}
  </button>
  <button
    class="btn-square w-10"
    class:disabled={page === 0}
    disabled={page === 0}
    on:click={() => gotoPage(page - 1)}>
    {labels.previous}
  </button>
  {#each buttons as button}
    {#if page + button >= 0 && page + button <= pageCount}
      <button
        class="btn-square w-10"
        class:active={page === page + button}
        on:click={() => gotoPage(page + button)}>
        {page + button + 1}
      </button>
    {/if}
  {/each}
  <button
    class="btn-square w-10"
    class:disabled={page > pageCount - 1}
    disabled={page > pageCount - 1}
    on:click={() => gotoPage(page + 1)}>
    {labels.next}
  </button>
  <button
    class="btn-square w-10"
    class:disabled={page >= pageCount}
    disabled={page >= pageCount}
    on:click={() => gotoPage(pageCount)}>
    {labels.last}
  </button>
</div>

<style>
  .active {
    @apply bg-argasso-600;
    @apply border-red-900;
    color: white;
  }

  .disabled {
    @apply text-gray-400;
    @apply bg-gray-100;
    cursor: default;
  }

  button {
    cursor: pointer;
  }
</style>
