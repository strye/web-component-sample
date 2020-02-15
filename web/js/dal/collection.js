
class Collection {
    constructor(options) {
        this._myCollection = {};        
    }


    get size() {
		return Object.keys(this._myCollection).length;
	};

    hasKey(key) {
        //return this._myCollection.hasOwnProperty(key)
        return ("undefined" !== typeof(this._myCollection[key]))
    }

	put(key, value) { 
		this._myCollection[key] = value; 
	};

	get(key) { 
		return this._myCollection[key]; 
	};

	remove(key) { 
		delete this._myCollection[key]; 
	};

	upsert(key, value) {
		for(var prop in value){
			this._myCollection[key][prop] = value[prop];
		}
	};

	clear() { 
		this._myCollection = {} 
	};

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
	};

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
	};

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
	};



}

export default Collection;