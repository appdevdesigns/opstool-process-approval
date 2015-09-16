steal(
        'appdev'
).then( function(){

    // Namespacing conventions:
    // AD.Model.Base.extend("[application].[Model]" , { static }, {instance} );  --> Object
    AD.Model.Base.extend("opstools.ProcessApproval.PARequest", {
        findAll: 'GET /opstool-process-approval/parequest',
        findOne: 'GET /opstool-process-approval/parequest/{id}',
        create:  'POST /opstool-process-approval/parequest',
        update:  'PUT /opstool-process-approval/parequest/{id}',
        destroy: 'DELETE /opstool-process-approval/parequest/{id}',
        describe: function() {
            return {
          "actionKey": "string",
          "userID": "string",
          "callback": "string",
          "status": "string",
          "objectData": "json"
};
        },
        // associations:['actions', 'permissions'],
        // multilingualFields:['role_label', 'role_description'],
        // validations: {
        //     "role_label" : [ 'notEmpty' ],
        //     "role_description" : [ 'notEmpty' ]
        // },
        fieldId:'id',
        fieldLabel:'actionKey'
    },{
        // model: function() {
        //     return AD.Model.get('opstools.ProcessApproval.PARequest'); //AD.models.opstools.ProcessApproval.PARequest;
        // },
        // getID: function() {
        //     return this.attr(this.model().fieldId) || 'unknown id field';
        // },
        // getLabel: function() {
        //     return this.attr(this.model().fieldLabel) || 'unknown label field';
        // }
    });


});