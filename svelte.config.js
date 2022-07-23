import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-netlify'

const mdScript = `
<script context="module">
  import { load } from "./_load"
  export { load }
</script>
`

const mdxScript = `
<script context="module">
  import { load } from "$lib/../routes/_load"
  export { load }
</script>
`

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    {
      markup: ({ content, filename }) => {
        //console.log('filename', filename)
        if (filename.endsWith('.md')) {
          return { code: content + mdScript }
        } else if (filename.endsWith('.mdx')) {
          return { code: content + mdxScript }
        }
        return { code: content }
      },
    },
    mdsvex(mdsvexConfig),
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    adapter: adapter(),
  },
}

export default config
