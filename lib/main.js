//var { Cc, Ci } = require("chrome");
var { Hotkey } = require("sdk/hotkeys");
var { ActionButton } = require("sdk/ui/button/action");
var Request = require("sdk/request").Request;
var tabs = require("sdk/tabs");
var selection = require("sdk/selection");
var notifications = require("sdk/notifications");

var notifyImg = "./icon-32-white.png";
var apiKey = "";
var selectedText = '';

function textSelection(event){
    if (selection.isContiguous) {
        selectedText = selection.text;
    }
}

var button = ActionButton({
    id: "hot-translator",
    label: "Hot Translator",
    icon: {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
    },
    onClick: function(state) {
        console.log("Selected text: " + selectedText);
        tabs.open("https://translate.yandex.ru/?text=" + selectedText);
    }
});

var HotKeyPress = Hotkey({
    combo: "accel-alt-q",
    onPress: function(){
        Request({
            url: "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + apiKey + "=ru&text=" + selectedText,
            onComplete: function (response) {
                var translated = response.json.text[0];
                console.log("Translated text: " + translated);
                notifications.notify({
                    text: translated,
                    iconURL: notifyImg
                });
            }
        }).get();
    }
});

selection.on('select', textSelection);
