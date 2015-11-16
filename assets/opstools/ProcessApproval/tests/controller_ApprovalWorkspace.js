// Dependencies
steal(
    "opstools/ProcessApproval/controllers/ApprovalWorkspace.js"
)

// Initialization
.then(function(){

    // the div to attach the controller to
    var divID = 'test_ApprovalWorkspace';

    // add the div to the window
    var buildHTML = function() {
        var html = [
                    '<div id="'+divID+'">',
                    '</div>'
                    ].join('\n');

        $('body').append($(html));
    }
    

    //Define the unit tests
    describe('testing controller AD.controllers.opstools.ProcessApproval.ApprovalWorkspace ', function(){

        var testController = null;

        before(function(){

            buildHTML();

            // Initialize the controller
            testController = new AD.controllers.opstools.ProcessApproval.ApprovalWorkspace($('#'+divID), { some:'data' });

        });



        it('controller definition exists ', function(){
            assert.isDefined(AD.controllers.opstools , ' :=> should have been defined ');
            assert.isDefined(AD.controllers.opstools.ProcessApproval , ' :=> should have been defined ');
            assert.isDefined(AD.controllers.opstools.ProcessApproval.ApprovalWorkspace, ' :=> should have been defined ');
              assert.isNotNull(AD.Control.get('opstools.ProcessApproval.ApprovalWorkspace'), ' :=> returns our controller. ');
        });


    });


});