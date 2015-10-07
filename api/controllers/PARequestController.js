/**
 * PARequestController
 *
 * @description :: Server-side logic for managing Parequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');
var path = require('path');
var fixtureData = null;


module.exports = {

    _config: {
        model: "parequest", // all lowercase model name
        actions: false,
        shortcuts: true,
        rest: true
    },


    find: function(req, res) {


    	if (fixtureData == null){
    		var data = fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'fixtures', 'PARequest.json'));
    		fixtureData = JSON.parse(data);

    		fixtureData.splice(fixtureData.length-1, 1);  // <-- this one isn't supposed to be returned.

    	}
    	res.send(fixtureData);

    },

    create:function(req, res) {
        // this is not allowed:
        res.forbidden();
    },

    destroy:function(req, res) {
        // this is not allowed
        res.forbidden();
    }

};

