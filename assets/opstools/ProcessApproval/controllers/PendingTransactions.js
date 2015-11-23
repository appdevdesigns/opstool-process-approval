
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

            // now get access to the PARequest Model:
            this.PARequest = AD.Model.get('opstools.ProcessApproval.PARequest');

            // listen for updates to any of our PARequest models:
            this.PARequest.bind('updated', function( ev, request ) {

                // only do something if this is no longer 'pending'
                if (request.status != 'pending') {

                    // verify this request is in our displayed list
                    var atIndex = _this.data.listTransactions.indexOf(request);
                    if (atIndex > -1) {

                        // if so, remove the entry.
                        _this.data.listTransactions.splice(atIndex, 1);


                        // decide which remaining element we want to click:
                        var clickIndx = atIndex;  // choose next one if there.
                        if (_this.data.listTransactions.attr('length') <= clickIndx ) {

                            // not enough entries, so choose the last one then:
                            clickIndx = _this.data.listTransactions.attr('length')-1;

                        }

                        // if there is one to select
                        if (clickIndx >= 0) {

                            // get that LI item:
                            var allLIs = _this.element.find('li');
                            var indexLI = allLIs[clickIndx];

                            // now select this LI:
                            _this.selectLI($(indexLI));

                        } 

                    }
                }
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


        selectLI: function($el) {

            this.element.find('.active').removeClass('active');
            $el.addClass('active');

            var model = $el.data('item');
            this.element.trigger(this.options.eventItemSelected, model);
        },


        setList: function(list){ 
            this.data.listTransactions = list;
            this.dom.list.html(can.view('PendingTransactions_List', {items:list}));
        },



        'li click': function ($el, ev) {

            this.selectLI($el);

            ev.preventDefault();
        }


    });


});