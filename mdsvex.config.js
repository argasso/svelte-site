import remarkGithub from 'remark-github'
import remarkAbbr from 'remark-abbr'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export default {
  extensions: ['.svelte.md', '.md', '.mdx', '.svx'],
  layout: {
    bok: './src/routes/bok/_layout.svelte',
    foerfattare: './src/routes/foerfattare/_layout.svelte',
    startpage: './src/lib/mdx/layout.svelte',
    _: './src/routes/_layout.svelte',
  },
  smartypants: {
    dashes: 'oldschool',
  },
  remarkPlugins: [
    [
      remarkGithub,
      {
        // Use your own repository
        repository: 'https://github.com/argasso/svelte-site.git',
      },
    ],
    remarkAbbr,
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
      },
    ],
  ],
}
