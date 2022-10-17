import { parse, resolve, extname } from 'path'
import { readdirSync, existsSync, lstatSync } from 'fs'
import matter from 'gray-matter'
import { mdsvexConfig } from './mdsvex.config.js'

const ROUTES_DIR = 'src/routes'
const ROUTES_PATH = './' + ROUTES_DIR

const bookCache = (function () {
  const bookBySlug = new Map()
  const booksByAuthorSlug = new Map()

  console.log('>>> Building book cache...')
  const bookDir = resolve(ROUTES_PATH, 'bok')
  readdirSync(bookDir)
    .filter((filename) => filename.endsWith('.md'))
    .forEach((filename) => {
      const { data } = matter.read(resolve(bookDir, filename))
      const slug = parse(filename).name
      const bookThumb = createBookThumb(data, slug)
      bookBySlug.set(slug, bookThumb)
      data.author?.forEach((a) => {
        if (!booksByAuthorSlug.has(a)) {
          booksByAuthorSlug.set(a, [])
        }
        booksByAuthorSlug.get(a).push(bookThumb)
      })
    })
  console.log('<<< Done building book cache!')

  const getBookBySlug = (slug) => {
    return bookBySlug.get(slug)
  }

  const getBooksByAuthorSlug = (slug) => {
    return booksByAuthorSlug.get(slug)
  }

  return {
    getBookBySlug,
    getBooksByAuthorSlug,
  }
})()

function hasMarkdownExtension(filename) {
  return mdsvexConfig.extensions.includes(extname(filename))
}

const bookScript = `
  import { bookMeta as meta } from '$lib/stores/meta';
  meta.set(metadata);
`
const authorScript = `
  import { authorMeta as meta } from '$lib/stores/meta';
  meta.set(metadata);
`
const categoryScript = `
  import { categoryMeta as meta } from '$lib/stores/meta';
  meta.set(metadata);
`

const handleMarkup = ({ content, filename }) => {
  if (hasMarkdownExtension(filename)) {
    const code = enrich(content, filename)
    return { code }
  }
  return { code: content }
}

/**
 *
 * @param {string} input
 * @param {import('path').ParsedPath} parsedPath
 * @returns {string}
 */
function enrich(input, filename) {
  if (matter.test(input)) {
    const { content, data } = matter(input)
    const parsedPath = parse(filename)
    if (parsedPath.ext === '.mdx') {
      return matter.stringify(content, enrichCategory(data, parsedPath))
    } else if (parsedPath.dir.endsWith('src/routes/bok')) {
      return matter.stringify(content, enrichBook(data, parsedPath))
    } else if (parsedPath.dir.endsWith('src/routes/foerfattare')) {
      return matter.stringify(content, enrichAuthor(data, parsedPath))
    } else if (filename.endsWith('src/routes/_content/index.md')) {
      return matter.stringify(content, enrichStartpage(data))
    }
  }
  return input
}

const handleScript = ({ content, filename, attributes }) => {
  let newContent = content
  if (hasMarkdownExtension(filename) && attributes.context == null) {
    const parsedPath = parse(filename)
    if (parsedPath.ext === '.mdx') {
      newContent = content + categoryScript
    } else if (parsedPath.dir.endsWith('src/routes/bok')) {
      newContent = content + bookScript
    } else if (parsedPath.dir.endsWith('src/routes/foerfattare')) {
      newContent = content + authorScript
    }
    return {
      code: newContent,
    }
  }
}

/**
 * @param {import('./src/types/netlify-types').Book} data
 * @param {import('path').ParsedPath} parsedPath
 * @returns {import('./src/types').BookResolved}
 */
export function enrichBook(data, parsedPath) {
  const authors = data.author.map(slugToAuthorLinkInfo)
  const kategorier = data.kategori?.filter((k) => existsSync(resolve(ROUTES_PATH, k + '.mdx')))
  const categories = kategorier.map(slugToCategoryLinkInfo)
  const breadcrumbs = createCategoryBreadcrumb(kategorier[0])
  breadcrumbs.push(createLinkInfo(data.title, resolve('/bok', parsedPath.name)))
  return { ...data, authors, categories, breadcrumbs }
}

/**
 * @param {import('./src/types/netlify-types').Author} data
 * @param {import('path').ParsedPath} parsedPath
 * @returns {import('./src/types').AuthorResolved}
 */
function enrichAuthor(data, parsedPath) {
  const slug = parsedPath.name
  const authoredBooks = bookCache.getBooksByAuthorSlug(slug) || []
  const breadcrumbs = [
    createLinkInfo('Författare', '/foerfattare'),
    createLinkInfo(data.name, '/foerfattare/' + slug),
  ]
  return { ...data, slug, authoredBooks, breadcrumbs }
}

/**
 * @param {import('./src/types/netlify-types').Category} data
 * @param {import('path').ParsedPath} parsedPath
 * @returns {import('./src/types').CategoryResolved}
 */
function enrichCategory(data, parsedPath) {
  const slug = parsedPath.dir.split('src/routes/')[1]
  const breadcrumbs = createCategoryBreadcrumb(slug)
  const categories = readdirSync(parsedPath.dir)
    .map((filename) => resolve(parsedPath.dir, filename))
    .filter((filepath) => isExistingDirectory(filepath))
    .map((filepath) => {
      const category = matter.read(resolve(filepath, 'index.mdx'))
      return createLinkInfo(category.data.title, filepath.split('src/routes')[1])
    })
  return { ...data, breadcrumbs, categories }
}

/**
 * @param {import('./src/types/netlify-types').StartPage} data
 * @param {import('path').ParsedPath} parsedPath
 * @returns {import('./src/types').StartpageResolved}
 */
function enrichStartpage(data) {
  const kommandeResolved = data.kommande.map(({ bok, text }) => ({
    text,
    ...bookCache.getBookBySlug(bok),
  }))
  const nyheterResolved = data.nyheter.map(({ bok, text }) => ({
    text,
    ...bookCache.getBookBySlug(bok),
  }))
  return { ...data, kommandeResolved, nyheterResolved }
}

function slugToAuthorLinkInfo(slug) {
  const filepath = resolve(ROUTES_PATH, 'foerfattare', slug + '.md')
  const author = matter.read(filepath)
  return createLinkInfo(author.data.name, '/foerfattare/' + slug)
}

function slugToCategoryLinkInfo(slug) {
  const filepath = resolve(ROUTES_PATH, slug + '.mdx')
  const category = matter.read(filepath)
  return createLinkInfo(category.data.title, '/' + slug.replace('/index', ''))
}

/**
 *
 * @param {string} name
 * @param {string} href
 * @returns {import('./src/types').LinkInfo}
 */
function createLinkInfo(name, href) {
  return { name, href }
}

/**
 *
 * @param {import('./src/types/netlify-types').Book} book
 * @param {string} slug
 * @returns {import('./src/types').BookThumb}
 */
function createBookThumb(book, slug) {
  const authors = book.author?.map(slugToAuthorLinkInfo) || []
  const categories =
    book.kategori
      ?.filter((k) => existsSync(resolve(ROUTES_PATH, k + '.mdx')))
      .map(slugToCategoryLinkInfo) || []
  const { title, image, generalDetails, kategori } = book
  const href = `/bok/${slug}`
  return {
    title,
    image,
    href,
    authors,
    generalDetails,
    kategori,
    categories,
  }
}

function createCategoryBreadcrumb(slug) {
  return slug
    .replace('/index', '')
    .split('/')
    .reduce((prev, next, index) => {
      const parent = prev[index - 1]
      const slug = parent ? `${parent.href.slice(1)}/${next}` : next
      const filepath = resolve(ROUTES_PATH, slug, 'index.mdx')
      const category = matter.read(filepath)
      if (category) {
        prev.push(createLinkInfo(category.data.title, '/' + slug))
      }
      return prev
    }, [])
}

function isExistingDirectory(path) {
  return existsSync(path) && lstatSync(path).isDirectory()
}

export function mdPreprocess() {
  return {
    markup: handleMarkup,
    script: handleScript,
  }
}
