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

  const setStatus2 = (status) => {
    // this might seemed reversed, it is
    // we want to show the user the opposite of what the current status is
    if (status === true) {
      document.getElementById('btnStatus').innerHTML = 'On'
    } else if (status === false) {
      document.getElementById('btnStatus').innerHTML = 'Off'
    }
  }  

  const setStatus3 = (status) => {
    // this might seemed reversed, it is
    // we want to show the user the opposite of what the current status is
    if (status === true) {
      document.getElementById('sizeStatus').innerHTML = 'On'
    } else if (status === false) {
      document.getElementById('sizeStatus').innerHTML = 'Off'
    }
  }  

window.chrome.storage.sync.get(['backgroundStatus'], (items) => {
    // if there are no errors starting chrome calls
    if (!window.chrome.runtime.error) {
      // if this is the first time the extension starts
      if (items.backgroundStatus === undefined) {
        window.chrome.storage.sync.set({ 'backgroundStatus': true })
        setStatus2(true)
      } else if (items.backgroundStatus) {
        setStatus2(true)
      } else if (!items.backgroundStatus) {
        setStatus2(false)
      }
    }
  })

window.chrome.storage.sync.get(['sizeStatus'], (items) => {
// if there are no errors starting chrome calls
if (!window.chrome.runtime.error) {
    // if this is the first time the extension starts
    if (items.sizeStatus === undefined) {
    window.chrome.storage.sync.set({ 'sizeStatus': true })
    setStatus3(true)
    } else if (items.sizeStatus) {
    setStatus3(true)
    } else if (!items.sizeStatus) {
    setStatus3(false)
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
        // console.log("changing");
        // chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
        //     chrome.tabs.sendMessage(tabs[0].id, {todo : "changeColor", clickedColor : color, property : property, selector : selector, size : size});
        // })
    })
    $('#btnChange').click(function(){
        $('body').removeClass('minHW');
        var n = color.length;
        if(n == 6){
            window.chrome.storage.sync.get('backgroundStatus', (items) => {
                if (items.backgroundStatus) {
                  document.getElementById('btnStatus').innerText = 'Off'
                } else {
                  document.getElementById('btnStatus').innerText = 'On'
                }
            window.chrome.storage.sync.set({ 'backgroundStatus': !items.backgroundStatus })
            window.chrome.storage.sync.set({ 'color': color })
            chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {todo : "changeColor", clickedColor : color});
            })
        } 
    )}
})

$('#size_change').click(function(){
    $('body').removeClass('minHW');
    window.chrome.storage.sync.get('sizeStatus', (items) => {
        if (items.sizeStatus) {
            document.getElementById('sizeStatus').innerText = 'Off'
        } else {
            document.getElementById('sizeStatus').innerText = 'On'
        }
        window.chrome.storage.sync.set({ 'sizeStatus': !items.sizeStatus })
        window.chrome.storage.sync.get('sizeStatus', items => {
            console.log(items.sizeStatus);
        })
        window.chrome.storage.sync.set({ 'size': size })
        chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {todo : "changeSize", 'size' : size});
        })
    })
    window.chrome.storage.sync.get('sizeStatus', items => {
        console.log(items.sizeStatus);
    })
})
    $('#font_switch').click(function(){
        property = $('#propertyVal1').val();
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
              window.chrome.tabs.sendMessage(activeTab.id, {'todo' : "changeFont", 'status': !items.status, property : property})
            })
          })
    })
})