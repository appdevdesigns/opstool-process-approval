steal(
// List your Page's dependencies here:
	'opstools/ProcessApproval/controllers/ProcessApproval.js',
	'opstools/ProcessApproval/ProcessApproval.css',
	function () {
		steal.import('site/labels/opstool-ProcessApproval.js').then(function () { });
	});