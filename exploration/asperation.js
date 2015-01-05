(function(){
	// importDoc references this import's document
	var importDoc = document.currentScript.ownerDocument;

	var boxLoadManager = function(parent, root) {
		var self = this;
		self.parent = parent;
		self.root = root;

		self.cleanRoot = function() {
			for (var i = self.root.childNodes.length -1; i >= 0; i--) {
				self.root.removeChild(self.root.childNodes[i]);
			}
		};

		self.loadTemplate = function(templateName, extender){
			var t = importDoc.querySelector(templateName);
			//console.log(t);
			//console.log(t.);
			var clone = document.importNode(t.content, true);

			self.cleanRoot();
			self.root.appendChild(clone);

			extender();

			self.parent.updateValues();
		};
	};


	var proto = Object.create(HTMLElement.prototype);
	proto.root;
	proto.linkedData;
	proto.Mode = "V";
	proto.loadManager;

	proto.deleteEvent = new Event('delete');


	proto.bindData = function(data){
		var self = this;
		self.linkedData = data;

		Object.observe(data, function(changes){
			changes.forEach(function(change, i){ 
				//logObjectChange(change);
			});

			self.updateValues();
		});

		self.updateValues();
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
	proto.loadView = function(){
		var self = this;

		self.loadManager.loadTemplate('#asperation', function(){
			self.root.querySelector("#edit").addEventListener('click', function(e) {
				self.setAttribute('mode', 'E');
			});

			self.updateValues();
		});


	};
	proto.loadEdit = function(){
		var self = this;

		self.loadManager.loadTemplate('#asperation-edit', function(){
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
				self.linkedData.level = event.srcElement.value;
			});

			self.updateValues();
		});
	};



	// Fires when an instance of the element is created
	proto.createdCallback = function() {
		var self = this;
		self.root = self.createShadowRoot();
		self.Mode = self.getAttribute('mode') || 'V';
		self.loadManager = new boxLoadManager(self, self.root);
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
					default:
						self.loadView();
						break;
				}
			}
		}
	};


	document.registerElement('kolab-asperation', { prototype: proto });
}());