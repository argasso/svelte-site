<script lang="ts">
  import type { CategoryResolved } from 'src/types'
  import Breadcrumb from '$lib/Breadcrumb.svelte'
  import LinkList from '$lib/LinkList.svelte'

  export let category: CategoryResolved

  $: ({ title, breadcrumbs, categories } = category)
</script>

<div class="container">
  <Breadcrumb crumbs={breadcrumbs} />

  <div class="flex flex-col md:flex-row items-start gap-10">
    <div class="flex-auto">
      <h1>{title}</h1>
      <slot />
    </div>
    <LinkList title="Avdelningar" links={categories} />
  </div>
</div>
