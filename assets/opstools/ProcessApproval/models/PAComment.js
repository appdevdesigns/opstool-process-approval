steal(
        'appdev',
        'opstools/ProcessApproval/models/base/PAComment.js'
).then( function(){

    // Namespacing conventions:
    // AD.Model.extend('[application].[Model]', {static}, {instance} );  --> Object
    AD.Model.extend('opstools.ProcessApproval.PAComment', {
/*
        findAll: 'GET /opstool-process-approval/pacomment',
        findOne: 'GET /opstool-process-approval/pacomment/{id}',
        create:  'POST /opstool-process-approval/pacomment',
        update:  'PUT /opstool-process-approval/pacomment/{id}',
        destroy: 'DELETE /opstool-process-approval/pacomment/{id}',
        describe: function() {},   // returns an object describing the Model definition
        fieldId: 'id',             // which field is the ID
        fieldLabel:'comment'      // which field is considered the Label
*/
    },{
/*
        // Already Defined:
        model: function() {},   // returns the Model Class for an instance
        getID: function() {},   // returns the unique ID of this row
        getLabel: function() {} // returns the defined label value
*/
    });


});