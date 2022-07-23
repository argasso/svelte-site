import type { BookThumbPromo, MdsvexModule, MyRequestHandler } from 'src/types'
import type { StartPage, StartPage_kommande } from 'src/types/netlify-types'
import { getBookThumb } from './bok/[slug].json'
import { getCategory, getCategoryLinkInfo } from './[...slug]'

type Output = {
  title: string
  intro: string
  nyheter: BookThumbPromo[]
  kommande: BookThumbPromo[]
}

export const GET: MyRequestHandler<Output> = async () => {
  const module = await getStartPage()
  if (module) {
    const page = module.metadata
    const { title, intro } = page
    const nyheter = await Promise.all(page.nyheter.map((b) => mapBookThumbPromo(b)))
    const kommande = await Promise.all(page.kommande.map((b) => mapBookThumbPromo(b)))

    return {
      body: {
        title,
        intro,
        nyheter,
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
  const categories = thumb.kategori
    .map((slug) => getCategory(slug))
    .filter((c) => c != null)
    .map((c) => getCategoryLinkInfo(c))
  return { ...thumb, text, categories }
}
