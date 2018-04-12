
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
var origList = list.slice();;
var list = list;
$.getJSON('/fcf_activities/userteam/find?_='+(Math.random() * 1000000000), function(data) {
	var teams = [];
	$.each(data.data, function(index, value) {
		teams.push(value.IDMinistry);
	});
	if (teams.length > 0) {
		var myItems = [];
		$.each(list, function(index, value) {
			if (value.objectData.menu.instanceRef == "activity_name") {
				if (teams.indexOf(value.objectData.form.data.team) != -1) {
					myItems.push(value);
				}
			} else if (value.objectData.menu.instanceRef == "caption") {
				if (teams.indexOf(value.objectData.form.data.activity.team) != -1) {
					myItems.push(value);
				}
			}
		});
		list.splice(0,list.length)
		var newList = list.concat(myItems);
		_this.controllers.PendingTransactions.setList(newList);
		_this.controllers.ApprovalWorkspace.setList(newList);
		_this.data.list = newList;
	}

	$.getJSON('/site/user/data?_='+(Math.random() * 1000000000), function(data) {
		if (data.data.actions.indexOf("adcore.admin") != -1) {
			$("#filterTeamData").prop("disabled", false);
			$("#filterTeamData").css("display", "");
			$("#filterTeamData").click(function() {
				newList.splice(0,newList.length)
				var oldList = newList.concat(origList);
				_this.controllers.PendingTransactions.setList(oldList);
				_this.controllers.ApprovalWorkspace.setList(oldList);
				_this.data.list = oldList;
				$("#filterTeamData").css("display", "none");
			});	
		}
	});
	
}).error(function() {  
	_this.controllers.PendingTransactions.setList(list);
	_this.controllers.ApprovalWorkspace.setList(list);
	_this.data.list = list;
});


								});

							this.PARequest.on('stale', function (m, d) {

								// we only want pending transactions:
								var condition = {
									status: "pending"
								};


								// ignore any existing transactions in our list:
								var currentIDs = [];
								_this.data.list.forEach(function (item) {
									currentIDs.push(item.getID());
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
										listNew.forEach(function (item) {
											_this.data.list.push(item);
										})
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
