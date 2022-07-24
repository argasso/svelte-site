<script lang="ts">
  import config from '$lib/cms/config'
  import { onMount } from 'svelte'
  import { customizeCms } from '$lib/utils/cmsHelper'
  import process from 'process'

  // import CMS from 'netlify-cms-app'
  // import { MdxControl, MdxPreview } from 'netlify-cms-widget-mdx'

  onMount(() => {
    // VFile in netlify-cms-widget-mdx needs process
    window.process = process
    const CMS = import('netlify-cms-app').then(async (cms) => {
      await customizeCms(cms.default)
      // console.log(config)
      // cms.default.init({ config })
      cms.default.init()
    })
    // const preview = mdx.setupPreview({
    //   components,
    //   scope,
    //   mdPlugins,
    // })
    // const control = mdx.MdxControl
    // const preview = mdx.MdxPreview
    // CMS.registerWidget('mdx', MdxControl, MdxPreview)
    // CMS.init({ config })
  })
</script>

<svelte:head>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<!-- {#await imports[component]() then module}
	<svelte:component this={module.default}/>
{/await} -->

<!-- <main>
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</main> -->
<!-- <main>
  <script src="https://unpkg.com/react@^16/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@^16/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/netlify-cms-app/dist/netlify-cms-app.js"></script>
  <script>
    NetlifyCmsApp.init()
  </script>
</main> -->
