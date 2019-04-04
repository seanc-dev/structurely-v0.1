// same as above but ajax re-written with axios
function createCard(cardEl, cardData){
    cardData = cardData || {};
    console.log(cardData);
    // find articleId in URL
    var articleId = window.location.href.split("/").pop();
    // post new card data to server to create db entry
    axios.post('/articles/' + articleId + '/cards', cardData
        )
        .then(function(response){
            cardEl.attr('id', response);
        })
        .catch(function(error){
            console.log(error);
    });
}

// // read data in existing cards
function readCards(articleId){
    console.log('readCards function initialised');
    axios.get('/articles/' + articleId + '/cards')
        .then(function(resolve){
            console.log('success callback initialised');
            console.log(resolve.data);
        })
        .catch(function(error){
            console.log(error);
        });
    // return cards array
}

// update data in existing card
function updateCards(){
    
}

// destroy existing card
function destroyCard(id){

}

