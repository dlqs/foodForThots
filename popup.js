
// Change Dropdown menu title to option text
$('.dropdown-menu a').click(function () {
  $(this).parents('.dropdown').find('.btn').html($(this).text());
  $(this).parents('.dropdown').find('.btn').val($(this).data('value'));
});

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

// Handle login
$('#loginForm').submit(function(event) {
  event.preventDefault();

  let email = $('input').eq(0).val();	 
  let password = $('input').eq(1).val();

});

// Start game
$('#startGameForm').submit(function(event) {
  event.preventDefault();
  const selectedLang = $('#dropdownMenuButton').text();
  switch (selectedLang) {
    case ''
  }
});

const NUM_REPLACE = 25;

function replaceForLanguage(name) {
  const url = chrome.runtime.getURL(`corpus/${name}.json`);

  fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
      let body = document.body.innerText.trim().toLowerCase().split(/\s+/);
      body = body.map(elem => elem.toLowerCase().trim());

      let numReplaced = 0;
      
      for (let word of body) {
        if (json.hasOwnProperty(word)) {
          numReplaced++;
          console.log(`Replacing ${word} with ${json[word]}`);
          let re = '\\s+' + word + '\\s+';
          let val = ' <ins>' + json[word] + '</ins> ';
          document.body.innerHTML = document.body.innerHTML.replace(new RegExp(re, "gi"), val);
          if (numReplaced > NUM_REPLACE) {
            return;
          }
        }
      }
    })
}

replaceForLanguage('Corpus-fr');