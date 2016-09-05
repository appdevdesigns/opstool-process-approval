/**
 * Bootstrap
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */
var fs = require('fs');
var path = require('path');
var AD = require('ad-utils');
var async = require('async');
module.exports = function (cb) {

    // handle our common bootstrap setup instructions:
        // - verify permissions are created
        // - verify opsportal tool definitions are defined.
    AD.module.bootstrap(__dirname, cb);



	ADCore.queue.subscribe('opsportal.approval.create', function(message, data){

		var requiredProperties = ['permission.actionKey', 'permission.userID', 'callback.message'];
		var allPropertiesFound = true;
		requiredProperties.forEach(function(prop){

			/// NOTE: once Sails uses lodash v3.10.1, we can simply do this:
			/// allPropertiesFound = allPropertiesFound && _.has(data, prop);

			/// currently Sails uses v2.4.2 so we do this for now:
			var props = prop.split('.');
			var currData = data;

			while(props.length>0) {
				var currentProp = props.shift();
				allPropertiesFound = allPropertiesFound  && _.has(currData, currentProp);
				if (currData) currData = currData[currentProp];
			}

		});

		if (!allPropertiesFound) {

			// data provided not in valid format

		} else {

			// reformat the incoming data into a PARequest format:
			var paData = {};
			paData.objectData = data;
			paData.actionKey = data.permission.actionKey;
			paData.userID = data.permission.userID;
			paData.callback = data.callback.message;
			paData.status = 'pending';

			PARequest.create(paData)
			.then(function(newEntry){

				// tell all connected sockets that their info is "stale"
				sails.sockets.broadcast('sails_model_create_parequest', 'parequest', { verb:'stale'});
				return null;
			})
			.catch(function(err){
				ADCore.error.log('unable to create this PARequest entry', {
					error:err,
					data:paData,
					module:'opstool-process-approval'
				});
				return null;
			});
		}

	});


	// DEVELOP MODE: keep some new Approval Requests coming in:
	// only do this in develop mode:
	// and only do this if sails.config.ProcessApproval.autoGenerate setting is set.
	if ((sails.config.environment == 'development')
		 && ((sails.config['opstool-process-approval']) && (sails.config['opstool-process-approval'].autoGenerate))) {

		// read in our sample fixture data
		var fixtureData = null;
		var fixtureIndex = 0;
    	if (fixtureData == null){
    		var data = fs.readFileSync(path.join(__dirname, '..', 'test', 'fixtures', 'PARequest.json'));
    		fixtureData = JSON.parse(data);

    		fixtureData.splice(fixtureData.length-1, 1);  // <-- this one isn't supposed to be returned.

    	}


    	// the fixtures represent the values in the DB, so 
    	// reverse configure them to match a proper Request call:
    	fixtureData.forEach(function(fixture){
    		fixture.permission = {
    			actionKey: fixture.actionKey,
    			userID: fixture.userID
    		};

    		fixture.callback = {
    			message: fixture.callback
    		}

    		// all the attributes stored in objectData should actually be
    		// top level attributes:
    		for (var o in fixture.objectData) {
    			fixture[o] = fixture.objectData[o];
    		}

    		// .objectData is created by our MessageQueue handler.
    		delete fixture.objectData;
    	})


    	// create a routine to check if we have less than our default fixture 
		var checkRequests = function() {
// console.log('...  Check Process Approval Requests')
			PARequest.find({ status:'pending'})
			.then(function(list){
				
				if (list.length < fixtureData.length) {
// console.log('     ... publish new request!');
					// publish a new request:
					ADCore.queue.publish('opsportal.approval.create', fixtureData[fixtureIndex]);
					fixtureIndex++;
					if (fixtureIndex >= fixtureData.length) {
						fixtureIndex = 0;
					}

				}
				return null;
			});
		}

		// check every 5 seconds
		setInterval(checkRequests, 5000);

	}




};