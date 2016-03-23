System.import('appdev').then(function () {
	steal.import('appdev/model/model').then(function () {
	
		// Namespacing conventions:
		// AD.Model.Base.extend("[application].[Model]" , { static }, {instance} );  --> Object
		AD.Model.Base.extend("opstools.ProcessApproval.PAComment", {
			findAll: 'GET /opstool-process-approval/pacomment',
			findOne: 'GET /opstool-process-approval/pacomment/{id}',
			create: 'POST /opstool-process-approval/pacomment',
			update: 'PUT /opstool-process-approval/pacomment/{id}',
			destroy: 'DELETE /opstool-process-approval/pacomment/{id}',
			describe: function () {
				return {
					"comment": "text",
					"response": "text"
				};
			},
			// associations:['actions', 'permissions'],
			// multilingualFields:['role_label', 'role_description'],
			// validations: {
			//     "role_label" : [ 'notEmpty' ],
			//     "role_description" : [ 'notEmpty' ]
			// },
			fieldId: 'id',
			fieldLabel: 'comment'
		}, {
				// model: function() {
				//     return AD.Model.get('opstools.ProcessApproval.PAComment'); //AD.models.opstools.ProcessApproval.PAComment;
				// },
				// getID: function() {
				//     return this.attr(this.model().fieldId) || 'unknown id field';
				// },
				// getLabel: function() {
				//     return this.attr(this.model().fieldLabel) || 'unknown label field';
				// }
			});

	});
});