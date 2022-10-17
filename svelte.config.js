import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-netlify'
import { mdsvex } from 'mdsvex'
import { mdsvexConfig } from './mdsvex.config.js'
//import { mdPreprocess } from './svelte.preprocess.js'
import { mdPreprocess } from './src/lib/utils/resolver.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdPreprocess(),
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
