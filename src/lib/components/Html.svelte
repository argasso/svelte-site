<script lang="ts">
  import { h1, h2, h3, h4, blockquote, ul, li, img, p } from '$lib/components'
  import KatalogForm from '$lib/components/KatalogForm.svelte'
  export let name: keyof typeof components
  export let children: string | any

  let array: Array<string | any>
  $: array = children ? [].concat(children) : []

  const components = { h1, h2, h3, h4, blockquote, ul, li, img, p }
  components['Components.KatalogForm'] = KatalogForm
  components['KatalogForm'] = KatalogForm

  $: Array.isArray(children)
    ? children.map((c) => console.log('child', c, typeof c))
    : console.log('child', children, typeof children)
</script>

{#if components[name]}
  <svelte:component this={components[name]}>
    {#each array as child}
      {#if typeof child === 'object'}
        <svelte:self {...child.props} />
      {:else}
        {children}
      {/if}
    {/each}
  </svelte:component>
{:else}
  <p class="border border-red-600">
    Unsupported element <b>{name}</b> with value <i>{children}</i>
  </p>
{/if}
