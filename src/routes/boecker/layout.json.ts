import type { BookThumb, MyRequestHandler } from 'src/types'
import { allBooks, mapBookThumb } from '../bok/[slug].json'

type Output = {
  books: BookThumb[]
}

export const get: MyRequestHandler<Output> = async () => {
  const books = await Promise.all(allBooks().map((b) => mapBookThumb(b)))

  return {
    body: {
      books,
    },
  }
}
