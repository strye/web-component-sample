const comErr = require('../../utils/commonErrors'),
	config = require("../../../config/dev.json");

const mysql      = require('mysql');
let pool = null;


class mySqlBase {
	constructor (options) {
		let _conOpt = config.connection

		if (options && options.user) _conOpt.user = options.user
		if (options && options.password) _conOpt.password = options.password
		if (options && options.database) _conOpt.database = options.database
        
		pool  = mysql.createPool(_conOpt);	
	}

	getAll(options) {
		const tbl = this._tableName;
		return new Promise(function(resolve, reject){
			let flds = "*";
			if (options && options.fields && options.fields.length > 0) flds = options.fields;
			let baseStr = `SELECT ${flds} FROM ${tbl}`
			//console.log(baseStr)

			pool.query(baseStr, function (error, results) {
				if (error) reject(error);
				resolve(results);
			});
			//reject(comErr.notImplemented(`${this._tableName}.getAll`));
		})
	}

	getOne(id, options) {
		const tbl = this._tableName,
			ky = this._keyName;
		return new Promise(function(resolve, reject){
			let flds = "*";
			if (options && options.fields && options.fields.length > 0) flds = options.fields;
			let baseStr = `SELECT ${flds} FROM ${tbl} WHERE ${ky} = ?`
			let sql = mysql.format(baseStr, [id]);
			console.log(sql)

			pool.query(sql, function (error, results) {
				if (error) reject(error);
				resolve(results);
			});
//			reject(comErr.notImplemented(`${tbl}.getOne`));
		})
	}

	find(filter, options) {
		const tbl = this._tableName,
            ky = this._keyName,
            order = this._sortDefault;
        //console.log(filter)
		return new Promise(function(resolve, reject){
			let flds = "*";
			if (options && options.fields && options.fields.length > 0) flds = options.fields;
			let baseStr = `SELECT ${flds} FROM ${tbl} WHERE ?`
            let sql = mysql.format(baseStr, filter);

            if (order && order.length > 0){
                //order by 
                sql += ' order by ' + order;
            }
            //console.log(sql)

			pool.query(sql, function (error, results) {
				if (error) reject(error);
				resolve(results);
			});
//			reject(comErr.notImplemented(`${tbl}.find`));
		})
	}

// 	run(sql) {
// 		return new Promise(function(resolve, reject){
// 			pool.query(sql, function (error, results) {
// 				if (error) reject(error);
// 				resolve(results);
// 			});
// //			reject(comErr.notImplemented(`${tbl}.getAll`));
// 		})
// 	}

	create(data) {
		const tbl = this._tableName;
		return new Promise(function(resolve, reject){
			//var post  = {id: 1, title: 'Hello MySQL'};
			let baseStr = `INSERT INTO ${tbl} SET ??`
			let sql = mysql.format(baseStr, data);

			pool.query(sql, function (error, results, fields) {
  				if (error) reject(error);
				resolve(results);
			});
			//reject(comErr.notImplemented(`${tbl}.create`));
		})
	}

	update(id, data) {
		const tbl = this._tableName,
			ky = "`"+this._keyName+"`";
		return new Promise(function(resolve, reject){
			let baseStr = `UPDATE ${tbl} SET ? WHERE ${ky} = ?`
			let sql = mysql.format(baseStr, [data, id]);
			console.log(sql)

			pool.query(sql, function (error, results, fields) {
				if (error) reject(error);
			  resolve(results);
		  });
		  //reject(comErr.notImplemented(`${tbl}.update`));
		})
	}

	delete(id) {
		const tbl = this._tableName,
			ky = this._keyName;
		return new Promise(function(resolve, reject){
			let baseStr = `DELETE FROM ${tbl} WHERE ${ky} = ?`
			let sql = mysql.format(baseStr, [id]);

			pool.query(sql, function (error, results, fields) {
				if (error) reject(error);
			  resolve(results);
		  });
//		  reject(comErr.notImplemented(`${tbl}.delete`));
		})
	}

}


module.exports = mySqlBase