(function(){
	// importDoc references this import's document
	var importDoc = document.currentScript.ownerDocument;


	var proto = Object.create(HTMLElement.prototype);
	proto.linkedData;

	proto.deleteEvent = new Event('delete');
	proto.selectEvent; // = new Event('selected');
	proto.deselectEvent = new Event('deselected');


	proto.bindData = function(data){
		var self = this;
		self.linkedData = data;
		self.selectEvent = new CustomEvent('selected', { 'detail': self.linkedData });

		Object.observe(data, function(changes){
			changes.forEach(function(change, i){ 
				var res = {
					propertyChanged: change.name
					,changeType: change.type
					,currentValue: change.object[change.name]
					,oldValue: change.oldValue
					,raw: change
				};
				//console.log('box', res); // all changes
			});

			self.updateValues();
		});

		self.updateValues();
	};

	proto.Mode = "R";
	proto.root;
	proto.selected = false;


	proto.toggleExpanse = function() {
		var self = this;

		if (self.selected) {
			self.deselectExploration();
			self.dispatchEvent(self.deselectEvent);
		} else {
			self.selectExploration();
			self.dispatchEvent(self.selectEvent);
		}
	};
	proto.selectExploration = function() {
		var self = this;

		self.selected = true;
		addClass(self.root, ".item", "selected")
	};
	proto.deselectExploration = function() {
		var self = this;

		self.selected = false;
		removeClass(self.root, ".item", "selected")
	};



	proto.cleanRoot = function() {
		var self = this;

		for (var i = self.root.childNodes.length -1; i >= 0; i--) {
			self.root.removeChild(self.root.childNodes[i]);
		}
	};
	proto.updateValues = function() {
		var self = this;
		if (!self.linkedData) { return; }

		if (self.Mode === 'E') {
			self.root.querySelector('#title').value = self.linkedData.title
			self.root.querySelector('#order').value = self.linkedData.order
			self.root.querySelector('#level').value = self.linkedData.level
		} else {
			self.root.querySelector('#title').innerText = self.linkedData.title;
			addClass(self.root, '#title', 'inset-' + self.linkedData.level);
		}
	};
	proto.loadReadOnly = function(){
		var self = this;
		var t = importDoc.querySelector('#exploration-box-ro');
		var clone = document.importNode(t.content, true);

		self.cleanRoot();
		self.root.appendChild(clone);

		self.updateValues();
	};
	proto.loadView = function(){
		var self = this;
		var t = importDoc.querySelector('#exploration-box');
		var clone = document.importNode(t.content, true);

		self.cleanRoot();

		self.root.appendChild(clone);

		self.root.querySelector("#edit").addEventListener('click', function(e) {
			self.setAttribute('mode', 'E');
		});
		self.root.querySelector("#title").addEventListener('click', function(e) {
			self.toggleExpanse();
		});

		self.updateValues();
	};
	proto.loadEdit = function(){
		var self = this;
		var t = importDoc.querySelector('#exploration-box-edit');
		var clone = document.importNode(t.content, true);

		self.cleanRoot();
		self.root.appendChild(clone);

		self.root.querySelector("#save").addEventListener('click', function(e) {
			self.setAttribute('mode', 'V');
  		});
		self.root.querySelector("#remove").addEventListener('click', function(e) {
			self.dispatchEvent(self.deleteEvent);
		});

		self.root.querySelector('#title').addEventListener('change', function(event) {
			self.linkedData.title = event.srcElement.value;
		});
		self.root.querySelector('#order').addEventListener('change', function(event) {
			self.linkedData.order = event.srcElement.value;
		});
		self.root.querySelector('#level').addEventListener('change', function(event) {
			self.linkedData.order = event.srcElement.value;
		});

		self.updateValues();
	};



	// Fires when an instance of the element is created
	proto.createdCallback = function() {
		var self = this;

		self.root = self.createShadowRoot();

		self.Mode = self.getAttribute('mode') || 'R';
		//proto.ExpanseId = self.getAttribute('expanse-id') || '';
		//proto.Title = self.getAttribute('expanse-title') || '';
		//proto.Purpose = self.getAttribute('expanse-purpose') || '';

		/*
		switch (self.Mode) {
			case "E":
				self.loadEdit();
				break;
			case "V":
				self.loadView();
			default:
				self.loadReadOnly();
				break;
		}
		*/
	};

	// Fires when an instance was inserted into the document
	proto.attachedCallback = function() {};
	// Fires when an instance was removed from the document
	proto.detachedCallback = function() {};
	// Fires when an attribute was added, removed, or updated
	proto.attributeChangedCallback = function(attr, oldVal, newVal) {
		var self = this;

		if (attr === "mode") {
			if (newVal != oldVal) {
				self.Mode = newVal;
			switch (newVal) {
					case "E":
						self.loadEdit();
						break;
					case "V":
						self.loadView();
						break;
					default:
						self.loadReadOnly();
						break;
				}
			}
		}
	};


	document.registerElement('kolab-exploration-box', { prototype: proto });
}());