var paraCards = {
    template: {
        paraTitle: "Paragraph or Concept",
        paraContent: "Write a simple sentence describing the concept you want to explore",
        additionalPoints: [
            {
                text: "Add extra details for your paragraph here",
                detailsAdded: 0,
                detail: {}
            }
        ]
    },
    cards: [
        {
            paraTitle: "Paragraph or Concept",
            paraContent: "Write a simple sentence describing the concept you want to explore",
            additionalPoints: [
                {
                    text: "This is a supplementary point",
                    detailsAdded: 0,
                    detail: {}
                },   
                {
                    text: "As is this",
                    detailsAdded: 0,
                    detail: {}
                }
            ]
        },
        {
            paraTitle: "Edited Paragraph",
            paraContent: "Introduce the question of why some crazy bastard would ever want to try to learn to code :/",
            additionalPoints: {
                0: {
                    text: "This is a supplementary point",
                    detailsAdded: 0,
                    detail: {}
                },   
                1: {
                    text: "As is this",
                    detailsAdded: 0,
                    detail: {}
                }
            }
        },
        {
            paraTitle: "Paragraph or Concept",
            paraContent: "Write a simple sentence describing the concept you want to explore",
            additionalPoints: {
                0: {
                    text: "This is a supplementary point",
                    detailsAdded: 0,
                    detail: {}
                },   
                1: {
                    text: "As is this",
                    detailsAdded: 0,
                    detail: {}
                }
            }
        }
    ]
};

function populateData(row, dataIndex){
    var paraTitleEl = row.find('.para-card-header')
    var paraBodyEl = row.find('.para-card-body')
    console.log('paraCards.cards: ', paraCards.cards)
    paraTitleEl[0].innerText = paraCards.cards[dataIndex].paraTitle
    paraBodyEl[0].innerText = paraCards.cards[dataIndex].paraContent
};

function saveData(rowToSave){
    if(rowToSave){
        var rowIndex = rowToSave.dataset.index;
        console.log('saveData.rowIndex: ', rowIndex)
        var editables = rowToSave.querySelectorAll('.editable');
        editables.forEach(function(){
            if(this.classList.contains('.para-card-header')){

            } else if(true){
                // update para body
            } else if(true){
                // define loop to update all additional points for card
            }
        })
    } else {
        console.log('Thesis row edited');
    }
    
}

function generateNewRowData(clickedRow){
    // find index of clicked row and generate new entry for paraCards array
    var rowDataIndex = document.querySelector('#' + clickedRow.attr('id')).dataset.index;
    paraCards.cards.splice(rowDataIndex,0,paraCards.template);
};
