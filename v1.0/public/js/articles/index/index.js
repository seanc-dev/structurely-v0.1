$(document).ready(function(){

    // event handler for click on new article button
    $('#newArticleButton').on('click', function(e){
        $.post('/articles');
        return false;
    });

});