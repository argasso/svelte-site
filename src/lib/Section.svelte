<script lang="ts">
  const colors = {
    gray: 'bg-gray-100 outline-gray-100',
    white: 'bg-white outline-white',
    green: 'bg-green-50 outline-green-50',
  }

  let className = ''
  export { className as class }
  export let title: string = undefined
  export let color: 'gray' | 'white' | 'green' = 'white'
</script>

<section class="py-8 {className} {colors[color]}">
  <div class="container">
    {#if title}
      <h2 class="w-full text-4xl text-center text-gray-800">
        {title}
      </h2>
      <div class="w-full mb-12">
        <div class="h-1 mx-auto gradient max-w-xs opacity-75 my-0 py-0 rounded-t-3xl" />
      </div>
    {/if}
    <slot />
  </div>
</section>
