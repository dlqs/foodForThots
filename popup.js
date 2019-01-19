// Change Dropdown menu title to option text
$('.dropdown-menu a').click(function() {
	$(this).parents('.dropdown').find('.btn').html($(this).text());
	$(this).parents('.dropdown').find('.btn').val($(this).data('value'));
});

// Handle login
$('#loginForm').submit(function(event) {
	 event.preventDefault();

	 let email = $('input').eq(0).val();	 
	 let password = $('input').eq(1).val();
});