(function(){
	var root = this;
	var _9d = root._9d = root._9d || {};

	_9d.VERSION = '0.0.3';


	_9d.collection = function(){
		var self = this;
		var notifier = Object.getNotifier(self);

		var myCollection = {};
		self.size = function() {
			return Object.keys(myCollection).length;
		};
		self.put = function(key, value) {
			var changeType = "add";
			if (myCollection[key]) changeType = "update";
			notifier.notify({
				type: changeType,
				key: key,
				oldValue: myCollection[key]
			})
    		myCollection[key] = value; 
		};
		self.get = function(key) { return myCollection[key]; };
		self.remove = function(key) { 
			notifier.notify({
				type: 'remove',
				key: key,
				oldValue: myCollection[key]
			})

			delete myCollection[key]; 
		};
		self.upsert = function(key, value) {
			var changeType = "update";
			if (!myCollection[key]) {myCollection[key] = {}; changeType = "add"}
			notifier.notify({
				type: changeType,
				key: key,
				oldValue: myCollection[key]
			})


			for(var prop in value){
				myCollection[key][prop] = value[prop];
			}
		};
		self.clear = function() { 
			notifier.notify({
				type: 'reset',
				name: 'collection',
				oldValue: myCollection
			})

			myCollection = {} 
		};
		self.iterator = function(callback) {
			for(var prop in myCollection){
				callback(myCollection[prop])
			}
		};
		self.toArray = function() {
			var res = [];
			for(var prop in myCollection){
				res.push(myCollection[prop]);
			}
			return res;
		};
	};


}).call(this);

