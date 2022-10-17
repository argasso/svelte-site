import { parse, resolve, extname } from 'path'
import { readdirSync, existsSync, lstatSync } from 'fs'
import matter from 'gray-matter'

const MD_EXTENSIONS = ['.svelte.md', '.md', '.mdx', '.svx']
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
  return MD_EXTENSIONS.includes(extname(filename))
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
      return matter.stringify(content, enrichCategory(data, parsedPath.dir))
    } else if (parsedPath.dir.endsWith('src/routes/bok')) {
      return matter.stringify(content, enrichBook(data, parsedPath.name))
    } else if (parsedPath.dir.endsWith('src/routes/foerfattare')) {
      return matter.stringify(content, enrichAuthor(data, parsedPath.name))
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
 * @param {import('src/types/netlify-types').Book} data
 * @param {string} slug
 * @returns {import('src/types').BookResolved}
 */
export function enrichBook(data, slug) {
  const authors = data.author.map(slugToAuthorLinkInfo)
  const kategorier = data.kategori?.filter((k) => isRouteExisting(k + '.mdx'))
  const categories = kategorier.map(slugToCategoryLinkInfo)
  const breadcrumbs = createCategoryBreadcrumb(kategorier[0])
  breadcrumbs.push(createLinkInfo(data.title, '/bok/' + slug))
  return { ...data, authors, categories, breadcrumbs }
}

/**
 * @param {import('src/types/netlify-types').Author} data
 * @param {string} slug
 * @returns {import('src/types').AuthorResolved}
 */
export function enrichAuthor(data, slug) {
  const authoredBooks = bookCache.getBooksByAuthorSlug(slug) || []
  const breadcrumbs = [
    createLinkInfo('Författare', '/foerfattare'),
    createLinkInfo(data.name, '/foerfattare/' + slug),
  ]
  return { ...data, slug, authoredBooks, breadcrumbs }
}

/**
 * @param {import('src/types/netlify-types').Category} data
 * @param {string} path
 * @returns {import('src/types').CategoryResolved}
 */
export function enrichCategory(data, path) {
  const slug = path.split('src/routes/')?.[1] || path.replace('src/routes/', '')
  const breadcrumbs = createCategoryBreadcrumb(slug)
  const categories = readdirSync(path)
    .map((filename) => resolve(path, filename))
    .filter((filepath) => isExistingDirectory(filepath))
    .map((filepath) => {
      const category = matter.read(resolve(filepath, 'index.mdx'))
      return createLinkInfo(category.data.title, filepath.split('src/routes')[1])
    })
  return { ...data, breadcrumbs, categories }
}

/**
 * @param {import('src/types/netlify-types').StartPage} data
 * @param {import('path').ParsedPath} parsedPath
 * @returns {import('src/types').StartpageResolved}
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

/**
 *
 * @param {string} slug
 * @returns {import('src/types').LinkInfo}
 */
function slugToCategoryLinkInfo(slug) {
  const slugPath = slug.replace('/index', '')
  let name
  const filepath = resolve(ROUTES_PATH, slug + '.mdx')
  const category = matter.read(filepath)
  name = category.data.title
  return createLinkInfo(name, '/' + slugPath)
}

/**
 *
 * @param {string} name
 * @param {string} href
 * @returns {import('src/types').LinkInfo}
 */
function createLinkInfo(name, href) {
  return { name, href }
}

/**
 *
 * @param {import('src/types/netlify-types').Book} book
 * @param {string} slug
 * @returns {import('src/types').BookThumb}
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

/**
 *
 * @param {string} slug
 * @returns
 */
function createCategoryBreadcrumb(slug) {
  return slug
    .replace('/index', '')
    .split('/')
    .reduce((prev, next, index) => {
      const parent = prev[index - 1]
      const slug = parent ? `${parent.slug}/${next}` : next
      const filepath = resolve(ROUTES_PATH, slug, 'index.mdx')
      const category = matter.read(filepath)
      const name = category.data.title
      const href = '/' + slug
      prev.push({ name, slug, href })
      return prev
    }, [])
    .map(({ name, href }) => createLinkInfo(name, href))
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

function isRouteExisting(filepath) {
  return existsSync(resolve(ROUTES_PATH, filepath))
}
