
steal(
        // List your Controller's dependencies here:
        'appdev',
//        'opstools/ProcessApproval/models/Projects.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
        // '//opstools/ProcessApproval/views/ApprovalWorkspace/ApprovalWorkspace.ejs',
function(){

    // Namespacing conventions:
    // AD.Control.extend('[application].[controller]', [{ static },] {instance} );
    AD.Control.extend('opstools.ProcessApproval.ApprovalWorkspace', {  


        init: function (element, options) {
            var self = this;
            options = AD.defaults({
                    // templateDOM: '//opstools/ProcessApproval/views/ApprovalWorkspace/ApprovalWorkspace.ejs'
            }, options);
            this.options = options;

            // Call parent init
            this._super(element, options);


            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.initDOM();


        },



        initDOM: function () {

            // this.element.html(can.view(this.options.templateDOM, {} ));
            this.dom = {};
            this.dom.instructions = this.element.find('.pa-instructionsPanel');

            this.element.find('.mockup').remove();

            this.dom.approvalForm = this.element.find('.pa-approvalForm');


            this.showDOM('instructions');
        },


        showDOM: function( panel ) {

            for(var p in this.dom) {
                if (p == panel) {
                    this.dom[p].show();
                } else {
                    this.dom[p].hide();
                }
            }
        },


        setTransaction: function ( transaction ) {

            console.warn('*** ApprovalTransaction: received a transaction:', transaction);
            this.showDOM('approvalForm');
        },



        '.ad-item-add click': function ($el, ev) {

            ev.preventDefault();
        }


    });


});