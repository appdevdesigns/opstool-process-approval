
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


            this.transaction = null;

            this.initDOM();


        },



        embeddTemplate: function(sel, templateInfo) {


            // compile template data
            var data = templateInfo.viewData || {};
            if (templateInfo.data) {
                data.data = templateInfo.data;
            }

            var $el = this.element.find(sel);
            $el.html( can.view(templateInfo.view, data) );

        },



        initDOM: function () {

            // this.element.html(can.view(this.options.templateDOM, {} ));
            this.dom = {};
            this.dom.instructions = this.element.find('.pa-instructionsPanel');

            this.element.find('.mockup').remove();

            this.dom.approvalForm = this.element.find('.pa-approvalForm');

            // clear the templates:
            this.element.find('.pa-approvalForm-objTemplate').html(' ');
            this.element.find('.pa-approvalForm-relatedTemplate').html(' ');

            // convert to template
            var template = this.domToTemplate(this.dom.approvalForm);
            can.view.ejs('PA_ApprovalForm', template);

            // clear the form
            this.dom.approvalForm.html();


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
            this.transaction = transaction;

            this.dom.approvalForm.html( can.view('PA_ApprovalForm', {transaction: this.transaction}));

            this.embeddTemplate('.pa-approvalForm-objTemplate', this.transaction.objectData.form);
            this.embeddTemplate('.pa-approvalForm-relatedTemplate', this.transaction.objectData.relatedInfo);

            this.showDOM('approvalForm');
        },



        '.ad-item-add click': function ($el, ev) {

            ev.preventDefault();
        }


    });


});