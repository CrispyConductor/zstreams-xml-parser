var Transform = require('zstreams').Transform;
var inherits = require('util').inherits;
var sax = require('sax');

function XMLParser(strict, opt) {
	Transform.call(this, {
		readableObjectMode: true,
		writableObjectMode: false
	});
	var xmlParser = this.xmlParser = sax.parser(strict, opt);
	var self = this;
	['text', 'doctype', 'processinginstruction', 'sgmldeclaration', 'opentag',
	'closetag', 'attribute', 'comment', 'opencdata', 'cdata', 'closecdata', 'opennamespace',
	'closenamespace', 'script', 'noscript'].forEach(function(name) {
		xmlParser['on' + name] = function() {
			self.push({
				type: name,
				args: Array.prototype.slice.call(arguments, 0)
			});
		};
	});
	xmlParser.onend = function() {
		self.push(null);
	};
	xmlParser.onerror = function(err) {
		if (!this._xmlErrorFlag) {
			this._xmlErrorFlag = err;
		}
	};
}
inherits(XMLParser, Transform);

XMLParser.prototype._transform = function(data, encoding, cb) {
	if (data instanceof Buffer) data = data.toString('utf8');
	this.xmlParser.write(data);
	var err = this._xmlErrorFlag;
	this._xmlErrorFlag = null;
	cb(err);
};

XMLParser.prototype._flush = function(cb) {
	this.xmlParser.close();
	var err = this._xmlErrorFlag;
	this._xmlErrorFlag = null;
	cb(err);
};

module.exports = XMLParser;
