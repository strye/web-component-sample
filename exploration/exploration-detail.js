(function(){
	// importDoc references this import's document
	var importDoc = document.currentScript.ownerDocument;


	var listManager = function(listContainer, linkedData, idPrefix, boxElement) {
		var self = this;
		
		//self.parent = parent;
		self.listContainer = listContainer;
		self.linkedData = linkedData;
		self.idPrefix = idPrefix;
		self.boxElement = boxElement;

		self.drawList = function(){
			self.linkedData.iterator(function(item){
				var itemBox = self.listContainer.querySelector(self.idPrefix + item._id);
				if (!itemBox) {
					itemBox = document.createElement(self.boxElement);
					itemBox.setAttribute('id', self.idPrefix + item._id);
					itemBox.setAttribute('mode', 'V');
					itemBox.bindData(item);

					itemBox.addEventListener('delete', function (e) { 
						self.linkedData.remove(item._id);
					}, false);

					self.listContainer.appendChild(itemBox);
				}
			});
		};

		self.addBox = function(item){
			var itemBox = document.createElement(self.boxElement);
			itemBox.setAttribute('id', self.idPrefix + item._id);
			itemBox.setAttribute('mode', 'V');
			itemBox.bindData(item);
			itemBox.addEventListener('delete', function (e) { 
				console.log("list", "Deleted");
			}, false);
			self.listContainer.appendChild(itemBox);

		};

		self.updateBox = function(newItem){
			var itemBox = self.listContainer.querySelector(self.idPrefix + newItem._id);
			if (itemBox) { itemBox.bindData(newItem); }
		};

		self.deleteBox = function(deleted){
			var itemBox = container.querySelector(self.idPrefix + deleted._id);
			if (itemBox) { 
				self.listContainer.removeChild(itemBox); 
			}
		};


		self.bindData = function(){
			Object.observe(self.linkedData, function(changes){
				changes.forEach(function(change, i){
					//logObjectChange(change);

					if (change.type === "add") {
						var newObject = change.object.get(change.key);
						self.addBox(newObject);
					}
					if (change.type === "remove") {
						self.redrawList();
					}
					if (change.type === "update") {
						var newObject = change.object.get(change.key);
						self.updateBox(newObject);
					}
				});
			}, ["add", "update", "remove", "reset"]);

			//self.drawList();
		};


		if (self.linkedData) self.bindData();
	}




	var proto = Object.create(HTMLElement.prototype);
	proto.root;
	proto.Tab = "asperations";
	proto.ExplorationId = "";

	proto.asperationData;
	proto.inquiryData;
	proto.activityData;
	proto.momentoData;

	proto.asperationManager;
	proto.inquiryManager;
	proto.activityManager;
	proto.momentoManager;




	proto.tabChangedEvent = new Event('tab');

	proto.loadList = function(){
		var self = this;

	};

	proto.bindData = function(explorationId){
		var self = this;
		if (!explorationId || explorationId.length <= 0) {
			return false;
		}

		// Check for change
		if (self.ExplorationId.length <= 0){
			self.ExplorationId = explorationId;
		}


		// Clean out old data
		if (self.ExplorationId != explorationId){
			self.linkedData = null;
			self.root.querySelector('#list-content').innerHTML = "";

			self.ExplorationId = explorationId;
		}


		// Setup new data
		self.asperationData = kolab.data.getAspirations(self.ExplorationId);
		self.asperationManager = new listManager(self.root.querySelector('#list-content'), self.asperationData, 'aspr-', 'kolab-asperation');

		self.inquiryData = kolab.data.getInquiries(self.ExplorationId);
		self.inquiryManager = new listManager(self.root.querySelector('#list-content'), self.inquiryData, 'inq-', 'kolab-inquiry');

		self.activityData = kolab.data.getActivities(self.ExplorationId);
		self.activityManager = new listManager(self.root.querySelector('#list-content'), self.activityData, 'act-', 'kolab-activity');

		self.momentoData = kolab.data.getMomentos(self.ExplorationId);
		self.momentoManager = new listManager(self.root.querySelector('#list-content'), self.momentoData, 'mom-', 'kolab-momento');

		self.setAttribute('exploration-id', self.ExplorationId);	
	};


	// Fires when an instance of the element is created
	proto.createdCallback = function() {
		var self = this;

		self.root = self.createShadowRoot();

		var t = importDoc.querySelector('#exploration-detail');
		var clone = document.importNode(t.content, true);
		self.root.appendChild(clone);

		self.Tab = self.getAttribute('tab') || 'asperations'; // R=Readonly; V=View (Navigaton)

		// Setup the data
		self.ExplorationId = self.getAttribute('exploration-id') || '';	
		if (self.ExplorationId.length > 0){
			//self.bindData(self.ExplorationId);
		}

		// Setup event listeners.
		self.root.querySelector("#aspiration-tab").addEventListener('click', function(e) {
			self.setAttribute('tab', 'asperations');
		});
		self.root.querySelector("#inquiry-tab").addEventListener('click', function(e) {
			self.setAttribute('tab', 'inquiries');
		});
		self.root.querySelector("#activity-tab").addEventListener('click', function(e) {
			self.setAttribute('tab', 'activities');
		});
		self.root.querySelector("#momento-tab").addEventListener('click', function(e) {
			self.setAttribute('tab', 'momentos');
		});


	};

	// Fires when an instance was inserted into the document
	proto.attachedCallback = function() {};
	// Fires when an instance was removed from the document
	proto.detachedCallback = function() {};
	// Fires when an attribute was added, removed, or updated
	proto.attributeChangedCallback = function(attr, oldVal, newVal) {
		var self = this;

		if (attr === "exploration-id") {
			if (newVal != oldVal) {
				self.bindData(newVal);
			}
		}

		if (attr === "tab") {
			//if (newVal != oldVal) {
				self.Tab = newVal;

				switch (newVal) {
					case "asperations":
						//console.log("tabs","asperations")
						self.root.querySelector('#list-content').innerHTML = "";
						self.asperationManager.drawList();
						break;
					case "activities":
						//console.log("tabs","activities")
						self.root.querySelector('#list-content').innerHTML = "";
						self.activityManager.drawList();
						break;
					case "inquiries":
						//console.log("tabs","inquiries")
						self.root.querySelector('#list-content').innerHTML = "";
						self.inquiryManager.drawList();
						break;
					case "momentos":
						//console.log("tabs","momentos")
						self.root.querySelector('#list-content').innerHTML = "";
						self.momentoManager.drawList();
						break;
				}
			//}
		}
	};

	document.registerElement('kolab-exploration-detail', { prototype: proto });

}());