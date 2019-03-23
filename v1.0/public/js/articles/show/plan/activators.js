function handlerRowActivator(){
    $('.row-activator').each(function(i, el){
        $(el).on('click', function(e){
            setElementAsActive($(this).closest('.app-row'), $('.app-row'));
        });
    });
}

function handlerCardActivator(cardElements){
    cardElements.each(function(i, el){
        $(el).on('click', function(e){
            setElementAsActive($(this), '.card-component');
        });
    });
}