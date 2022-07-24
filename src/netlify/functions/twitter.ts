import type { Handler } from '@netlify/functions'
import type { components } from 'twitter-api-sdk/dist/types'

type Get2TweetsResponse = components['schemas']['Get2TweetsResponse']
type ApiIncludes = components['schemas']['Expansions']
type ApiTweet = components['schemas']['Tweet']
type ApiMedia = components['schemas']['Media'] & { url?: string } // TS Fix
type ApiUser = components['schemas']['User']
type UrlEntity = components['schemas']['UrlEntity']

export type Tweet = {
  id: string
  text: string
  date: string
  urls: { display_url: string; url: string; type: string; href: string }[]
  user: ApiUser
}

function mapTweet(tweet: ApiTweet, includes: ApiIncludes): Tweet {
  const { media, users } = includes
  const { id, text, created_at, entities, author_id } = tweet
  const user = users.find((u) => u.id === author_id)
  const urls = entities.urls
    .filter((u) => text.indexOf(u.url))
    .sort((a, b) => text.indexOf(a.url) - text.indexOf(b.url))
    .reduce((arr, item) => {
      if (arr.find((a) => a.url === item.url) == null) {
        arr.push(item)
      }
      return arr
    }, [])
    .map(({ display_url, url, media_key }) => {
      const mediaItem = media.find((m) => m.media_key === media_key) as ApiMedia
      const type = mediaItem?.type || 'link'
      return {
        display_url,
        url,
        href: mediaItem?.url || url,
        type,
      }
    })
  const textFiltered = urls.reduce((t, u) => {
    return t.replace(u.url, '')
  }, text)
  return {
    id,
    text: textFiltered,
    date: created_at,
    user,
    urls,
  }
}

const handler: Handler = async (event, context) => {
  const url = `https://api.twitter.com/2/users/${
    import.meta.env.VITE_TWITTER_ID
  }/tweets?max_results=5&tweet.fields=created_at,attachments,entities&expansions=attachments.media_keys,author_id&user.fields=name,profile_image_url&media.fields=url`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TWITTER_BEARER_TOKEN}`,
      },
    })
    if (response.ok) {
      const json = (await response.json()) as components['schemas']['Get2TweetsResponse']
      const { data, includes } = json
      const tweets = data.slice(0, 3).map((t) => mapTweet(t, includes))
      return {
        statusCode: 200,
        headers: {
          'cache-control': 'public, max-age=21600',
        },
        body: JSON.stringify(tweets),
      }
    } else {
      return {
        statusCode: response.status,
        error: response.statusText,
      }
    }
  } catch (err) {
    const error = `Error when fetching tweets: ${err}, url: ${url}`
    console.error(error)
    return {
      statusCode: 500,
      error,
    }
  }
}

export { handler }
