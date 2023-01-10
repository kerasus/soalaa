const PrintElements = (function () {
  'use strict'

  const hideFromPrintClass = 'pe-no-print'
  const preservePrintClass = 'pe-preserve-print'
  const preserveAncestorClass = 'pe-preserve-ancestor'
  const bodyElementName = 'BODY'

  const _hide = function (element) {
    if (!element.classList.contains(preservePrintClass)) {
      element.classList.add(hideFromPrintClass)
    }
  }

  const _preserve = function (element, isStartingElement) {
    element.classList.remove(hideFromPrintClass)
    element.classList.add(preservePrintClass)
    if (!isStartingElement) {
      element.classList.add(preserveAncestorClass)
    }
  }

  const _clean = function (element) {
    if (element.classList.contains(hideFromPrintClass)) {
      element.classList.remove(hideFromPrintClass)
    }
    if (element.classList.contains(preservePrintClass)) {
      element.classList.remove(preservePrintClass)
    }
    if (element.classList.contains(preserveAncestorClass)) {
      element.classList.remove(preserveAncestorClass)
    }
  }

  const _walkSiblings = function (element, callback) {
    let sibling = element.previousElementSibling
    while (sibling) {
      callback(sibling)
      sibling = sibling.previousElementSibling
    }
    sibling = element.nextElementSibling
    while (sibling) {
      callback(sibling)
      sibling = sibling.nextElementSibling
    }
  }

  const _attachPrintClasses = function (element, isStartingElement) {
    _preserve(element, isStartingElement)
    _walkSiblings(element, _hide)
  }

  const _cleanup = function (element, isStartingElement) {
    _clean(element)
    _walkSiblings(element, _clean)
  }

  const _walkTree = function (element, callback) {
    let currentElement = element
    callback(currentElement, true)
    currentElement = currentElement.parentElement
    while (currentElement && currentElement.nodeName !== bodyElementName) {
      callback(currentElement, false)
      currentElement = currentElement.parentElement
    }
  }

  const _hideCustomClasses = function () {
    _hide(document.querySelector('.q-header'))
    _hide(document.querySelector('.download-exam .form'))
  }

  const _showHiddenClasses = function () {
    _clean(document.querySelector('.q-header'))
    _clean(document.querySelector('.download-exam .form'))
  }

  const _print = function (elements) {
    let i
    for (i = 0; i < elements.length; i++) {
      _walkTree(elements[i], _attachPrintClasses)
    }
    _hideCustomClasses()
    window.print()
    for (i = 0; i < elements.length; i++) {
      _walkTree(elements[i], _cleanup)
    }
    _showHiddenClasses()
  }

  return {
    print: _print
  }
})()

export default PrintElements
