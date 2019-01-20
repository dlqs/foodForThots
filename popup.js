// Populate start screen dropdown menu with available languages
$(function() {
  $.ajax({
    type: 'get',
    url: 'https://s3-ap-southeast-1.amazonaws.com/hacknroll',
    dataType: 'xml',
    success: function(data) {
      let $language = $(data).find('Contents');
      $language.each(function() {
        const langName = $(this).find('Key').text().split('-')[1];
        const child = '<a class="dropdown-item" href="#">' + langName + '</a>'
        $(child).appendTo('#dropdownMenu');
      });
      // Change Dropdown menu title to option text when option is clicked
      $('.dropdown-menu a').click(function () {
        console.log('clicked');
        $(this).parents('.dropdown').find('.btn').html($(this).text());
        $(this).parents('.dropdown').find('.btn').val($(this).data('value'));
      });
    },
    error: function(xhr, status) {
      console.log(status);
    }
  })
})

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
  startGame(selectedLang);
});

// Game handler
function startGame(language) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { msg: "startGame" });
  });

  $('#mainBody').html(`
    <h5 class="text-center spacer" id="questionWord">some word</h5>
    <div class="form-label-group">
      <input type="text" id="inputWord" class="form-control" placeholder="Answer" required autofocus>
    </div>
    <button class="btn btn-primary btn-block" id="translateButton" type="button">Translate!</button>
  `);


  chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "food");
    port.onMessage.addListener(function (msg) {
      console.log('Popup received: ' + msg);
      const questions = msg.questions;
      const answers = msg.answers;
      askQuestion(0, questions, answers);
    });
  });
}

function askQuestion(questionNum, questions, answers) {
  document.getElementById('questionWord').innerText = questions[questionNum];
  const ans = answers[questionNum];
  document.getElementById('translateButton').addEventListener('click', (event) => {
    console.log(document.getElementById('inputWord').value);
    askQuestion(questionNum + 1, questions, answers);
  }, {once: true})
}
