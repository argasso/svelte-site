<script lang="ts">
  import type { Book } from 'src/types/netlify-types'
  import H3 from './components/H3.svelte'

  export let text: string
  export let book: Book
</script>

<div class="flex flex-row items-start">
  <div class="w-2/5">
    <img src={book.image} alt="Omslag för {book.title}" />
  </div>
  <div class="flex flex-col w-3/5 justify-center items-start pl-6">
    <p class="text-sm uppercase">
      {book.author}
    </p>
    <H3>{book.title}</H3>
    <p class="leading-normal mb-4 line-clamp-6">{text}</p>
  </div>
</div>
