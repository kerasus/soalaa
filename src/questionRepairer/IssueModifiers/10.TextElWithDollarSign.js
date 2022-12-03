import ModifiersSupplement from '../ModifiersSupplement.js'

class TextElWithDollarSign extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: null,
      updateNeeded: true,
      flagName: 'TextElWithDollarSign'
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
      if (spanEl.innerHTML.includes('$')) {
        isDetected = true
      }
    })
    return isDetected
  }

  convertorBaseMethod (htmlElement) {
    const parser = new DOMParser()
    const document = parser.parseFromString(htmlElement, 'text/html')
    document.querySelectorAll('p').forEach(spanEl => {
      console.log('spanEl', spanEl)
      let doesHaveTextEl = false
      if (spanEl.childNodes) {
        // forEach
      //  spanEl.childNodes.find(el => el.nodeName === '#text') &&
        spanEl.childNodes.forEach(el => {
          if (el.nodeName === '#text') {
            doesHaveTextEl = true
            const txt = el.nodeValue.replaceAll('$', '&#x24;').toString()
            console.log('txt', txt)
            el.nodeValue = txt
            console.log('el.nodeValue', el.nodeValue)
            console.log('el', el)
            console.log('spanEl', spanEl)
          }
        })
      }
      // if ((spanEl.childNodes && doesHaveTextEl && spanEl.childNodes.nodeValue.includes('$'))){
      //   const a = spanEl.innerHTML.replaceAll('$','&#x24;')
      //   spanEl.innerHTML = a
      //   console.log('spanEl.innerHTML', spanEl.innerHTML)
      // }
      // else if (spanEl.innerHTML.includes('$')){
      //
      // }
    })
    console.log('document.querySelector(\'body\').innerHTML', document.querySelector('body').innerHTML)
    return document.querySelector('body').innerHTML
  }
}
export default TextElWithDollarSign
