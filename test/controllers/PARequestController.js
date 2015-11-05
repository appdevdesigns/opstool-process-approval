var assert = require('chai').assert;

var AD = require('ad-utils');
var request = null; 

var superTest = require('supertest');
var requestNoPerm = null;


describe('PARequestController', function() {

    before(function(done) {
 
        request = AD.test.request(function(err){

            requestNoPerm = superTest.agent(sails.hooks.http.app);

            requestNoPerm
                .post('/site/login')
                .send({username:'testNoPerm', password:'test'})
                .end(function(err, res){
                    done(err);
                });

        });

    });


    it('should not be able to access our REST create route: ', function(done) {

        request
            .post('/opstool-process-approval/parequest')
            .set('Accept', 'application/json')
            .expect(403)                        // should return a forbidden
            .end(function(err, res){

                assert.isNull(err, ' --> there should be no error.');
                done(err);
            });

    });


    it('should not be able to access our REST delete route: ', function(done) {

        request
            .delete('/opstool-process-approval/parequest')
            .set('Accept', 'application/json')
            .expect(403)                        // should return a forbidden 
            .end(function(err, res){

                assert.isNull(err, ' --> there should be no error.');
                done(err);
            });

    });


    it('should not be able to access our shortcut route for find: ', function(done) {

        request
            .get('/opstool-process-approval/parequest/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)     // should return json
            .expect(404)                        // should return a not found 
            .end(function(err, res){
                assert.isNull(err, ' --> there should be no error.');
                done(err);
            });

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


    it('should reject unauthorized users: ', function(done) {

        requestNoPerm
            .get('/opstool-process-approval/parequest')
            .set('Accept', 'application/json')
            .expect(403)                        // should return a forbidden
            .end(function(err, res){

                assert.isNull(err, ' --> there should be no error.');
                done(err);
            });

    });

});