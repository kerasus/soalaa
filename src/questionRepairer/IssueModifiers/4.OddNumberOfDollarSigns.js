import ModifiersSupplement from '../ModifiersSupplement.js'

class OddNumberOfDollarSigns extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: null,
      updateNeeded: false,
      flagName: 'OddNumberOfDollarSigns'
    })
  }

  textDetector (htmlElement) {
    const parser = new DOMParser()
    const document = parser.parseFromString(htmlElement, 'text/html')
    let isDetected = false
    document.querySelectorAll('p').forEach(paragraphEl => {
      const paragraphElOddNumberOfDollarSigns = paragraphEl.innerHTML.match(/\$\$|\$/g)
      if (paragraphElOddNumberOfDollarSigns && paragraphElOddNumberOfDollarSigns.length % 2 !== 0) {
        console.log('paragraphElOddNumberOfDollarSigns.length', paragraphElOddNumberOfDollarSigns.length)
        isDetected = true
      }
    })
    return isDetected
  }
}
export default OddNumberOfDollarSigns
