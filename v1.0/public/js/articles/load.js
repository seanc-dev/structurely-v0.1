$(document).ready(function(){
    var appTabs = $('.app-tab'),
        // colAddButton = $('.col-add-button')
        cardAddButton = $('.col-add-button')

    function init() {
        // add event handler
        handlerAppTab(appTabs);
        handlerColAddButton(cardAddButton);
        // populate cards and content
        //loadData();

    }

    function handlerColAddButton(clickedButton){
        clickedButton.on('click', function(el){
            // insert new card component before column housing this element
            // keyword 'standard' is hard-coded here, but will be dynamic once card menu is functional
            insertCard($(this).closest('.col-add-button'), 'standard');
            // call column insert formula with keyword
            // call formula to set new column as active and remove from all others
            return false;
        });
    }

    function handlerAppTab(tabElementArr){
        console.log('tabElementArr: ', tabElementArr)
        tabElementArr.each(function(i, tabEl){
            console.log('tabEl: ', tabEl)
            $(this).on('click', function(tabEl){
                if(!$(this).hasClass('active')){
                    tabElementArr.each(function(i,tabElForToggle){
                        tabElForToggle.classList.toggle('active');
                    });
                }
            });
        });
    }

    function insertCard(target, contentKey){
        // insert html
        var insertedEl = target.before(cards[contentKey].html);
        console.log(insertedEl);
        // populate text
        populateCardText(insertedEl, cards[contentKey]);
        // set new card as active
    }
    
    function populateCardText(card, content){
        // populate title
        card.find('.' + content.title.key).text(content.title.text);
        // populate body
        console.log(content.body);
        content.body.content.forEach(function(bodyItem){
            card.find('.' + bodyItem.key).text(bodyItem.text);
        });
    }

    init();

});