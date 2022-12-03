import ModifiersSupplement from '../ModifiersSupplement.js'

class NotCoddedInequalitySigns extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: null,
      updateNeeded: true,
      flagName: 'NotCoddedInequalitySigns'
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
      // if (spanEl.innerHTML.includes('<')){
      if (spanEl.innerHTML.includes('&lt;')) {
        isDetected = true
      }
      // if (spanEl.innerHTML.includes('>')){
      if (spanEl.innerHTML.includes('&gt;')) {
        isDetected = true
      }
    })
    return isDetected
  }

  convertorBaseMethod (htmlElement) {
    const parser = new DOMParser()
    const document = parser.parseFromString(htmlElement, 'text/html')
    document.querySelectorAll('span[data-katex]').forEach(spanEl => {
      spanEl.innerHTML = spanEl.innerHTML.replaceAll('&lt;', '&lt;')
      spanEl.innerHTML = spanEl.innerHTML.replaceAll('&gt;', '&gt;')
    })
    return document.querySelector('body').innerHTML
  }
}
export default NotCoddedInequalitySigns
