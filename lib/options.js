function saveOptions(e) {
  e.preventDefault();
  return browser.storage.local.set({
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

  return browser.storage.local.get("translateTo")
    .then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#translateTo").addEventListener("change", saveOptions);
