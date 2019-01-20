
const NUM_REPLACE = 25;

function replaceForLanguage(name) {
  //const url = chrome.runtime.getURL(`corpus/${name}.json`);
  const url = `https://s3-ap-southeast-1.amazonaws.com/hacknroll/Corpus-${name}.json`
  const translatedPairs = {};
  console.log(url);

  return fetch(url, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      return response.json();
    }) //assuming file contains json
    .then((json) => {
      console.log(json);
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
      playGame(translatedPairs);
    })
    .catch((err) => {
      console.log(err);
    })
}

function playGame(translatedPairs) {
  const port = chrome.runtime.connect({ name: "food" });

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
      replaceForLanguage(request.lang);
    }
  });
