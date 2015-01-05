(function(){
	// importDoc references this import's document
	var importDoc = document.currentScript.ownerDocument;
	//var linkedData;
	//var self, root;
	var tempId = 0;



	var proto = Object.create(HTMLElement.prototype);
	proto.linkedData;
	proto.root;
	self.Mode = "R";

	proto.selectedItem = null;
	proto.activateEvent = new Event('activated');
	proto.browseEvent = new Event('browse');


	proto.drawList = function(){
		var self = this;

		var container = self.root.querySelector('#explorations');
		
		self.linkedData.iterator(function(item){
			var eBox = container.querySelector('#explr-' + item._id);
			if (!eBox) {
				var eBox = document.createElement('kolab-exploration-box');
				eBox.setAttribute('id', "explr-" + item._id);
				eBox.setAttribute('mode', self.Mode);
				eBox.bindData(item);

				eBox.addEventListener('delete', function (e) { 
					self.linkedData.remove(item._id);
				}, false);
				eBox.addEventListener('selected', function (e) { 

					self.linkedData.iterator(function(item){
						var eBox2 = container.querySelector('#explr-' + item._id);
						if (eBox2.selected && eBox2.linkedData._id != e.detail._id) {
							eBox2.deselectExploration();
						}
					});
				}, false);

				container.appendChild(eBox);
			}
		});

	};



	proto.redrawList = function(){
		var self = this;

		var container = self.root.querySelector('#explorations');
		container.innerHTML = "";

		self.linkedData.iterator(function(item){
			var eBox = document.createElement('kolab-exploration-box');
			eBox.setAttribute('id', "explr-" + item._id);
			eBox.linkedData = item;
			eBox.setAttribute('mode', self.Mode);

			eBox.addEventListener('delete', function (e) { 
				console.log("list", "Deleted");
			}, false);

			container.appendChild(eBox);
		});
	};

	proto.addBox = function(item){
		var self = this;

		var container = self.root.querySelector('#explorations');

		var eBox = document.createElement('kolab-exploration-box');
		eBox.setAttribute('id', "explr-" + item._id);
		eBox.setAttribute('mode', self.Mode);
		eBox.bindData(item);
		eBox.addEventListener('delete', function (e) { 
			console.log("list", "Deleted");
		}, false);
		container.appendChild(eBox);

	};
	proto.updateBox = function(newItem){
		var self = this;

		var container = self.root.querySelector('#explorations');

		var eBox = container.querySelector('#explr-' + newItem._id);
		if (eBox) { eBox.bindData(newItem); }

	};
	proto.deleteBox = function(deleted){
		var self = this;

		var container = self.root.querySelector('#explorations');

		var eBox = container.querySelector('#explr-' + deleted._id);
		if (eBox) { 
			container.removeChild(eBox); 
		}

	};







	proto.bindData = function(expanseId){
		var self = this;
		if (!expanseId || expanseId.length <= 0) {
			return false;
		}

		// Check for change
		if (self.ExpanseId.length <= 0){
			self.ExpanseId = expanseId;
		}


		// Clean out old data
		if (self.ExpanseId != expanseId){
			self.linkedData = null;
			self.root.querySelector('#explorations').innerHTML = "";

			self.ExpanseId = expanseId;
		}


		// Setup new data
		self.linkedData = kolab.data.getExplorations(self.ExpanseId);

		Object.observe(self.linkedData, function(changes){
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
					self.addBox(newObject);
				}
				if (change.type === "remove") {
					self.redrawList();
				}
				if (change.type === "update") {
					//var oldObject = change.oldValue;
					var newObject = change.object.get(change.key);
					self.updateBox(newObject);
				}

			});

		}, ["add", "update", "remove", "reset"]);


		self.drawList();

		self.setAttribute('expanse-id', self.ExpanseId);	
	};
	proto.getData = function(){
		var self = this;

		return self.linkedData;
	};



	proto.cleanRoot = function() {
		var self = this;

		for (var i = self.root.childNodes.length -1; i >= 0; i--) {
			self.root.removeChild(self.root.childNodes[i]);
		}
	};

	proto.loadReadonly = function(){
		var self = this;

		var t = importDoc.querySelector('#exploration-list-readonly');
		var clone = document.importNode(t.content, true);

		self.cleanRoot();
		self.root.appendChild(clone);

		self.root.querySelector("#goto-expanse").addEventListener('click', function(e) {
			self.setAttribute('mode', 'V');
			self.dispatchEvent(self.activateEvent);
		});

	};
	proto.loadNavigation = function(){
		var self = this;

		var t = importDoc.querySelector('#exploration-list');
		var clone = document.importNode(t.content, true);
		
		self.cleanRoot();
		self.root.appendChild(clone);

		self.root.querySelector("#browse-expanse").addEventListener('click', function(e) {
			self.setAttribute('mode', 'R');
			self.dispatchEvent(self.browseEvent);
		});

		self.root.querySelector("#add-exploration").addEventListener('click', function(e) {
			showElement(self.root, '#new-exploration');
			hideElement(self.root, '#add-exploration');
			hideElement(self.root, '#browse-expanse');
  		});
		self.root.querySelector("#cancel-add").addEventListener('click', function(e) {
			hideElement(self.root, '#new-exploration');
			showElement(self.root, '#add-exploration');
			showElement(self.root, '#browse-expanse');
		});
		self.root.querySelector("#save-add").addEventListener('click', function(e) {
			tempId++;
			var title = self.root.querySelector('#add-title').value;
			var order = self.root.querySelector('#add-order').value;
			var level = self.root.querySelector('#add-level').value;
			if (!title || title.length <=0) {
				alert("You must provide a title");
				return false;
			}

			var newRecord = {
				_id: tempId.toString(), 
				title: title, 
				order: order,
				level: level
			};
			self.linkedData.put(newRecord._id, newRecord);
		
			hideElement(self.root, '#new-exploration');
			showElement(self.root, '#add-exploration');
			showElement(self.root, '#browse-expanse');

			self.root.querySelector('#add-title').value = "";
			self.root.querySelector('#add-order').value = "";
			self.root.querySelector('#add-level').value = "";
		});

	};


	// Fires when an instance of the element is created
	proto.createdCallback = function() {
		var self = this;

		self.root = self.createShadowRoot();

		self.Mode = self.getAttribute('mode') || 'R'; // R=Readonly; V=View (Navigaton)

		if (self.Mode === "V") {
			self.loadNavigation();
		} else {
			self.loadReadonly();
		}

		// Setup the data
		self.ExpanseId = self.getAttribute('expanse-id') || '';	
		if (self.ExpanseId.length > 0){
			self.bindData(self.ExpanseId);
		}

	};

	// Fires when an instance was inserted into the document
	proto.attachedCallback = function() {};
	// Fires when an instance was removed from the document
	proto.detachedCallback = function() {};
	// Fires when an attribute was added, removed, or updated
	proto.attributeChangedCallback = function(attr, oldVal, newVal) {
		var self = this;

		if (attr === "expanse-id") {
			if (newVal != oldVal) {
				self.bindData(newVal);
			}
		}

		if (attr === "mode") {
			if (newVal != oldVal) {
				self.Mode = newVal;

				if (self.Mode === "V") {
					self.loadNavigation();
				} else {
					self.loadReadonly();
				}
				self.drawList();
			}
		}

	};


	document.registerElement('kolab-exploration-list', { prototype: proto });

}());