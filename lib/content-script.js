document.addEventListener("mouseup", function getSelection(e) {
  var selection = window.getSelection().toString().trim();
  if (selection) {
    browser.runtime.sendMessage({"selectedText": encodeURIComponent(selection)});
  }
});
