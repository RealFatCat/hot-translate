function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    translateTo: document.querySelector("#translateTo").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#translateTo").value = result.translateTo || "ru";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("translateTo");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#translateTo").addEventListener("change", saveOptions);
