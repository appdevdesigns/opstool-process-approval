steal(
// List your Page's dependencies here:
	'opstools/ProcessApproval/ProcessApproval.css',
	'site/labels/opstool-ProcessApproval.js',
	function () {
		steal.import('opstools/ProcessApproval/controllers/ProcessApproval').then(function () { });
	});