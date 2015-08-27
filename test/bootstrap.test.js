var path = require('path');
var AD = require('ad-utils');


var Sails = require('sails'),
    sails,
    cwd;

//
// Global Before() and After() routines to setup sails for all our tests:
//


before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(40000);

  // sails should lift from above:
  cwd = process.cwd();

  process.chdir(path.join('..','..'));


  AD.test.sails.load()
  .fail(function(err){
      done(err);
  })
  .then(function(server) {

    sails = server;

    //
    // here you can load fixtures, etc.
    //


    done();
  });
});

after(function(done) {

  //
  // here you can clear fixtures, etc.
  // 

  sails.lower(function() {
     process.chdir(cwd);
     done();
  });
});
