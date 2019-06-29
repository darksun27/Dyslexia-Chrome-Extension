const setStatus = (status) => {
  // this might seemed reversed, it is
  // we want to show the user the opposite of what the current status is
  if (status === true) {
    document.getElementById('status').innerHTML = 'On'
  } else if (status === false) {
    document.getElementById('status').innerHTML = 'Off'
  }
}

window.chrome.storage.sync.get(['status'], (items) => {
    // if there are no errors starting chrome calls
    if (!window.chrome.runtime.error) {
      // if this is the first time the extension starts
      if (items.status === undefined) {
        window.chrome.storage.sync.set({ 'status': true })
        setStatus(true)
      } else if (items.status) {
        setStatus(true)
      } else if (!items.status) {
        setStatus(false)
      }
    }
  })

$(function(){
    var els = document.querySelectorAll('body', 'body *');
    console.log(els);
    var color = $('#bgColor').val();
    var size = parseInt($('#size').text());
    var selector;
    var property;
    $('#bgColor').click(function(){
        $('body').addClass('minHW');
    })
    $('#increase').click(function(){
        size += 1;
        $('#size').text(size);
        var a = $('body').text();
        for(var i = 0 ; i < a.length; i++){
            if(a[i] == 'F'){
                console.log("found");
            }
        }
        console.log($('body').text());
    })
    $('#decrease').click(function(){
        size -= 1;
        $('#size').text(size);
    })
    $('#bgColor').on('change', function(){
        color = $(this).val();
    })
    $('#btnChange').click(function(){
        $('body').removeClass('minHW');
        var notifOptions = {
            type : 'basic',
            title : 'Name Changed',
            message : 'you have changed the background color',
            iconUrl : 'Screenshot (20).png'
        };
        var n = color.length;
        // if(n == 6){
        //     chrome.notifications.create('notif', notifOptions);
        //     chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
        //         chrome.tabs.sendMessage(tabs[0].id, {todo : "changeColor", clickedColor : color});
        //     })
        // } 

        if(n == 6){
            selector = $('#selectorID').val();
            property = $('#propertyVal').val();
            chrome.notifications.create('notif', notifOptions);
            chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {todo : "changeColor", clickedColor : color, property : property, selector : selector, size : size});
            })
        } 
    })
    $('#font_switch').click(function(){
        window.chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            let activeTab = tabs[0]
            window.chrome.storage.sync.get('status', (items) => {
              if (items.status) {
                  console.log(items.status);
                document.getElementById('status').innerText = 'Off'
              } else {
                console.log(items.status,"off");
                document.getElementById('status').innerText = 'On'
              }
              window.chrome.storage.sync.set({ 'status': !items.status })
              window.chrome.tabs.sendMessage(activeTab.id, {'todo' : "changeFont", 'status': !items.status})
            })
          })
    })
})