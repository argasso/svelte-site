import type { Author, Book, Category, StartPage, StartPage_kommande } from 'src/types/netlify-types'
import type { SvelteComponent } from 'svelte'

type Content = {
  slug: string
  body: SvelteComponent
}

export type CategoryContent = Content & {
  data: Category
  children: CategoryContent[]
  parent?: CategoryContent
}

const categoryModules = import.meta.globEager('./kategorier/**/index.mdx')

const categories = Object.fromEntries(
  Object.entries(categoryModules).map(([path, module]) => {
    const key = path.replace('./kategorier/', '').replace('.mdx', '')
    const slug = `/${key.replace('/index', '')}`
    const { default: body, metadata: data } = module as Module<Category>
    const children = []
    const category = { slug, body, data, children } as CategoryContent
    return [key, category]
  }),
)

export function getCategory(path: string): CategoryContent | undefined {
  const key = `${path.substring(1)}/index`
  return categories[key]
}

export function getCategorySlugs(): string[] {
  return Object.values(categories).map((c) => c.slug)
}

type Module<T> = {
  default: SvelteComponent
  metadata: T
}

export type BookContent = Content & {
  data: Book
  authors: AuthorContent[]
  categories: CategoryContent[]
}
const bookModules = import.meta.globEager('./boecker/*.md')
const books = Object.fromEntries(
  Object.entries(bookModules).map(([path, module]) => {
    const slug = path.replace('./boecker/', '').replace('.md', '')
    const { default: body, metadata: data } = module as Module<Book>
    const authors = []
    const categories = []
    const book = { slug, body, data, authors, categories } as BookContent
    return [slug, book]
  }),
)
const booksList = Object.values(books)

export function getBooks(): BookContent[] {
  return booksList
}

export function getBook(slug: string): BookContent {
  return books[slug]
}

export type AuthorContent = Content & {
  data: Author
  books: BookContent[]
}

const authorModules = import.meta.globEager('./foerfattare/*.md')

const authors = Object.fromEntries(
  Object.entries(authorModules).map(([path, module]) => {
    const slug = path.replace('./foerfattare/', '').replace('.md', '')
    const { default: body, metadata: data } = module as Module<Author>
    const books = []
    const author = { slug, body, data, books } as AuthorContent
    return [slug, author]
  }),
)

export function getAuthors(): AuthorContent[] {
  return Object.values(authors)
}

export function getAuthor(slug: string): AuthorContent {
  return authors[slug]
}

export type IndexContent = Content & {
  data: StartPage
  kommande: (BookContent & StartPage_kommande)[]
}

const rootModules = import.meta.globEager('./index.mdx')
const roots = Object.fromEntries(
  Object.entries(rootModules).map(([path, module]) => {
    const key = path.replace('./', '').replace('.mdx', '')
    const slug = `/${key.replace('/index', '')}`
    const { default: body, metadata: data } = module as Module<StartPage>
    const kommande = []
    const category = { slug, body, data, kommande } as IndexContent
    return [key, category]
  }),
)

export function getIndexPage(): IndexContent {
  return roots['index']
}

// Resolve relations

Object.keys(categories).forEach((key) => {
  const category = categories[key]
  const parts = key.split('/')
  parts.splice(-2, 1)
  const parentKey = parts.join('/')
  const parent = categories[parentKey]
  if (parent) {
    category.parent = parent
    parent.children.push(categories[key])
  }
})

Object.values(books).forEach((book) => {
  book.data.author.forEach((authorSlug) => {
    book.authors.push(authors[authorSlug])
  })
  book.data.kategori?.forEach((categorySlug) => {
    book.categories.push(categories[categorySlug])
  })
})

Object.values(authors).forEach((author) => {
  Object.values(books)
    .filter((book) => book.data.author.includes(author.slug))
    .forEach((book) => {
      author.books.push(book)
    })
})

Object.values(roots).forEach((rootPage) => {
  rootPage.data.kommande.forEach((kommande) => {
    rootPage.kommande.push({
      ...kommande,
      ...books[kommande.bok],
    })
  })
})
