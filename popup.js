// Change Dropdown menu title to option text
$('.dropdown-menu a').click(function () {
  $(this).parents('.dropdown').find('.btn').html($(this).text());
  $(this).parents('.dropdown').find('.btn').val($(this).data('value'));
});

// Handle Dropdown search for languages
$('#langSearch').keyup(function() {
  const filter = $('#langSearch').eq(0).val().toUpperCase();
  const a = $('#dropdownMenu a');
  for (let i = 0; i < a.length; i++) {
    let txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
});

const credentials = { login : 'matthea1998', password: 'password' };

function getDuoLingoData() {
  fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(credentials)
  }).then(json)
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}

// Handle login
$('#loginForm').submit(function(event) {
  event.preventDefault();

  let email = $('input').eq(0).val();	 
  let password = $('input').eq(1).val();

  getDuoLingoData();
});
