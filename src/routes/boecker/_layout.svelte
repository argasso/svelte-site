<script context="module" lang="ts">
  import { blockquote, img } from '$lib/components'
  export { blockquote, img }
</script>

<script lang="ts">
  import LinkList from '$lib/LinkList.svelte'
  import Breadcrumb from '$lib/Breadcrumb.svelte'

  export let title //: string
  export let menu //: string
  export let image //: string
  export let seo

  export let categories //:LinkInfo[]
  export let breadcrumbs //:LinkInfo[]
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container">
  <Breadcrumb crumbs={breadcrumbs} />

  <div class="flex flex-col md:flex-row items-start gap-2">
    <div class="flex-auto">
      <h1>{title}</h1>
      <div class="max-w-3xl">
        <slot />
      </div>
    </div>
    <LinkList title="Avdelningar" links={categories} />
  </div>
</div>
