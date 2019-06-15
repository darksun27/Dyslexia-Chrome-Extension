chrome.runtime.sendMessage({todo:"showPageAction"});

chrome.runtime.onMessage.addListener(function(req, sender, res){
    if(req.todo == "changeColor"){
         var colorFinal = '#' + req.clickedColor;
         var size = req.size+'em';
         $(req.selector).css(req.property, colorFinal);
         $(req.selector).addClass("fontTest");
         $(req.selector).css('font-size', size, "important");
    }
})