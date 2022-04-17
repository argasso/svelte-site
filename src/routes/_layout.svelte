<script context="module" lang="ts">
  import { blockquote, img } from '$lib/components'
  export { blockquote, img }
</script>

<script lang="ts">
  import LinkList from '$lib/LinkList.svelte'
  import Breadcrumb from '$lib/Breadcrumb.svelte'

  export let title //: string
  // export let menu //: string
  // export let image //: string
  // export let seo

  export let categories //:LinkInfo[]
  export let breadcrumbs //:LinkInfo[]
</script>

<svelte:head>
  <title>{title}</title>
  <script>
    ;(function (src, cb) {
      var s = document.createElement('script')
      s.setAttribute('src', src)
      s.onload = cb
      ;(document.head || document.body).appendChild(s)
    })('https://ucarecdn.com/libs/blinkloader/3.x/blinkloader.min.js', function () {
      window.Blinkloader.optimize({
        pubkey: '75a654a4310401994084',
        responsive: true,
        smartCompression: true,
        retina: true,
        webp: true,
        fadeIn: true,
        lazyload: true,
      })
    })
  </script>
</svelte:head>

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
