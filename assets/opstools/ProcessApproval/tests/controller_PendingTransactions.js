// Dependencies
steal(
    "opstools/ProcessApproval/controllers/PendingTransactions.js"
)

// Initialization
.then(function(){

    // the div to attach the controller to
    var divID = 'test_PendingTransactions';

    // add the div to the window
    var buildHTML = function() {
        var html = [
                    '<div id="'+divID+'">',
                    '</div>'
                    ].join('\n');

        $('body').append($(html));
    }
    

    //Define the unit tests
    describe('testing controller AD.controllers.opstools.ProcessApproval.PendingTransactions ', function(){

        var testController = null;

        before(function(){

            buildHTML();

            // Initialize the controller
            testController = new AD.controllers.opstools.ProcessApproval.PendingTransactions($('#'+divID), { some:'data' });

        });



        it('controller definition exists ', function(){
            assert.isDefined(AD.controllers.opstools , ' :=> should have been defined ');
            assert.isDefined(AD.controllers.opstools.ProcessApproval , ' :=> should have been defined ');
            assert.isDefined(AD.controllers.opstools.ProcessApproval.PendingTransactions, ' :=> should have been defined ');
              assert.isNotNull(AD.Control.get('opstools.ProcessApproval.PendingTransactions'), ' :=> returns our controller. ');
        });


    });


});