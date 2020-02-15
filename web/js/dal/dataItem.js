
class DataItem {
    constructor(options) {

        this._key = options.key || null;

        this._order = options.order || null;
        this._values = options.values || {};

        let orgV = {};
        for (const fld in this._values) {
            orgV[fld] = this._values[fld];
        }
        this._orgValue = orgV;
        this._dirty = {};


        this._counter = 0;     
    }
    get key() { return this._key; }
    get order() { return this._order; }
    get orgValue() { return this._orgValue; }
    get dirty() { return this._dirty; }

    get values() { return this._values; }
    set values(val) {
        this._values = val;

        let orgV = {};
        for (const fld in this._values) {
            orgV[fld] = this._values[fld];
        }
        this._orgValue = orgV;
        this._dirty = {};
    }


    _raiseEvent(type, msg) {
        // EX: this._raiseEvent('change', { itemKey: 3, item: this._values })
        this.dispatchEvent(new CustomEvent(type, { 
            bubbles: true, 
            detail: msg
        }))
    }

    getFieldValue(field){
        return this._values[field]
    }
    rowDirty(){
        return (Object.keys(this._dirty).length > 0)
    }
    fieldDirty(field){
        let hasField = ("undefined" !== typeof(this._dirty[field]));
        return (hasField && this._dirty[field])
    }
    passFilter(filter) {
        let res = true;
        for(var prop in filter) {
            if (this._values[prop] !== filter[prop]) res = false;
        }
        return res;
    }

    resetValue() {
        for (const fld in this._orgValue) {
            this._values[fld] = this._orgValue[fld];
        }
        this._dirty = {}
    }
    checkDif() {
        let dirt = false;
        for (const fld in this._values) {
            if (this._values[fld] !== this._orgValue[fld]) {
                this._dirty[fld] = true;
                dirt = true;
            } else {
                delete this._dirty[fld];
            }
        }
        return dirt;
    }

	updateField(field, value) {
    	this._values[field] = value;
        this.checkDif()
	};

	update(values) {
        let self = this;
		for(var prop in values){
            if (prop !== self._key) self._values[prop] = values[prop];
		}
        self.checkDif(key)
	};

}

export default DataItem;