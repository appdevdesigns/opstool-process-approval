var assert = require('chai').assert;

describe('PARequest', function() {


    it('should be there', function() {

        assert.isDefined(PARequest, ' --> PARequest should be defined!');

    });


    it('should load the fixtures', function(done){

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

});