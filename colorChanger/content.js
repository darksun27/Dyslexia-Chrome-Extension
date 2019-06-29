let fontOverwrite = `@import url('https://fonts.googleapis.com/css?family=Rubik+Mono+One&display=swap'); * {font-family: 'Rubik Mono One' !important}`;
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
  console.log(styleDom);
}

const updateStyle = () => {
    window.chrome.storage.sync.get(["status"], items => {
      if (!window.chrome.runtime.error) {
        if (items.status) {
          styleDom.innerText = fontOverwrite;
        } else {
          styleDom.innerText = "";
        }
      }
    });
  };

chrome.runtime.sendMessage({todo:"showPageAction"});

chrome.runtime.onMessage.addListener(function(req, sender, res){
    if(req.todo == "changeColor"){
         var colorFinal = '#' + req.clickedColor;
         var size = req.size+'em';
         $(req.selector).css(req.property, colorFinal);
         //$(req.selector).addClass("fontTest");
         $(req.selector).css('font-size', size, "important");
         console.log("hello");
        var els = document.querySelectorAll('body', 'body *');
        console.log(els);
        for(var i = 0; i < els.length; i++){
            els[i].fontFamily = "Roboto";
        }
    }
    else if(req.todo == "changeFont"){
        // run once on file load
        console.log("hello");
        updateStyle();
    }
})