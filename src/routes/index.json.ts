import type { BookThumbPromo, MdsvexModule, MyRequestHandler } from 'src/types'
import type { StartPage, StartPage_kommande } from 'src/types/netlify-types'
import { getBookThumb } from './bok/[slug].json'

type Output = {
  kommande: BookThumbPromo[]
}

export const get: MyRequestHandler<Output> = async () => {
  const module = await getStartPage()
  if (module) {
    const page = module.metadata
    const kommande = await Promise.all(page.kommande.map((b) => mapBookThumbPromo(b)))

    return {
      body: {
        kommande,
      },
    }
  }
}

export async function getStartPage(): Promise<MdsvexModule<StartPage>> {
  return import('./_content/index.md')
}

async function mapBookThumbPromo(kommande: StartPage_kommande): Promise<BookThumbPromo> {
  const { bok, text } = kommande
  const thumb = await getBookThumb(bok)
  return { ...thumb, text }
}
