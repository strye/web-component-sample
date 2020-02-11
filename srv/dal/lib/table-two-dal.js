const mysqlBase = require('./mysql-base');

class TableTwoDal extends mysqlBase {
	constructor (options) {
		// if (!options) options = {};
		// options.table = "table_1_sample"
		// options.key = "id"
		// console.log(options);
		super(options);

		this._tableName = "table_2_sample"
		this._keyName = "id"

	}
}

module.exports = TableTwoDal
