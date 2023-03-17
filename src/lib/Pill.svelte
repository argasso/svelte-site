<script lang="ts">
  import type { LinkInfo } from 'src/types'
  export let category: LinkInfo
</script>

<span
  class="text-xs inline-block py-1 px-2 text-center rounded-full text-slate-700 bg-stone-200 uppercase last:mr-0 mr-1 mb-1">
  <a href={category.href}>{category.name}</a>
</span>
