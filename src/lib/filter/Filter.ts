import { getMostSpecificCriteria } from '.'
import type { FilterParameter } from './FilterParameter'

export abstract class Filter<T> {
  constructor(
    readonly title: string,
    readonly key: string,
    readonly parameters: FilterParameter[],
  ) {}

  isMatching(item: T, query: URLSearchParams, parameter?: FilterParameter) {
    const criterias = getMostSpecificCriteria(query, this.key, parameter?.value)
    return (
      criterias.length == 0 || criterias.some((criteria) => this.isMatchingItem(item, criteria))
    )
  }

  abstract isMatchingItem(item: T, criteria: string): boolean
}
