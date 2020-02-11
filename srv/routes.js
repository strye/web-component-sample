const path = require('path'),
comErr = require('./utils/commonErrors');

const routes = function(app) {

	app.get('/', function(req, res){
		let url = path.join(__dirname, '../web/home.html');
		res.sendFile(url);
	});
	app.get('/about', (req, res) => {
		let url = path.join(__dirname, '../web/about.html');
		res.sendFile(url);
	})
	// app.get('/scopes', (req, res) => {
	// 	let url = path.join(__dirname, '../web/scopes.html');
	// 	res.sendFile(url);
	// })
	app.get('/test/err', (req, res) => {
		res.json(comErr.notImplemented('/test/err'))
	})

	// NOTE: /500 kept in root server.js in case this file breaks
	//A Route for Creating a 500 Error (Useful to keep around)
	// app.get('/500', function(req, res){
	// 	throw new Error('This is a 500 Error');
	// });

}

module.exports.listen = routes;
