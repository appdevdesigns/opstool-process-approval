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

    Permissions.limitRouteToUserActionScope(req, res, next, {
        field:'userID',
        // userField:'guid',
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
