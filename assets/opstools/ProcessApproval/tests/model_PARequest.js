// Dependencies
steal(
    "opstools/ProcessApproval/models/PARequest.js"
)

// Initialization
.then(function(){


    //Define the unit tests
    describe('testing model AD.models.opstools.ProcessApproval.PARequest ', function(){


        before(function(){


        });


        it('model definition exists ', function(){
            assert.isDefined(AD.models.opstools , ' :=> should have been defined ');
            assert.isDefined(AD.models.opstools.ProcessApproval , ' :=> should have been defined ');
            assert.isDefined(AD.models.opstools.ProcessApproval.PARequest, ' :=> should have been defined ');
               assert.isNotNull(AD.Model.get("opstools.ProcessApproval.PARequest"), ' :=> did not return null');
        });

    });


});