let fontOverwrite = `@import url('https://cdn.clarkhacks.com/OpenDyslexic/v1/OpenDyslexic.css'); * {font-family: 'OpenDyslexic' !important}`;
let transformOverwrite = "* {text-transform:uppercase}";

// if we don't have the styleDom, create it
let styleDom = document.getElementById("comic-sans-everything-style");
if (!styleDom) {
  styleDom = document
    .querySelector("head")
    .appendChild(document.createElement("style"));
  styleDom.id = "comic-sans-everything-style";
  styleDom.rel = "stylesheet";
  styleDom.type = "text/css";
}

const updateStyle = () => {
    window.chrome.storage.sync.get(["status"], items => {
      if (!window.chrome.runtime.error) {
        if (items.status) {
          styleDom.innerText += fontOverwrite;
        } else {
          styleDom.innerText = "";
        }
      }
    });
  };

let styleDom2 = document.getElementById("changeBackgroundColor");
  if (!styleDom2) {
    styleDom2 = document
      .querySelector("head")
      .appendChild(document.createElement("style"));
    styleDom2.id = "changeBackgroundColor";
    styleDom2.rel = "stylesheet";
    styleDom2.type = "text/css";
  }

let styleDom3 = document.getElementById("changeFontSize");
  if (!styleDom3) {
    styleDom3 = document
      .querySelector("head")
      .appendChild(document.createElement("style"));
    styleDom3.id = "changeFontSize";
    styleDom3.rel = "stylesheet";
    styleDom3.type = "text/css";
  }  

const updateColor = (color, override) => {
    let changeBackground = `body{background-color : ${color}; border-color : ${color}} *{background-color : ${color}}`
    window.chrome.storage.sync.get(["backgroundStatus"], items => {
      if (!window.chrome.runtime.error) {
        if (items.backgroundStatus || override) {
            styleDom2.innerText = '#'+changeBackground;
        } else {
          styleDom2.innerText = "";
        }
      }
    });
  };

const updateSize = (size, override) => {
    let changeSize = `body{font-size : ${size}em;}`
    window.chrome.storage.sync.get(["sizeStatus"], items => {
      if (!window.chrome.runtime.error) {
        if (items.sizeStatus || override) {
            console.log(size, override);
            styleDom3.innerText = changeSize;
        } else {
          styleDom3.innerText = "";
        }
      }
    });
}

chrome.runtime.sendMessage({todo:"showPageAction"});

chrome.runtime.onMessage.addListener(function(req, sender, res){
    if(req.todo == "changeColor"){
         var colorFinal = '#' + req.clickedColor;
         updateColor(colorFinal);
    }
    else if(req.todo == "changeFont"){
        fontOverwrite = `@import url('https://cdn.clarkhacks.com/OpenDyslexic/v1/OpenDyslexic.css'); * {font-family: '${req.property}' !important}`
        updateStyle();
    }
    else if(req.todo == "changeSize"){
        var size = req.size;
        updateSize(size);
    }
})
let storedColor;
let backgroundOverride = false;
let sizeOverride = false;
let storedSize = 1;
window.chrome.storage.sync.get(["color"],function(stored){
    storedColor = '#'+stored.color;
    window.chrome.storage.sync.get(["backgroundStatus"],function(items){
        backgroundOverride = items.backgroundStatus;
    })
    window.chrome.storage.sync.get(["sizeStatus"],function(items){
        sizeOverride = items.sizeStatus;
    })
    window.chrome.storage.sync.get(["size"],function(items){
        storedSize = items.size;
        updateSize(storedSize, !sizeOverride);
    })
    updateStyle();
    updateColor(storedColor, backgroundOverride);
    
});
