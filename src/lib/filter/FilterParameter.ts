export class FilterParameter {
  public count? = 0
  private parameters: FilterParameter[] = []
  constructor(readonly label: string, readonly value: string, readonly key: string) {}

  addParameter(parameter: FilterParameter): void {
    this.parameters.push(parameter)
  }

  hasParameters(): boolean {
    return this.parameters.length > 0
  }

  getParameters() {
    return this.parameters
  }

  isSelected(query: URLSearchParams) {
    return query.has(this.value)
  }
}
