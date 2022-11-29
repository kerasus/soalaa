import ModifiersSupplement from '../ModifiersSupplement.js'

class ParagraphWithTwoDollarSigns extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: null,
      updateNeeded: false,
      flagName: 'ParagraphWithTwoDollarSigns'
    })
  }

  textDetector (htmlElement) {
    const parser = new DOMParser()
    const document = parser.parseFromString(htmlElement, 'text/html')
    let isDetected = false
    document.querySelectorAll('p').forEach(paragraphEl => {
      const paragraphElWithTwoDollarSigns = paragraphEl.innerHTML.match(/\$\$|\S/g)
      if (paragraphElWithTwoDollarSigns && paragraphElWithTwoDollarSigns.length % 2 !== 0) {
        isDetected = true
      }
    })
    return isDetected
  }

  convertorBaseMethod (htmlElement) {
    const parser = new DOMParser()
    const document = parser.parseFromString(htmlElement, 'text/html')
    document.querySelectorAll('p').forEach(paragraphEl => {
      const paragraphElWithTwoDollarSigns = paragraphEl.innerHTML.match(/\$\$|\S/g)
      if (paragraphElWithTwoDollarSigns && paragraphElWithTwoDollarSigns.length % 2 !== 0) {
        paragraphEl.innerHTML = paragraphEl.innerHTML.replaceAll('$$', '')
      }
    })
    return document.querySelector('body').innerHTML
  }
}
export default ParagraphWithTwoDollarSigns
