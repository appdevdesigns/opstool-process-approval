var assert = require('chai').assert;

describe('PAComment', function() {


    it('should be there', function() {

        assert.isDefined(PAComment, ' --> PAComment should be defined!');

    });


    it('should load the PAComment fixtures', function(done){

        PAComment.find()
        .exec(function(err, list){
            assert.isAbove(list.length, 0, ' --> should be more than 0 entries.');
            done();
        });

    });

});