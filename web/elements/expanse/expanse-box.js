(function(){
	// importDoc references this import's document
	var importDoc = document.currentScript.ownerDocument;


	var proto = Object.create(HTMLElement.prototype);
	proto.linkedData;

	proto.deleteEvent = new Event('delete');
	proto.selectEvent; // = new Event('selected');
	proto.deselectEvent = new Event('deselected');

/*
	proto.observer = function(changes){
		var self = this;

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
	};
*/
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

	proto.Mode = "V";
	proto.root;
	proto.selected = false;

	proto.toggleExpanse = function() {
		var self = this;

		if (self.selected) {
			self.deselectExpanse();
			self.dispatchEvent(self.deselectEvent);
		} else {
			self.selectExpanse();
			self.dispatchEvent(self.selectEvent);
		}
	};
	proto.selectExpanse = function() {
		var self = this;


		self.selected = true;
		//self.root.querySelector("#select").className += "selected";
		addClass(self.root, "#select", "selected")
	};
	proto.deselectExpanse = function() {
		var self = this;

		self.selected = false;
		//self.root.querySelector("#select").className = "";
		removeClass(self.root, "#select", "selected")
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
		//console.log('linkedData', self.linkedData);
		//console.log('privateData', self.privateData);

		if (self.Mode === 'E') {
			self.root.querySelector('#title').value = self.linkedData.title
		} else {
			self.root.querySelector('#title').innerText = self.linkedData.title;
		}
		self.root.querySelector('#purpose').innerText = self.linkedData.purpose
	};
	proto.loadView = function(){
		var self = this;
		var t = importDoc.querySelector('#expanse-box');
		var clone = document.importNode(t.content, true);

		self.cleanRoot();
		self.root.appendChild(clone);
		self.root.querySelector("#edit").addEventListener('click', function(e) {
			self.setAttribute('mode', 'E');
		});
		self.root.querySelector("#select").addEventListener('click', function(e) {
			self.toggleExpanse();
		});


		self.updateValues();
	};
	proto.loadEdit = function(){
		var self = this;
		var t = importDoc.querySelector('#expanse-box-edit');
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
			//self.setAttribute('expanse-title', event.srcElement.value);
		});
		self.root.querySelector('#purpose').addEventListener('change', function(event) {
			//self.setAttribute('expanse-purpose', event.srcElement.value);
			self.linkedData.purpose = event.srcElement.value;
		});

		self.updateValues();
	};



	// Fires when an instance of the element is created
	proto.createdCallback = function() {
		var self = this;

		self.root = self.createShadowRoot();

		self.Mode = self.getAttribute('mode') || 'V';
		//proto.ExpanseId = self.getAttribute('expanse-id') || '';
		//proto.Title = self.getAttribute('expanse-title') || '';
		//proto.Purpose = self.getAttribute('expanse-purpose') || '';

	
		if (self.Mode === "E") {
			self.loadEdit();
		} else {
			self.loadView();
		}
	};

	// Fires when an instance was inserted into the document
	proto.attachedCallback = function() {};
	// Fires when an instance was removed from the document
	proto.detachedCallback = function() {};
	// Fires when an attribute was added, removed, or updated
	proto.attributeChangedCallback = function(attr, oldVal, newVal) {
		var self = this;
		switch (attr) {
			case "mode":
				if (newVal != oldVal) {
					self.Mode = newVal;
					if (newVal === "E") {
						self.loadEdit();
					} else {
						self.loadView();
					}                    
				}
				break;
		}
	};


	document.registerElement('kolab-expanse-box', { prototype: proto });
}());