# zstreams-xml-parser

XML parser based on zstreams that inputs a data stream of XML and outputs an event stream of
events based on the `sax` XML parser.

```js
var XMLParser = require('zstreams-xml-parser');
var zstreams = require('zstreams');

zstreams.fromFile('./example.xml').pipe(new XMLParser()).each(function(event) {
	console.log(evemt);
}).intoCallback(function(err) {
	// ...
});
```

