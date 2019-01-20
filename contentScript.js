
const NUM_REPLACE = 25;

function replaceForLanguage(name) {
  const url = chrome.runtime.getURL(`corpus/${name}.json`);
  const translatedPairs = {};

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
          translatedPairs[word] = json[word];
          let re = '\\s+' + word + '\\s+';
          let val = ' <ins>' + json[word] + '</ins> ';
          document.body.innerHTML = document.body.innerHTML.replace(new RegExp(re, "gi"), val);
          if (numReplaced > NUM_REPLACE) {
            break;
          }
        }
      }
      console.log('start completed', translatedPairs);
      playGame(translatedPairs);
    })
}

function playGame(translatedPairs) {
  const port = chrome.runtime.connect({ name: "food" });

  Object.entries(translatedPairs).forEach(([key, value]) => {
    console.log(`${key} ${value}`);
  });
  // reformat translated pairs
  const questions = Object.values(translatedPairs);
  const answers = Object.keys(translatedPairs);
  port.postMessage({questions: questions, answers: answers});
  //port.postMessage({ done: true });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg === 'startGame') {
      console.log('Starting game...');
      replaceForLanguage('Corpus-fr');
    }
  });
