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

    status : { type: 'string' },

    objectData : { type: 'json' },

    comments: {
    	collection:'pacomment',  // <-- all lowercase!
    	via:'request'
    }
  }
};

