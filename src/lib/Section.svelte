<script lang="ts">
  const colors = {
    gray: 'bg-gray-100 outline-gray-100',
    white: 'bg-white outline-white',
    green: 'bg-green-50 outline-green-50',
  }
  export let title: string
  export let color: 'gray' | 'white' | 'green' = 'white'
</script>

<section class="py-8 {colors[color]}">
  <div class="container">
    <h2 class="w-full text-4xl text-center text-gray-800">
      {title}
    </h2>
    <div class="w-full mb-12">
      <div class="h-1 mx-auto gradient w-72 opacity-75 my-0 py-0 rounded-t-3xl" />
    </div>
    <slot />
  </div>
</section>
