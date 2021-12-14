export function getDocumentStyles(): string {
  let styles = ''
  for (const styleSheet of document.styleSheets) {
    if (styleSheet.cssRules) {
      for (const cssRule of styleSheet.cssRules) {
        styles += cssRule.cssText
      }
    }
  }
  return styles
}
