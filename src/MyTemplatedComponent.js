;(function IIFE () {
  'use strict'

  class MyTemplatedComponent extends HTMLElement  {
    constructor () {
      super()
    }

    connectedCallback () {
      const template = document.querySelector('#my-templated-component')
      const instance = template.content.cloneNode(true)

      this.appendChild(instance)
      this.querySelector('.person').innerHTML = `
        <b>${ this.getAttribute('name') }</b> (${ this.getAttribute('alterego') })
      `
    }
  }

  customElements.define('my-templated-component', MyTemplatedComponent)
})()
