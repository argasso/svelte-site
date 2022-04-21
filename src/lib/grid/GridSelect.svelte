<script lang="ts">
  import { createSingleValueQueryStore } from '$lib/URLSearchParamsStore'

  type Option = { value: string; title: string }

  let className = ''
  export { className as class }
  export let queryKey: string
  export let options: (Option | string)[]
  export let prefix = ''
  export let prefixSelected = ''
  export let suffix = ''

  let opts: Option[]
  $: opts = options.map((o, index) => {
    const option = typeof o === 'string' ? { value: o, title: o } : { ...o }
    if (index === 0) {
      option.value = ''
    }
    return option
  })

  const value = createSingleValueQueryStore(queryKey)
</script>

<select class={'btn-square ' + className} bind:value={$value}>
  {#each opts as o}
    <option value={o.value}>
      {o.value === $value ? prefixSelected : prefix}
      {o.title}
      {suffix}
    </option>
  {/each}
</select>
