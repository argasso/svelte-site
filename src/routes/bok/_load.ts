import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch, page }) => {
  const url = page.path + '.json'
  const res = await fetch(url)

  if (res.ok) {
    return {
      props: {
        ...(await res.json()),
      },
    }
  } else {
    return {
      status: res.status,
      error: new Error('Failed to fetch ' + url),
    }
  }
}
