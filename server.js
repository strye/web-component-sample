const port = 8080,
	express = require("express"),
	app = express(),
	http = require('http').Server(app);

app.use(express.static('web'))

//app.use('/js', express.static('src/js'))
//app.use('/style', express.static('src/style'))
//app.use('/wc', express.static('src/web-components'))
//app.use('/assets', express.static('src/assets'))

app.get('/', function(req, res){
	res.sendFile(__dirname + '/web/index.html');
});


//A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});


http.listen(port, function(){
    console.log('listening on *:'+port);
});

