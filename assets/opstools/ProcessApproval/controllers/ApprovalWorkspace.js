
steal(
	// List your Controller's dependencies here:
	//        'opstools/ProcessApproval/models/Projects.js',
	//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
	// '//opstools/ProcessApproval/views/ApprovalWorkspace/ApprovalWorkspace.ejs',
	function () {
		System.import('appdev').then(function () {
			steal.import('appdev/ad',
							'appdev/control/control',
							'OpsPortal/classes/OpsButtonBusy').then(function () {

					// Namespacing conventions:
					// AD.Control.extend('[application].[controller]', [{ static },] {instance} );
					AD.Control.extend('opstools.ProcessApproval.ApprovalWorkspace', {


						init: function (element, options) {
							var _this = this;
							options = AD.defaults({
								// templateDOM: '//opstools/ProcessApproval/views/ApprovalWorkspace/ApprovalWorkspace.ejs'
							}, options);
							this.options = options;

							// Call parent init
							this._super(element, options);


							this.transaction = null;
							this.buttons = {};

							this.data = {};
							this.data.listTransactions = null;

							this.initDOM();

						},


						buttonsEnable: function () {

							for (var b in this.buttons) {
								this.buttons[b].enable();
							}
						},



						buttonsDisable: function () {

							for (var b in this.buttons) {
								this.buttons[b].disable();
							}
						},



						embeddTemplate: function (sel, templateInfo) {


							// compile template data
							var data = templateInfo.viewData || {};
							if (templateInfo.data) {
								data.data = templateInfo.data;
							}

							var $el = this.element.find(sel);

							try {

								$el.html(can.view(templateInfo.view, data));
								AD.lang.label.translate($el);


							} catch (e) {

								// This is most likely a template reference error.
								AD.error.log('Error displaying template:' + templateInfo.view, { error: e });

								var displayData = data.data || data;
								var errorDisplay = [
									'Error displaying provided object template (' + templateInfo.view + ')',
									'Here is the raw data:'
								];

								for (var d in displayData.attr()) {
									errorDisplay.push(d + ' : ' + displayData[d]);
								}

								$el.html(errorDisplay.join('<br>'));
							}

						},



						initDOM: function () {

							// this.element.html(can.view(this.options.templateDOM, {} ));
							this.dom = {};
							this.dom.instructions = this.element.find('.pa-instructionsPanel');
							this.dom.allDone = this.element.find('.pa-allDonePanel');

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


						showDOM: function (panel) {

							for (var p in this.dom) {
								if (p == panel) {
									this.dom[p].show();
								} else {
									this.dom[p].hide();
								}
							}
						},



						setList: function (list) {
							var _this = this;

							this.data.listTransactions = list;
							this.data.listTransactions.bind('length', function () {

								// if the list is empty (length == 0)
								if (_this.data.listTransactions.attr('length') == 0) {

									// now show the 'AllDone' panel:
									_this.showDOM('allDone');
								}
							})
						},



						setTransaction: function (transaction) {
							var _this = this;

							console.warn('*** ApprovalTransaction: received a transaction:', transaction);
							this.transaction = transaction;


							this.dom.approvalForm.html(can.view('PA_ApprovalForm', { transaction: this.transaction }));

							this.embeddTemplate('.pa-approvalForm-objTemplate', this.transaction.objectData.form);
							this.embeddTemplate('.pa-approvalForm-relatedTemplate', this.transaction.objectData.relatedInfo);

							this.form = new AD.op.Form(this.element.find('.pa-approvalForm-objTemplate'));

							// for each of my buttons (referenced by pa-status values)
							['approved', 'rejected'].forEach(function (status) {
								_this.buttons[status] = new AD.op.ButtonBusy(_this.element.find('[pa-status="' + status + '"]'));
							})

							this.showDOM('approvalForm');
						},



						'.pa-approvalform-submit click': function ($el, ev) {
							var _this = this;

							this.buttonsDisable();

							var status = $el.attr('pa-status');

							this.buttons[status].busy();

							var newValues = this.form.values();

							// NOTE: objectData can be quite large, and in some situations can clog the url parsers
							// so we don't send this info back, which is ok, since the server prevents us from updating
							// this field anyway.
							this.transaction.attr('objectData', {}); // don't send this back
							this.transaction.attr('status', status);
							this.transaction.attr('updatedValues', newValues);
							this.transaction.save()
								.fail(function (err) {
									console.error(err);
									_this.buttons[status].ready();
									_this.buttonsEnable();
								})
								.then(function (updatedTrans) {
									console.log('... transaction saved!');
								})
							ev.preventDefault();
						}


					});
				});
		});

	});