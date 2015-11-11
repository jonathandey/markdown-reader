var $ = require('jquery');

$(function() {
	var indexContainer = $('#index');
	var contentContainer = $('#content');

	$.get('/index', function(resp) {
		indexContainer.html(resp);
	}, 'html');

	var indexToggle = $('<a/>').attr({
		id: 'index-toggle',
		href: 'javascript:;'
	})
	.addClass('draw')
	.text('Index');

	indexContainer.after(indexToggle);

	$(document).on('click', '.draw', function() {
		$('body').toggleClass('index-open index-closed');
	})
	.on('click', '#doc-files > li a', function(e) {
		var $this = $(this);
		var href = $this.attr('href');

		$.get(href, function(resp) {
			contentContainer.html(resp);
		}, 'html');

		e.preventDefault();
	});
});