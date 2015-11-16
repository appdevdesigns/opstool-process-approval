
steal(
        // List your Controller's dependencies here:
        'appdev',
//        'opstools/ProcessApproval/models/Projects.js',
//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
        // '//opstools/ProcessApproval/views/PendingTransactions/PendingTransactions.ejs',
function(){

    // Namespacing conventions:
    // AD.Control.extend('[application].[controller]', [{ static },] {instance} );
    AD.Control.extend('opstools.ProcessApproval.PendingTransactions', {  


        init: function (element, options) {
            var self = this;
            options = AD.defaults({
                    // templateDOM: '//opstools/ProcessApproval/views/PendingTransactions/PendingTransactions.ejs'
            }, options);
            this.options = options;

            // Call parent init
            this._super(element, options);


            this.dataSource = this.options.dataSource; // AD.models.Projects;

            this.initDOM();


        },



        initDOM: function () {

            // this.element.html(can.view(this.options.templateDOM, {} ));

        },



        '.ad-item-add click': function ($el, ev) {

            ev.preventDefault();
        }


    });


});