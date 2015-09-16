// Dependencies
steal(
    "opstools/ProcessApproval/models/PAComment.js"
)

// Initialization
.then(function(){


    //Define the unit tests
    describe('testing model AD.models.opstools.ProcessApproval.PAComment ', function(){


        before(function(){


        });


        it('model definition exists ', function(){
            assert.isDefined(AD.models.opstools , ' :=> should have been defined ');
            assert.isDefined(AD.models.opstools.ProcessApproval , ' :=> should have been defined ');
            assert.isDefined(AD.models.opstools.ProcessApproval.PAComment, ' :=> should have been defined ');
               assert.isNotNull(AD.Model.get("opstools.ProcessApproval.PAComment"), ' :=> did not return null');
        });

    });


});