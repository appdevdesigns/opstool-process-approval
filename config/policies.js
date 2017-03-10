/**
 * Policy mappings (ACL)
 *
 * Policies are simply Express middleware functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect just one of its actions.
 *
 * Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder,
 * at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`)
 *
 * For more information on policies, check out:
 * http://sailsjs.org/#documentation
 */


var limitScope = function(req, res, next){

    // Permissions.limitRouteToUserActionScope(req, res, next, {
    //     field:'userID',
    //     // userField:'guid',
    //     error:{
    //         code:404,
    //         message:'Not Found'
    //     }
    // });


    Permissions.route.limitToActionScope(req, res, next, {

        // the Action Key tied to this route:
        actionKey:'process.approval.tool.view',

        // the scope object used to figure out the users limit
        object:{
            key:'siteuser',  // sails.models[key]

            field:'guid'  // if resource != object, then what is the fk in object
        },

        // the object returned by this route. 
        // if not specified, we assume same as object above
        resource:{
            
            field: 'userID', // the .field in resource that points to the fk in object


            //
            // eg: 
            // if resource.userID -> object.id then:
            // object.field: 'id',
            // resource.field = 'userID'
        },

        // an error response if requested resource doesn't match 
        // the user's scope.
        error:{
            code:404,
            message:'Not Found'
        }
    });

}


var scopedStack = ADCore.policy.serviceStack([ limitScope ]);

module.exports = {

    'opstool-process-approval/PARequestController': {
        create: false,
        add: false,
        populate: false,
        remove: false,
        destroy: false,
        find: scopedStack,
        findOne: scopedStack,
        update: scopedStack
    }

};
