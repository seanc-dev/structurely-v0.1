$(document).ready(function(){

    // event handler for click on new article button
    $('#newArticleButton').on('click', function(e){
        axios.post('/articles')
            .then(function(response){
                window.location.href = window.location.href + '/' + response.data;
            })
            .catch(function(err){
                console.log(err);
            });
        return false;
    });

});