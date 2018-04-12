
steal(
// List your Controller's dependencies here:
	'opstools/ProcessApproval/controllers/PendingTransactions.js',
	'opstools/ProcessApproval/controllers/ApprovalWorkspace.js',
	
	'opstools/ProcessApproval/views/ProcessApproval/ProcessApproval.ejs',
	function () {
		System.import('appdev').then(function () {
			steal.import(
				'appdev/ad',
				'appdev/control/control',
				'OpsPortal/classes/OpsTool').then(function () {
					
					// Namespacing conventions:
					// AD.Control.OpsTool.extend('[ToolName]', [{ static },] {instance} );
					AD.Control.OpsTool.extend('ProcessApproval', {

						CONST: {
							ITEM_SELECTED: 'Transaction.Selected'
						},


						init: function (element, options) {
							var self = this;
							options = AD.defaults({
								templateDOM: '/opstools/ProcessApproval/views/ProcessApproval/ProcessApproval.ejs',
								resize_notification: 'ProcessApproval.resize',
								tool: null   // the parent opsPortal Tool() object
							}, options);
							this.options = options;

							// Call parent init
							this._super(element, options);

							this.data = {};
							this.data.list = null;

							this.initDOM();
							this.initControllers();
							this.initEvents();
							this.loadListData();

						},


						loadListData: function () {
							var _this = this;

							// now load our data from the server:
							this.PARequest = AD.Model.get('opstools.ProcessApproval.PARequest');
							this.PARequest.findAll({ status: 'pending' })
								.fail(function (err) {
									console.error('!!! Dang.  something went wrong:', err);
								})
								.then(function (list) {
									_this.controllers.PendingTransactions.setList(list);
									_this.controllers.ApprovalWorkspace.setList(list);
									_this.data.list = list;
									console.log('... here is our list of pending transactions:', list);
								});

							this.PARequest.on('stale', function (m, d) {

								// we only want pending transactions:
								var condition = {
									status: "pending"
								};


								// ignore any existing transactions in our list unless the item was updated:
								var currentIDs = [];
								_this.data.list.forEach(function (item) {
									var itemId = item.getID();
									// check to see if there was an updated item id passed
									if (d.paRequestId) {
										// if id was passed and it does not match the current id push id to ignore array
										if (d.paRequestId != itemId) {
											currentIDs.push(item.getID());
										}
									} else {
										// if no updated item id passed just ignore all
										currentIDs.push(item.getID());
									}
								})
								if (currentIDs.length > 0) {
									condition.id = {
										'!': currentIDs
									};
								};

								// console.log('... condition:', condition);

								_this.PARequest.findAll(condition)
									.fail(function (err) {
										console.error('!!! Dang.  something went wrong:', err);
									})
									.then(function (listNew) {
										// if we have passed an updated item id
										if (d.paRequestId) {
											var index = 0;
											var needPush = true; // if not found in the nav we need to push new item to the end
											// look for the item and update its data or add to the end of the list
											_this.data.list.forEach(function (item) {
												var itemId = item.getID();
												if (d.paRequestId == itemId) {
													item = listNew[0];
													needPush = false; // no need to add it to the end
													// data is up to date now tell the UI to update (this is needed when we are updating an exisiting nav item)
													_this.controllers.PendingTransactions.setList(_this.data.list);
													_this.controllers.ApprovalWorkspace.setList(_this.data.list);
												} else if (index +1  == _this.data.list.length && needPush) {
													_this.data.list.push(listNew[0]); // this was a status change as well so lets put it back in the list
												}
												index++;
											});
										} else {
											// otherwise just push in the new items
											listNew.forEach(function (item) {
												_this.data.list.push(item);
											})
										}
									})
							})
						},



						initControllers: function () {

							this.controllers = {};  // hold my controller references here.

							var PendingTransactions = AD.Control.get('opstools.ProcessApproval.PendingTransactions');
							this.controllers.PendingTransactions = new PendingTransactions(this.element.find('.pa-pendingtransactions'), { eventItemSelected: this.CONST.ITEM_SELECTED });

							var ApprovalWorkspace = AD.Control.get('opstools.ProcessApproval.ApprovalWorkspace');
							this.controllers.ApprovalWorkspace = new ApprovalWorkspace(this.element.find('.pa-approvalworkspace'), {});
						},



						initDOM: function () {

							this.element.html(can.view(this.options.templateDOM, {}));

						},



						initEvents: function () {

							var _this = this;

							// event: ItemSelected 
							// when an item is selected in our PendingTransactions list, pass 
							// that item on to the ApprovalWorkspace Controller
							// @param: {obj} transaction  The transaction that was selected
							this.controllers.PendingTransactions.element.on(this.CONST.ITEM_SELECTED, function (event, transaction) {

								console.log(' ... Transaction Selected : ', transaction);

								// pass the transaction off to the ApprovalWorkspace
								_this.controllers.ApprovalWorkspace.setTransaction(transaction);
							});

						},


						resize: function (data) {

							this._super(data);

							this.controllers.PendingTransactions.resize(data.height);

						}


					});
				});
		});


	});