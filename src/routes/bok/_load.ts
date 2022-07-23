import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch, url }) => {
  const endpoint = url.pathname + '.json'
  const res = await fetch(endpoint)

  if (res.ok) {
    return {
      props: {
        ...(await res.json()),
      },
    }
  } else {
    return {
      status: res.status,
      error: new Error('Failed to fetch ' + endpoint),
    }
  }
}
