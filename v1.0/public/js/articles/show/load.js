$(document).ready(function(){

    var appTabs = $('.app-tab'),
        cardAddButton = $('.card-add-button'),
        // cardAddButton = $('.col-add-button'),
        // rowAddButton = $('.row-add-col'),
        rowAddButton = $('.row-add-button'),
        rowActivators = $('.row-activator');



    function init() {

        const articleId = window.location.href.split("/").pop();

        // pull in cards data and save to local storage
        readCards(articleId);

        // add event handler
        handlerAppTab(appTabs);
        handlerCardAddButton(cardAddButton);
        handlerRowAddButton(rowAddButton);
        handlerRowActivator();
        // this click is for development only. When an article is created the POST route should create an initial card which 
        // + will be passed to the client as part of the initial page
        // cardAddButton.click();
    }

    init();

    // $('a[href="#"]').click(function(e) {
    //     e.preventDefault ? e.preventDefault() : e.returnValue = false;
    // });

});