import bookCollection from '$lib/cms/collections/bookCollection'
import categoryCollection from '$lib/cms/collections/categoryCollection'
import { getObjectField, getSelectField } from '$lib/utils/cmsHelper'
import type { BookThumb, Filter, FilterParam, LinkInfo, MyRequestHandler } from 'src/types'
import { allBooks, mapBookThumb } from './bok/_loader'
import { allCategories } from './_loader'

export interface MenuItem {
  link: LinkInfo
  children: MenuItem[]
}

type Output = {
  menuItems: MenuItem[]
}

export const GET: MyRequestHandler<Output> = async () => {
  const categoryMap = Object.fromEntries(
    allCategories().map((c) => [
      c.slug,
      { link: { name: c.title, href: '/' + c.slug }, children: [] as MenuItem[] },
    ]),
  )

  const menuItems = Object.keys(categoryMap)
    // .sort((key1, key2) => key1.localeCompare(key2))
    .reduce<MenuItem[]>((prev, key) => {
      const parentKey = key.split('/').slice(0, -1).join('/')
      const parent = categoryMap[parentKey]
      if (parent) {
        parent.children.push(categoryMap[key])
      } else {
        prev.push(categoryMap[key])
      }
      return prev
    }, [])

  return {
    body: {
      menuItems,
    },
  }
}

function getCategoryFilter(): Filter {
  const title = categoryCollection.label_singular || categoryCollection.label
  const key = categoryCollection.name.toLowerCase()

  const categoryMap = Object.fromEntries(
    allCategories()
      .filter((c) => c.slug.startsWith('boecker') && c.slug !== 'boecker')
      .map((c) => [c.slug, { label: c.title, value: c.slug, children: [] } as FilterParam]),
  )

  const params = Object.keys(categoryMap)
    .sort((key1, key2) => key1.localeCompare(key2))
    .reduce<FilterParam[]>((prev, key) => {
      const parentKey = key.split('/').slice(0, -1).join('/')
      const parent = categoryMap[parentKey]
      if (parent) {
        parent.children.push(categoryMap[key])
      } else {
        prev.push(categoryMap[key])
      }
      return prev
    }, [])
  return { title, key, params }
}

function getBindingsFilter(): Filter {
  const detailsField = getObjectField('generalDetails', bookCollection.fields)
  const bindingField = getSelectField('binding', detailsField.fields)
  const title = bindingField?.label || bindingField.name
  const key = bindingField.name.toLowerCase()
  const params = bindingField.options
    .sort()
    .map((o) => ({ label: o.toString(), value: o.toString(), children: [] }))
  return {
    title,
    key,
    params,
  }
}
