<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { getCategory } from '$lib/content/loader'

  export const prerender = true

  export const load: Load = async ({ page }) => {
    const { path } = page
    const category = getCategory(path)
    if (category) {
      return {
        props: {
          category,
        },
      }
    }
  }
</script>

<script lang="ts">
  import { flip } from 'svelte/animate'
  import { fade, blur } from 'svelte/transition'
  import type { CategoryContent } from '$lib/content/loader'
  import LinkList from '$lib/LinkList.svelte'

  export let category: CategoryContent

  $: links = category.children.map((c) => ({ href: c.slug, label: c.data.title }))
</script>

<svelte:head>
  <title>{category.data.title}</title>
</svelte:head>

<div class="bg-white min-h-screen">
  <div class="container">
    <div class="flex flex-col md:flex-row items-start gap-2">
      <div class="flex-auto">
        <h1>{category.data.title}</h1>
        <div class="max-w-3xl">
          <svelte:component this={category.body} />
        </div>
      </div>
      <LinkList title="Avdelningar" {links} />
    </div>
  </div>
</div>
