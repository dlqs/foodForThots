function replaceForLanguage(name) {
  const url = chrome.runtime.getURL(`corpus/${name}.json`);

  fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
      for (let key in json) {
        if (json.hasOwnProperty(key)) {
          console.log(`Replacing ${key} with ${json[key]}`);
          document.body.innerHTML = document.body.innerHTML.replace(new RegExp(key, "gi"), json[key]);
        }
      }
    })
}

replaceForLanguage('test');