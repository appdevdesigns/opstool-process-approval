
steal(
        // List your Controller's dependencies here:
        'appdev',
        '//OpsPortal/classes/OpsTool.js',
        '/opstools/ProcessApproval/controllers/PendingTransactions.js',
        '/opstools/ProcessApproval/controllers/ApprovalWorkspace.js',
        '/opstools/ProcessApproval/views/ProcessApproval/ProcessApproval.ejs',
function(){

    // Namespacing conventions:
    // AD.Control.OpsTool.extend('[ToolName]', [{ static },] {instance} );
    AD.Control.OpsTool.extend('ProcessApproval', {

        CONST: {
            ITEM_SELECTED   : 'Transaction.Selected'
        }, 



        init: function (element, options) {
            var self = this;
            options = AD.defaults({
                    templateDOM: '//opstools/ProcessApproval/views/ProcessApproval/ProcessApproval.ejs',
                    resize_notification: 'ProcessApproval.resize',
                    tool:null   // the parent opsPortal Tool() object
            }, options);
            this.options = options;

            // Call parent init
            this._super(element, options);

            this.initDOM();
            this.initControllers();
            this.initEvents();
        },



        initControllers: function() {

            this.controllers = {};  // hold my controller references here.

            var PendingTransactions = AD.Control.get('opstools.ProcessApproval.PendingTransactions');
            this.controllers.PendingTransactions = new PendingTransactions(this.element.find('.pa-pendingtransactions'), { eventItemSelected: this.CONST.ITEM_SELECTED });
        
            var ApprovalWorkspace = AD.Control.get('opstools.ProcessApproval.ApprovalWorkspace');
            this.controllers.ApprovalWorkspace = new ApprovalWorkspace(this.element.find('.pa-approvalworkspace'), {});
        },



        initDOM: function () {

            this.element.html(can.view(this.options.templateDOM, {} ));

        },



        initEvents: function () {

            var _this = this;

            // event: ItemSelected 
            // when an item is selected in our PendingTransactions list, pass 
            // that item on to the ApprovalWorkspace Controller
            // @param: {obj} transaction  The transaction that was selected
            this.controllers.PendingTransactions.element.on(this.CONST.ITEM_SELECTED, function(event, transaction) {

                console.log(' ... Transaction Selected : ', transaction);

                // pass the transaction off to the ApprovalWorkspace
                _this.controllers.ApprovalWorkspace.setTransaction(transaction);
            });
        },


        resize: function(data) {

            this._super(data);

            this.controllers.PendingTransactions.resize(data.height);
            
        }



        // '.ad-item-add click': function ($el, ev) {

        //     ev.preventDefault();
        // }


    });


});