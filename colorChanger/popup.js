$(function(){
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
})