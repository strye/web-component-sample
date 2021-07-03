import config from '/js/config.js';
    
let template = document.createElement('template');
template.innerHTML = /*html*/`
	<style>
        @import url("/style/main.css");
        :host {border:2px solid var(--color-dark);}
        h1 {margin-bottom: 18px;font-size:1.4em;padding:4px 18px;}
	</style>
	<div>
        <h1>My Header <span id="elmTitle"></span></h1>
	</div>
`;

class XTemplate extends HTMLElement {
    static get is() { return 'x-template'; }
    static get observedAttributes() { return ['elm-title']; }
    constructor(options) {
        super();
        this._elmTitle = "";

        // Attach a shadow root to the element.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        let elmTitle = this.shadowRoot.querySelector("#elmTitle");
        elmTitle.innerText = this._elmTitle;
    }

    connectedCallback() {
        this._elmTitle = this.getAttribute('elm-title');
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'elm-title') { 
            this._elmTitle = newValue
            render()
        }
    }
    get elmTitle(){
        return this._elmTitle;
    }
    set elmTitle(val){
		this._elmTitle = val;
        if (val) { this.setAttribute('elm-title', val); } 
        else { this.removeAttribute('elm-title'); }
		this.render()
    }


}  // END XTemplate

customElements.define(XTemplate.is, XTemplate);
    
export default XTemplate;    