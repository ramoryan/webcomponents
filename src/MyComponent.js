/*
https://developers.google.com/web/fundamentals/web-components/customelements
https://auth0.com/blog/web-components-how-to-craft-your-own-custom-components/
https://github.com/webcomponents/webcomponentsjs
*/

;(function IIFE () {
  'use strict'

  const DEFAULT_WIDTH  = 500
  const DEFAULT_HEIGHT = 500

  class MyComponent extends HTMLElement  {
    /*
    An instance of the element is created or upgraded.
    Useful for initializing state, settings up event listeners, or creating shadow dom.
    See the spec for restrictions on what you can do in the constructor.
    */
    constructor () {
      super() // always call super() first in the ctor. This also calls the extended class' ctor.

      this.width   = this.width   || DEFAULT_WIDTH
      this.height  = this.height  || DEFAULT_HEIGHT
      this.visible = this.visible || 'true'

      // Inkább meglévő elemet módosítgassunk, inline HTML írása helyett.
      this.div = document.createElement('div')

      this.div.style.margin = '0 auto'
      this.div.style.transition = 'all 1s'

      this.appendChild(this.div)

      console.log('constructor')

      // Itt NE hívd meg a rendert, azt csak a connectedCallback-ben!
    }

    // ------------ Natív függvények

    // Itt kell definiálni azokat az attribútum neveket, amiket módosítva meghívódjon az attributeChangedCallback natív függvény.
    static get observedAttributes () {
      return [ 'background', 'height', 'width', 'visible' ]
    }

    /*
    Called every time the element is inserted into the DOM.
    Useful for running setup code, such as fetching resources or rendering.
    Generally, you should try to delay work until this time.
    */
    connectedCallback () {
      console.log('connected')

      this.render()
    }

    /*
    Called every time the element is removed from the DOM.
    Useful for running clean up code (removing event listeners, etc.).
    */
    disconnectedCallback () {
      console.log('disconnected')
    }

    /*
    An attribute was added, removed, updated, or replaced.
    Also called for initial values when an element is created by the parser, or upgraded.
    Note: only attributes listed in the observedAttributes property will receive this callback.
    */
    attributeChangedCallback (attrName, oldVal, newVal) {
      console.log('attribute changed')
      this.render()
    }

    /* The custom element has been moved into a new document (e.g. someone called document.adoptNode(el)). */
    adoptedCallback () {
      console.log('adopted')
    }

    // ------------ Custom függvények

    // Néhány setter és getter.
    // Mivel nem használunk babel-t (transform-class-properties), ezért nincs arrow function sem class method definíciónál.

    get background () {
      return this.getAttribute('background')
    }

    set background (bg) {
      this.setAttribute('background', bg)
    }

    get height () {
      return this.getAttribute('height')
    }

    set height (h) {
      this.setAttribute('height', h)
    }

    get width () {
      return this.getAttribute('width')
    }

    set width (w) {
      this.setAttribute('width', w)
    }

    get visible () {
      return this.getAttribute('visible')
    }

    set visible (visible) {
      this.setAttribute('visible', visible)
    }


    // A rendert csak azért csináltam, hogy maradjunk a react-ban megszokott dolgoknál.
    // Ezt a függvényt a constructorban ÉS minden attribútumváltáskor meghívjuk, ezzel újraalkotjuk a contentet.
    render () {
      const s = this.div.style

      s.backgroundColor = this.background
      s.width   = this.width + 'px'
      s.height  = this.height + 'px'
      s.opacity = this.visible !== 'false' ? 1 : 0
    }
  }

  /*
  A globális customElements objectet lehet használni arra, hogy a böngésző tudja értelmezni az új tag-eket, amit csináltunk
  customElements.define('my-new-tag-name', MyNewTagClass)
  */

  /*
  The customElements global is used for defining a custom element and teaching the browser about a new tag.
  Call customElements.define() with the tag name you want to create and a JavaScript class that extends the base HTMLElement.
  */

  customElements.define('my-component', MyComponent)

  // ------------ Demonstráció
  document.addEventListener('DOMContentLoaded', () => {
    const myComp = document.querySelector('my-component')

    setTimeout(() => {
      console.log('változtassunk hátteret')
      myComp.background = 'red'
    }, 1000)

    setTimeout(() => {
      console.log('változtassunk szélességet')
      myComp.width = 200
    }, 2000)

    setTimeout(() => {
      console.log('változtassunk magasságot')
      myComp.height = 200
    }, 3000)

    setTimeout(() => {
      console.log('fizikailag még ott van, de már nem látható')
      myComp.visible = false
    }, 4000)

    setTimeout(() => {
      console.log('viszlát!')
      myComp.parentNode.removeChild(myComp)
    }, 5000)
  })
})()
