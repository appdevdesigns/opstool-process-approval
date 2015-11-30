/**
 * PARequestController
 *
 * @description :: Server-side logic for managing Parequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

// var fs = require('fs');
// var path = require('path');
// var fixtureData = null;


module.exports = {

    _config: {
        model: "parequest", // all lowercase model name
        actions: true,
        shortcuts: false,
        rest: true
    },
    

    lock: function(req, res) {
    	var id = req.param('id');
    	console.log('... lock:', id);
    	if (id) {
    		PARequest.message(id, {locked:true}, req);
    		res.AD.success({locked:id});
    	} else {
    		res.AD.error(new Error('must provide an id'));
    	}
    },


    unlock: function(req, res) {
    	var id = req.param('id');
    	console.log('... unlock:', id);
    	if (id) {
    		PARequest.message(id, {locked:false}, req);
    		res.AD.success({unlocked:id});
    	} else {
    		res.AD.error(new Error('must provide an id'));
    	}
    }

};

