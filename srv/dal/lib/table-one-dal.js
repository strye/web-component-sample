const mysqlBase = require('./mysql-base');

class TableOneDal extends mysqlBase {
	constructor (options) {
		if (!options) options = {};
		options.database = "sample_db"

        super(options);

		this._tableName = "table_1_sample"
        this._keyName = "id"
        this._sortDefault = "`one`, `two`, `THREE`"

		this._fieldList = [
            {name: "id", type: "int", code: "id", canEdit: false},
            {name: "one", type: "text", code: "ti", canEdit: true},
            {name: "two", type: "text", code: "act", canEdit: true},
            {name: "THREE", type: "textarea", code: "bktcntx", canEdit: true},
            {name: "DELTA", type: "textarea", code: "delta", canEdit: true}
        ];


	}
}

module.exports = TableOneDal
