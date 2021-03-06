class Collection {
    constructor(options) {
		super(options);

		this._myCollection = {};
		this._key = options.key || "id";

		let self = this;
		this._rowHandler = {
			set: function (target, key, val) {
				let ov = target[key], res = false;
				if (key in target) { target[key] = val; res = true; }
				else { res = target.setItem(key, val); }
				self.emit('update', { type:'change', row: target[self._key], property: key, oldVal: ov, newVal: val });
				return res;
			},
		};

		if (options && options.key && options.data) {
			options.data.forEach(itm => {
				let keyVal = itm[self._key];
				self._myCollection[keyVal] = new Proxy(itm, self._rowHandler);
			});
		}
    }
	get size() { return Object.keys(this._myCollection).length; }
    //size() { return Object.keys(this._myCollection).length; };

	hasKey(key) {
        //return this._myCollection.hasOwnProperty(key)
        return ("undefined" !== typeof(this._myCollection[key]))
    }

	put(key, value) { 
		this._myCollection[key] = new Proxy(value, this._rowHandler); 
		this.emit('update', { type:'add', row: key });
	}

	get(key) { 
		return this._myCollection[key]; 
	}

	remove(key) { 
		delete this._myCollection[key]; 
		this.emit('update', { type:'remove', row: key });
	}

	upsert(key, value) {
		for(var prop in value){
			this._myCollection[key][prop] = value[prop];
		}
	}

	clear() { 
		this._myCollection = {};
		this.emit('update', { type:'clear' });
	}

	forEach(callback){
		let collection = this._myCollection;
		let idx = 0;
		for(var prop in collection){
			callback(collection[prop], idx);
			idx++;
		}
	}
	iterator(callback, sort, filter) {
		var collection = this._myCollection;
		var res = [];
		for(var prop in collection){
			var record = collection[prop];
			if (filter) {
				if (record[filter.field] === filter.criteria) res.push(record);
			} else {
				res.push(record);
			}
		}
		if (sort) {
			res.sort(function(a,b) {
				if (a[sort] < b[sort]) return -1;
				if (a[sort] > b[sort]) return 1;
				return 0;
			});
		}
		res.forEach((item, idx) => {
			callback(item, idx);
		});
	}

	toArray(sortField) {
		var collection = this._myCollection;
		var res = [];
		for(var prop in collection){
			res.push(collection[prop]);
		}
		if (sortField) {
			return res.sort(function(a,b) {
				if (a[sortField] < b[sortField]) return -1;
				if (a[sortField] > b[sortField]) return 1;
				return 0;
			});
		} else {
			return res;
		}
	}

	filteredArray(criteria, value, sortField) {
		var collection = this._myCollection;
		var res = [];
		for(var prop in collection){
			if (collection[prop][criteria] === value) {
				res.push(collection[prop]);
			}
		}
		if (sortField) {
			return res.sort(function(a,b) {
				if (a[sortField] < b[sortField]) return -1;
				if (a[sortField] > b[sortField]) return 1;
				return 0;
			});
		} else {
			return res;
		}
	}

}
module.exports = Collection

