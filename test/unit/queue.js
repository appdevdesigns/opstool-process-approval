var assert = require('chai').assert;

var testTransaction = {
    menu:{},
    form:{},
    related:{},
    callback:{
        message:'test.tool.callback',
        reference:{ uuid: 'test.entry.1' }
    },
    permission:{
        actionKey:'test.action',
        userID: 'user.1'
    }
}

var AD = require('ad-utils');
var request = null; 

describe('Message Queue', function() {

    before(function(done) {
 
        request = AD.test.request(function(err){
            done(err);
        });

    });

    it('should add a new entry after a new message : ', function(done) {

        // Step 1) get the current number of PARequest entries
        PARequest.find()
        .exec(function(err, originalList){

            if (err) { done(err); return; }


            // Step 2) Make a new Request on the Queue
            ADCore.queue.publish('opsportal.approval.create', testTransaction);

            var checkIt = function() {

                PARequest.find()
                .exec(function(err, newList){

                    if (err) { done(err); return; }

                    assert(newList.length > 0, ' ---> we got a value back ');
                    assert.notEqual(originalList.length, newList.length, ' ---> the lengths are different');
                    assert(newList.length > originalList.length, ' ---> new list is longer ');

                    var found = _.where(newList, { callback:testTransaction.callback.message});

                    assert(found.length > 0, ' --> found our test transaction');
                    done();
                })

            }


            // this will take some time after the message, so delay a bit before checking:
            setTimeout(checkIt, 200);  // is 200 ms ok?

        })

    });



    it('should not accept invalid data sent to the Queue : ', function(done){

        // create some invalid transactions
        var invalidTransactions = [];
        invalidTransactions.push(_.omit(_.clone(testTransaction, true), 'permission'));
        invalidTransactions.push(_.omit(_.clone(testTransaction, true), 'callback'));

        var t = _.clone(testTransaction, true);
        delete t.permission.actionKey;
        invalidTransactions.push(t);

        t = _.clone(testTransaction, true);
        delete t.permission.userID;
        invalidTransactions.push(t);

        t = _.clone(testTransaction, true);
        delete t.callback.message;
        invalidTransactions.push(t);


        // Step 1: find out how many PARequests there are now
        PARequest.find()
        .exec(function(err, originalList){

            if (err) { done(err); return; }


            // Step 2) Make all these requests on the Queue
            invalidTransactions.forEach(function(transaction) {
                ADCore.queue.publish('opsportal.approval.create', transaction);
            })
            

            var checkIt = function() {

                PARequest.find()
                .exec(function(err, newList){

                    if (err) { done(err); return; }

                    assert.equal(originalList.length, newList.length, ' ---> the lengths are same');
                    done();
                })

            }


            // this will take some time after our messages, so delay a bit before checking:
            setTimeout(checkIt, 200);  // is 200 ms ok?

        })
    });


    it('should call the return queue on an approval : ', function(done) {

        var approveTransaction = _.clone(testTransaction, true);
        approveTransaction.callback.message += '.approve';
        approveTransaction.callback.reference.uuid = 'test.approved';

        var didCall = false;

        // subscribe to our callback queue
        ADCore.queue.subscribe(approveTransaction.callback.message, function(message, data){

            didCall = true;
            assert(data.reference.uuid == approveTransaction.callback.reference.uuid, ' --> the returned uuid is correct! ');
            assert(_.isPlainObject(data.data), ' --> updatedValues should be an object ');
        });


        // Step 1) create the entry in the Queue:
        ADCore.queue.publish('opsportal.approval.create', approveTransaction);

        var waitForIt = function() {

            // Step 2) create an update request for this entry:
            PARequest.find({ callback:approveTransaction.callback.message })
            .exec(function(err, paEntry){

                assert(paEntry.length > 0, ' --> should have created our approveTransaction');

                if (err) { done(err); return; }

                request
                    .put('/opstool-process-approval/parequest/'+paEntry[0].id)
                    .field('status', 'approved')
                    .field('updatedValues', JSON.stringify({ hello:'world' }))
                    .end(function(err, res) {

                        assert(didCall, ' --> should have called our Queue');
                        done(err);
                    });

            })

        }

        setTimeout(waitForIt, 200);

    });


    it('should only allow status, comments and updatedValues fields to be modified : ', function(done) {

        // another test approval
        var approveTransaction = _.clone(testTransaction, true);
        approveTransaction.callback.message += '.noupdateinvalidfields';

        // Step 1) create the entry in the Queue:
        ADCore.queue.publish('opsportal.approval.create', approveTransaction);

        var waitForIt = function() {

            // Step 2) find this entry so we can try to modify it
            PARequest.find({ callback:approveTransaction.callback.message })
            .exec(function(err, paEntry){

                assert(paEntry.length > 0, ' --> should have created our approveTransaction');

                if (err) { done(err); return; }


                // Step 3) try to modify it:
                request
                    .put('/opstool-process-approval/parequest/'+paEntry[0].id)
                    .field('actionKey', 'no.change')
                    .field('userID', 'no.change')
                    .field('callback', 'no.change')
                    .field('objectData', JSON.stringify({ no:'change'}))
                    .end(function(err, res) {


                        // Step 4) now lookup the Entry again and check for any changes in our values:
                        PARequest.findOne(paEntry[0].id)
                        .exec(function(err, paFinal){
                            var a = paEntry[0];
                            var b = paFinal;

                            ['actionKey', 'userID', 'callback' ].forEach(function(key){
                                assert.equal(a[key], b[key], ' --> '+key+' should remain unchanged ');
                            })

                            assert(_.isEqual(a.objectData, b.objectData), ' --> objectData should remain unchanged ');
                            done(err);

                        })
                    });
            })

        }

        setTimeout(waitForIt, 200);

    });


    it('should prevent invalid status values : ', function(done) {

        // another test approval
        var approveTransaction = _.clone(testTransaction, true);
        approveTransaction.callback.message += '.invalidStatusValues';

        // Step 1) create the entry in the Queue:
        ADCore.queue.publish('opsportal.approval.create', approveTransaction);

        var waitForIt = function() {

            // Step 2) find this entry so we can try to modify it
            PARequest.find({ callback:approveTransaction.callback.message })
            .exec(function(err, paEntry){

                assert(paEntry.length > 0, ' --> should have created our approveTransaction');

                if (err) { done(err); return; }


                // Step 3) try to modify it with invalid status value:
                request
                    .put('/opstool-process-approval/parequest/'+paEntry[0].id)
                    .field('status', 'not.valid.value')
                    .expect(400)
                    .end(function(err, res) {

                        done(err);
                    });
            })

        }

        setTimeout(waitForIt, 200);

    });

});