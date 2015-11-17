
steal(
        // List your Controller's dependencies here:
        'appdev',
        'OpsPortal/classes/OpsWidget.js',
        'opstools/ProcessApproval/models/PARequest.js',
function(){

    // Namespacing conventions:
    // AD.Control.extend('[application].[controller]', [{ static },] {instance} );
    AD.Control.extend('opstools.ProcessApproval.PendingTransactions', {  


        init: function (element, options) {
            var _this = this;
            options = AD.defaults({
                    eventItemSelected : 'hey.got.one'
                    // templateDOM: '//opstools/ProcessApproval/views/PendingTransactions/PendingTransactions.ejs'
            }, options);
            this.options = options;

            // Call parent init
            this._super(element, options);


            this.initDOM();

            this.data = {};
            this.data.listTransactions = null;

            // now load our data from the server:
            this.PARequest = AD.Model.get('opstools.ProcessApproval.PARequest');
            this.PARequest.findAll({ status:'pending'})
            .fail(function(err){
console.error('!!! Dang.  something went wrong:', err);
            })
            .then(function(list){
                _this.data.listTransactions = list;
                _this.dom.list.html(can.view('PendingTransactions_List', {items:list}));
console.log('... here is our list of pending transactions:', list);
            });


        },



        initDOM: function () {

            // this.element.html(can.view(this.options.templateDOM, {} ));

            // keep a reference to our list area:
            this.dom = {};
            this.dom.list = this.element.find('ul.op-list');

            var template = this.domToTemplate( this.dom.list );
            can.view.ejs('PendingTransactions_List', template);

            // and don't forget to clear the List area:
            this.dom.list.html('');


            this.dom.ListWidget = new AD.op.Widget(this.element);

        },


        resize: function(height) {
            this.dom.ListWidget.resize({height: height});
        },



        'li click': function ($el, ev) {

            this.element.find('.active').removeClass('active');
            $el.addClass('active');

            var model = $el.data('item');
            this.element.trigger(this.options.eventItemSelected, model);

            ev.preventDefault();
        }


    });


});