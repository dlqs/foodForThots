// Change Dropdown menu title to option text
$('.dropdown-menu a').click(function () {
  $(this).parents('.dropdown').find('.btn').html($(this).text());
  $(this).parents('.dropdown').find('.btn').val($(this).data('value'));
});

function getDuoLingoData() {
  fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: 'foo=bar&lorem=ipsum'
  })
    .then(json)
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}

$('.dropdown-menu a').click(function() {
	$(this).parents('.dropdown').find('.btn').html($(this).text());
	$(this).parents('.dropdown').find('.btn').val($(this).data('value'));
});

<<<<<<< HEAD
$('#submitBtn').click(function() {
	console.log('Login');
});
=======
$('#submitBtn').click(function(event) {
	 event.preventDefault();
	 console.log('login');
});
>>>>>>> d7904bb63660acc6b9afe80af203665949c5b3de
