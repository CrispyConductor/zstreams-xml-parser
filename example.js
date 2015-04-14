var XMLParser = require('./index');
var zstreams = require('zstreams');

zstreams.fromFile('./example.xml').pipe(new XMLParser()).each(function(obj) {
	console.log(obj);
}).intoCallback(function(err) {
	console.log('Error', err);
});
