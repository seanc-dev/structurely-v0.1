function handlerCardAddButton(clickedButton){
    clickedButton.on('click', function(e){
        // identify requested card type
        var cardTypeKey = 1
        // insert new card component before column housing this element
        // NOTE keyword 'standard' is hard-coded here, but will be dynamic once card menu is functional
        var newCol = insertCard($(this).closest('.col-add-button'), 'standard');
        var newCard = newCol.insertedEl.find('.card');
        // call create function to generate new card in DB and save DB _id to var
        createCard(newCol.insertedEl, newCol.cardData);
        // call formula to set new card as active and remove from all others
        setElementAsActive(newCard, '.card');
        handlerRowActivator();
        return false;
    });
}

function insertCard(target, cardTypeKey){
    // increment col-add-button col-index
        // find the data-col-index value for the column div-el that housed the clicked button and saves it in a var
    var colIndex = Number(target.attr('data-col-index'));
        // increment the data-col-index attribute for the clicked button col
    target.attr('data-col-index', colIndex + 1);
    // find row index
    var rowIndex = Number(target.closest('.app-row').attr('data-row-index'));
    // insert html and update data-col-index
    var insertedEl = target.before(cards[cardTypeKey].html).prev();
    insertedEl.attr('data-col-index', colIndex);
    // add handlers, populate text, and remove d-none class to initiate fade-in
    handlerCardActivator(insertedEl.find('.card-component'));
    handlerRowActivator(insertedEl.find('.row-activator'));
    populateCardText(insertedEl, cards[cardTypeKey].content);
    insertedEl.click().addClass('in');
    
    return {
        insertedEl: insertedEl,
        cardData: {
            type: cardTypeKey,
            row: rowIndex,
            col: colIndex,
            content: cards[cardTypeKey].content
        }
    }
}

function populateCardText(card, content){
    // populate title
    card.find('.' + content.title.class).text(content.title.text);
    card.find('.' + content.title.class)
    // populate body
    content.body.content.forEach(function(bodyItem){
        card.find('.' + bodyItem.class).text(bodyItem.text);
    });
}

