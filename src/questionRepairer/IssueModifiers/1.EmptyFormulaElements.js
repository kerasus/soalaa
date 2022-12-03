import ModifiersSupplement from '../ModifiersSupplement.js'

class EmptyFormulaElements extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: null,
      updateNeeded: true,
      flagName: 'EmptyFormulaElements'
    })
  }

  textDetector (htmlElement) {
    if (!htmlElement) {
      return false
    }
    const parser = new DOMParser()
    const document = parser.parseFromString(htmlElement, 'text/html')
    let isDetected = false
    document.querySelectorAll('span[data-katex]').forEach(spanEl => {
      if (spanEl.innerHTML === '$$' || spanEl.innerHTML === '' || spanEl.innerHTML === '$') {
        isDetected = true
      }
    })
    return isDetected
  }

  convertorBaseMethod (htmlElement) {
    const parser = new DOMParser()
    const document = parser.parseFromString(htmlElement, 'text/html')
    document.querySelectorAll('span[data-katex]').forEach(spanEl => {
      if (spanEl.innerHTML === '$$' || spanEl.innerHTML === '' || spanEl.innerHTML === '$') {
        spanEl.remove()
      }
    })
    return document.querySelector('body').innerHTML
  }
}
export default EmptyFormulaElements
