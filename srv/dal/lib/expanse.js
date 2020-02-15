const coll = require("./Collection"),
fileDb = require('../../../data');

class Expanses {
	constructor (options) {
		// if (!options) options = {};
		// options.table = "table_1_sample"
		// options.key = "id"
		// console.log(options);
		super(options);

		this._tableName = "expanses";
        this._keyName = "_id";
        this._parentKey = null;

        this._dataCache = new coll({key: "_id", data: fileDb.Expanses});
    }
    
    getAll() { return this._dataCache; }
    getById(expanseId) {}
    getByParentId(parentId) {}
}

module.exports = Expanses
