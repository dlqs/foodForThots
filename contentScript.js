
const NUM_REPLACE = 25;

function replaceForLanguage(name) {
  const url = chrome.runtime.getURL(`corpus/${name}.json`);

  fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
      let body = document.body.innerText.trim().toLowerCase().split(/\s+/);
      body = body.map(elem => elem.toLowerCase().trim());

      let numReplaced = 0;
      
      // find 
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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    replaceForLanguage('Corpus-fr');
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.msg == "startGame")
      sendResponse({farewell: "YOLO"});
  });
