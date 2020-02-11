
const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
	@import url("/styles/active-icons.css");
	:host {
		text-align: center;
		position: relative; 
	}
	.card {
		float: left;
		position: relative;
		width: 28%;
		height:150px;
		margin: 8px;
		border: 2px solid #000;
		border-radius: 8px; 
		color:#000;
	}
	.card-bg {
		position: absolute;
		background-color: rgb(253, 205, 47);
		opacity: 0.25;
		width: 100%;
		height:100%;
	}
	.card-title {font-size: 1.25em;padding: 0 4px}
	.card-desc {padding: 8px}

	.clearfix{clear: both;}
	.hidden { display: none;}

</style> <!-- look ma, scoped styles -->
<div class="card">
	<div class="card-bg"></div>
	<div class="card-title" id="cardTitle"></div>
	<div class="card-desc" id="cardDesc"></div>
</div>
`;


class DisplayCard extends HTMLElement {
    static get is() {
        return 'display-card';
    }
    constructor() {
        super();

		this._cardId = 0;
		this._cardTitle = "";
		this._cardDesc = "";

        // Attach a shadow root to the element.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['card-title', 'card-desc', 'card-id'];
    }

    render() {
        let titleEl = this.shadowRoot.querySelector("#cardTitle");
        titleEl.innerText = this._cardTitle;
        let descEl = this.shadowRoot.querySelector("#cardDesc");
        descEl.innerText = this._cardDesc;
    }

    connectedCallback() {
        this._cardId = this.getAttribute('card-id');
        this._cardTitle = this.getAttribute('card-title');
        this._cardDesc = this.getAttribute('card-desc');
        this.render()
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'card-id') { this._cardId = newVal; this.render(); }
        if (attrName === 'card-title') { this._cardTitle = newVal; this.render(); }
        if (attrName === 'card-desc') { this._cardDesc = newVal; this.render(); }
    }

    get cardId(){ return this._cardId; }
    set cardId(val){
		this._cardId = val;
        if (val) { this.setAttribute('card-id', val); }
        else { this.removeAttribute('card-id'); }
		this.render()
    }
    get cardTitle(){ return this._cardTitle; }
    set cardTitle(val){
		this._cardTitle = val;
        if (val) { this.setAttribute('card-title', val); }
        else { this.removeAttribute('card-title'); }
		this.render()
    }
    get cardDesc(){ return this._cardDesc; }
    set cardDesc(val){
		this._cardDesc = val;
        if (val) { this.setAttribute('card-desc', val); }
        else { this.removeAttribute('card-desc'); }
		this.render()
    }

}  // END DisplayCard

customElements.define(DisplayCard.is, DisplayCard);
//export default DisplayCard;

