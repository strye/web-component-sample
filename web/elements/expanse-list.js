import config from '/js/config.js';

// import data from '../data/data.js'; 
// import eb from 'expanse-box.js'; 


let template = document.createElement('template');
template.innerHTML = /*html*/`
	<style>
        @import url("/style/main.css");
        :host {border:2px solid var(--color-dark);}
        h1 {margin-bottom: 18px;font-size:1.4em;padding:4px 18px;}

	</style>
	<h3>Explore an expanse</h3>

	<div>
		<div class="edit-box">
			<div id="new-expanse" class="hidden">
				<span class="label">Title:</span><br />
				<input id="add-title" type="text" class="text" />
				<br />
				<span class="label">Purpose:</span><br />
				<textarea id="add-purpose" class="text"></textarea>
				<button id="cancel-add">Cancel</button>
				<button id="save-add">Save</button>
			</div>
			<button id="add-expanse">Add Space</button>
		</div>
	
		<div id="expanses" class="item">
			<!-- Place template content here -->
		</div>
	
	</div>
`;

class ExpanseList extends HTMLElement {
    static get is() { return 'expanse-list'; }
    constructor(options) {
        super();
		this._elmTitle = "";
		
		this._data = [];
		this._selectedItem = null;

        // Attach a shadow root to the element.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
	}
	
	get data() { return this._data; }
	get selectedItem() { return this._selectedItem; }
	set selectedItem(val) { this._selectedItem = val; }

    render() {
        let elmTitle = this.shadowRoot.querySelector("#elmTitle");
		elmTitle.innerText = this._elmTitle;
		


		let container = this.shadowRoot.querySelector('#expanses');
		container.innerHTML = "";

		linkedData.iterator(function(item){
			var eBox = container.querySelector('#teb-' + item._id);
			if (!eBox) {
				var eBox = document.createElement('kolab-expanse-box');
				eBox.setAttribute('id', "teb-" + item._id);
				eBox.setAttribute('mode', 'V');
				eBox.bindData(item);

				eBox.addEventListener('delete', function (e) { 
					linkedData.remove(item._id);
				}, false);
				eBox.addEventListener('selected', function (e) { 
					linkedData.iterator(function(item){
						var eBox2 = container.querySelector('#teb-' + item._id);
						if (eBox2.selected && eBox2.linkedData._id != e.detail._id) {
							eBox2.deselectExpanse();
						}
					});
				}, false);

				container.appendChild(eBox);
			}
		});

	}
	
	redrawList(){
		var container = this.shadowRoot.querySelector('#expanses');
		container.innerHTML = "";

		linkedData.iterator(function(item){
			var eBox = document.createElement('kolab-expanse-box');
			eBox.setAttribute('id', "teb-" + item._id);
			eBox.linkedData = item;
			eBox.setAttribute('mode', 'V');

			eBox.addEventListener('delete', function (e) { 
				console.log("list", "Deleted");
			}, false);

			container.appendChild(eBox);

		});
	}

	
	addBox(item){
		var container = this.shadowRoot.querySelector('#expanses');

		var eBox = document.createElement('expanse-box');
		eBox.setAttribute('id', "teb-" + item._id);
		eBox.setAttribute('mode', 'V');
		eBox.addEventListener('delete', function (e) { 
			console.log("list", "Deleted");
		}, false);
		container.appendChild(eBox);
	}
	deleteBox(deleted){
		var container = this.shadowRoot.querySelector('#expanses');

		var eBox = container.querySelector('#teb-' + deleted._id);
		if (eBox) { 
			container.removeChild(eBox); 
		}
	}




    connectedCallback() {
        this._elmTitle = this.getAttribute('elm-title');
        this.render()


		this.shadowRoot.querySelector("#add-expanse").addEventListener('click', function(e) {
			showElement(root, '#new-expanse');
			hideElement(root, '#add-expanse');
  		});
		  this.shadowRoot.querySelector("#cancel-add").addEventListener('click', function(e) {
			hideElement(root, '#new-expanse');
			showElement(root, '#add-expanse');
		});
		this.shadowRoot.querySelector("#save-add").addEventListener('click', function(e) {
			tempId++;
			var title = root.querySelector('#add-title').value;
			var purpose = root.querySelector('#add-purpose').value;
			if (!title || title.length <=0) {
				alert("You must provide a title");
				return false;
			}

			var newRecord = {
				_id: tempId.toString(), 
				title: title, 
				purpose: purpose
			};
			linkedData.put(newRecord._id, newRecord);
		
			hideElement(root, '#new-expanse');
			showElement(root, '#add-expanse');

			root.querySelector('#add-title').value = "";
			root.querySelector('#add-purpose').value = "";
		});


	}

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'elm-title') { 
            this._elmTitle = newValue
            render()
        }
    }

}  // END ExpanseList

customElements.define(ExpanseList.is, ExpanseList);
    
export default ExpanseList;    