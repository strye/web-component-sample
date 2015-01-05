(function(){
	// importDoc references this import's document
	var importDoc = document.currentScript.ownerDocument;
	var linkedData;
	var self, root;
	var tempId = 0;

/*
	var hideElement = function(selector) {
		root.querySelector(selector).className += 'hidden';
	};
	var showElement = function(selector) {
		var classes = root.querySelector(selector).className.replace( /(?:^|\s)hidden(?!\S)/g , '' );
		root.querySelector(selector).className = classes;
	};
*/

	var drawList = function(){
		var container = root.querySelector('#expanses');
		
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

	};
	
	var redrawList = function(){
		var container = root.querySelector('#expanses');
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
	};

	
	var addBox = function(item){
		var container = root.querySelector('#expanses');

		var eBox = document.createElement('kolab-expanse-box');
		eBox.setAttribute('id', "teb-" + item._id);
		eBox.setAttribute('mode', 'V');
		eBox.bindData(item);
		eBox.addEventListener('delete', function (e) { 
			console.log("list", "Deleted");
		}, false);
		container.appendChild(eBox);

	};
	var updateBox = function(newItem){
		var container = root.querySelector('#expanses');

		var eBox = container.querySelector('#teb-' + newItem._id);
		if (eBox) { eBox.bindData(newItem); }

	};
	var deleteBox = function(deleted){
		var container = root.querySelector('#expanses');

		var eBox = container.querySelector('#teb-' + deleted._id);
		if (eBox) { 
			container.removeChild(eBox); 
		}

	};


	var observer = function(changes){
		changes.forEach(function(change, i){
			var res = {
				changeType: change.type
				,itemKey: change.key
				,currentValue: change.object.get(change.key)
				,oldValue: change.oldValue
				,raw: change
			};
			//console.log('list', res); // all changes

			if (change.type === "add") {
				var newObject = change.object.get(change.key);
				addBox(newObject);
			}
			if (change.type === "remove") {
				redrawList();
			}
			if (change.type === "update") {
				//var oldObject = change.oldValue;
				var newObject = change.object.get(change.key);
				updateBox(newObject);
			}

		});

	}

	var proto = Object.create(HTMLElement.prototype);


	proto.selectedItem = null;

	proto.redrawList = function(){
		var container = root.querySelector('#expanses');
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
	};


	proto.bindData = function(data){
		linkedData = data;
		Object.observe(linkedData, observer, ["add", "update", "remove", "reset"]);

		drawList();
	};
	proto.getData = function(){
		return linkedData;
	};


	// Fires when an instance of the element is created
	proto.createdCallback = function() {
		self = this;
		root = self.createShadowRoot();

		var t = importDoc.querySelector('#expanse-list');
		var clone = document.importNode(t.content, true);
		root.appendChild(clone);


		// Setup the data
		self.bindData(kolab.data.getExpanses());



		root.querySelector("#add-expanse").addEventListener('click', function(e) {
			showElement(root, '#new-expanse');
			hideElement(root, '#add-expanse');
  		});
		root.querySelector("#cancel-add").addEventListener('click', function(e) {
			hideElement(root, '#new-expanse');
			showElement(root, '#add-expanse');
		});
		root.querySelector("#save-add").addEventListener('click', function(e) {
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
	};

	// Fires when an instance was inserted into the document
	proto.attachedCallback = function() {};
	// Fires when an instance was removed from the document
	proto.detachedCallback = function() {};
	// Fires when an attribute was added, removed, or updated
	proto.attributeChangedCallback = function(attr, oldVal, newVal) {};


	document.registerElement('kolab-expanse-list', { prototype: proto });

}());