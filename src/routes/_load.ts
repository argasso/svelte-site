import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch, url }) => {
  // Need to work around https://github.com/sveltejs/kit/issues/1714
  const endpoint = url.pathname === '/' ? '/index.json' : `/api${url.pathname}.json` // This will call [...slug].ts
  const res = await fetch(endpoint)

  if (res.ok) {
    return {
      props: {
        ...(await res.json()),
      },
    }
  }
}
