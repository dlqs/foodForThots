const NUM_REPLACE = 25;

function replaceForLanguage(name) {
  const url = chrome.runtime.getURL(`corpus/${name}.json`);

  fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
      let body = document.body.innerText.trim().toLowerCase().split(/\s+/);
      body = body.map(elem => elem.toLowerCase().trim());
      //let counts = {};

      //for (let i = 0; i < body.length; i++) {
      //  let num = body[i];
      //  counts[num] = counts[num] ? counts[num] + 1 : 1;
      //}
      //const keysSorted = Object.keys(counts).sort(function(a,b){return counts[a]-counts[b]})
      //console.log(keysSorted);

      let numReplaced = 0;
      
      const keysSorted = body;
      // find 
      for (let word of keysSorted) {
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

function foo(arr) {
  var a = [], b = [], prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}

replaceForLanguage('Corpus-fr');