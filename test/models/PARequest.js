var assert = require('chai').assert;

describe('PARequest', function() {


    it('should be there', function() {

        assert.isDefined(PARequest, ' --> PARequest should be defined!');

    });


    it('should load the PARequest fixtures', function(done){

        PARequest.find()
        .exec(function(err, list){
            assert.isAbove(list.length, 0, ' --> should be more than 0 entries.');
            done();
        });
//         .catch(function(err){
// console.log(err);
//             assert.ok(false, ' --> should not have gotten an error! ');
//             done(err);
//         })
    })



//// Leave this here to dump the results of our fixtures
// it('just checking our Other fixtures', function(done){

//     PermissionRole.find()
//     .populate('actions')
//     .exec(function(err, list){

// console.log('PermissionRoles:', list);

//         Permission.find()
//         .populate('user')
//         .populate('role')
//         .exec(function(err, plist){

// console.log('... Permissions:', plist);

//             PermissionAction.find()
//             .populate('roles')
//             .exec(function(err, paList){

// console.log('... Actions:', paList);
//                 done();


//             });
//         })
//     });

// })

});