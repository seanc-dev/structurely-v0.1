// create new card and set element id to db in in callback
function createCard(cardEl, cardData){
    cardData = cardData || {};
    // find articleId in URL
    var articleId = window.location.href.split("/").pop();
    // post new card data to server to create db entry
    $.ajax({
        method: "POST",
        url: "/articles/" + articleId + "/cards",
        data: {
            card: cardData
        },
        success: function(newCardId, textStatus){
            console.log('post successful');
            cardEl.attr('id', newCardId);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('post unsuccessful');
            console.log('errorThrown: ', errorThrown);
        }
    });
}

// // read data in existing card
// function readCard(id){
//     // return 
// }

// update data in existing card
function updateCard(id, obj){
    
}

// destroy existing card
function destroyCard(id){

}

