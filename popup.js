// Change Dropdown menu title to option text
$('.dropdown-menu a').click(function() {
	$(this).parents('.dropdown').find('.btn').html($(this).text());
	$(this).parents('.dropdown').find('.btn').val($(this).data('value'));
});

$('#submitBtn').click(function() {
	console.log('Login');
});