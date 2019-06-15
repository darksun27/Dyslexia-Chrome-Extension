$(function(){
    $('#try').keyup(function(){
        $('#txt').text($('#try').val());
        var notifOptions = {
            type : 'basic',
            title : 'Name Changed',
            message : 'you have changed the name',
            iconUrl : 'Screenshot (20).png'
        };
        var n = $('#try').val();
        if(n.length > 1){
            chrome.notifications.create('notif', notifOptions);
        } 
    })
})