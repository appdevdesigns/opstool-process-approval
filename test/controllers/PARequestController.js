var assert = require('chai').assert;

var AD = require('ad-utils');
var request = null; 


describe('PARequestController', function() {

    before(function(done) {
 
        request = AD.test.request(function(err){
            done(err);
        });

        // request = superTest.agent(sails.hooks.http.app);

        // request
        //     .post('/site/login')
        //     .send({username:'test', password:'test'})
        //     .end(function(err, res){
        //         done(err);
        //     })
    });


    it('should return data on a request: ', function(done) {

        request
            .get('/opstool-process-approval/parequest')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)     // should return json
            .expect(200)                        // should return a successful response.
            .end(function(err, res){

                assert.isNull(err, ' --> there should be no error.');
                assert.isArray(res.body, ' --> should have gotten an array back. ');
                assert.lengthOf(res.body, 3, ' --> should only get 3 of our test entries back.');
                done(err);
            });

    });

});