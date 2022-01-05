import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch, page }) => {
  const { path } = page
  // Need to work around https://github.com/sveltejs/kit/issues/1714
  const url = path === '/' ? '/index.json' : `/api${page.path}.json` // This will call [...slug].ts
  const res = await fetch(url)

  if (res.ok) {
    return {
      props: {
        ...(await res.json()),
      },
    }
  }
}
