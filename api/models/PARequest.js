/**
* PARequest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // connection:"appdev_default",

  tableName:"pa_request",   

  attributes: {

    actionKey : { type: 'string' },

    userID : { type: 'string' },

    callback : { type: 'string' },

    status : { type: 'string',
      in:[
        'pending',      // waiting for an admin to approve the request
        'requesting',   // requesting more information (comments)
        'approved',     // Admin has approved the request
        'rejected'      // Admin has rejected the request
      ] 
    },

    objectData : { type: 'json' },

    updatedValues: { type: 'json' },
    
    uniqueKey: { 
        type: 'string',
        unique: true
    },

    comments: {
    	collection:'pacomment',  // <-- all lowercase!
    	via:'request'
    }
  },



  beforeUpdate: function(valuesToUpdate, cb) {
    
    // don't allow updates form these fields
    var notUpdate = ['objectData', 'actionKey', 'userID', 'callback', 'uniqueKey', 'fromUser'];

    // allow updates from users (fromUser) to the objectData
    if (valuesToUpdate.hasOwnProperty('fromUser')) {
        // we know it is the first one but just in case someone changes the array above in the future
        var pos = notUpdate.indexOf('objectData');
        if (pos > -1) {
            // remove objectData from the notUpdate array so it can be updated
            notUpdate.splice(pos, 1);
        }
    }

    notUpdate.forEach(function(key){
      if (valuesToUpdate[key]) delete valuesToUpdate[key];  
    });

    // make sure we're given a json object, not a string:
    if (valuesToUpdate.updatedValues && _.isString(valuesToUpdate.updatedValues)) {
      valuesToUpdate.updatedValues = JSON.parse(valuesToUpdate.updatedValues);
    }

    cb();
  },



  afterUpdate: function(updatedRecord, cb) {

    // if not one of the 'in process' statuses:
    if (['pending', 'requesting'].indexOf(updatedRecord.status) == -1) {

      // then this entry is finished being processed

      // Compile data to return to the calling application
      // {
      //   status:'approved',  // or 'requesting', or 'rejected'
      //   reference: { data that was given to us },
      //   data: { updated values from our form }
      // }


      // 1) return our status
      var returnData = {};
      returnData.status = updatedRecord.status;
// console.log('... processRequest.  updatedRecord:', updatedRecord);


      // 2) if a reference value was given then include it too
      // NOTE: once sails upgrades to lodash v3.x we can do this:
      // if (_.has(data, 'callback.reference')) {
      //   returnData.reference = data.callback.reference;
      // }
      // until then:
      var data = updatedRecord.objectData;
      if (typeof data == 'string') {
        data = JSON.parse(data);
      }
      if (data && data.callback && data.callback.reference) {
        returnData.reference = data.callback.reference;
      }


      // 3) add in any changed data submitted from the UI:
      returnData.data = updatedRecord.updatedValues;

      // 4) add display menu info :
      returnData.menu = {
        itemName: data.form.data[data.menu.instanceRef] || data.menu.instanceRef,
        createdBy: data.menu.createdBy,
        date: data.menu.date
      };


      // update the registered application :
      ADCore.queue.publish(updatedRecord.callback, returnData);
    }

    cb();
  }
};

