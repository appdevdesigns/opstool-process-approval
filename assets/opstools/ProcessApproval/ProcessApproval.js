steal(
// List your Page's dependencies here:
	'opstools/ProcessApproval/ProcessApproval.css',
	function () {
		steal.import('opstools/ProcessApproval/controllers/ProcessApproval').then(function () { });
	});