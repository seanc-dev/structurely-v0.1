$(document).ready(function(){

    

    var firstRow = $('#row-1');
    var initialAddParaButton = firstRow.find('#btnAddPara-1');
    var initialRemoveParaButton = firstRow.find('#btnRemovePara-1');
    var initialExtendParaButton = firstRow.find('#btnExpand-1');
    var initialCancelRemoveParaButton = firstRow.find('#btnRemoveParaCancel-1');
    var initialConfirmRemoveParaButton = firstRow.find('#btnRemoveParaConfirm-1');
    var initialPointAddButton = firstRow.find('#btnPointAdd-1');
    var initialEditableAreas = $('.editable');

    function init() {

        alert('connected')
        // add event handlers
        paraAddHandler(initialAddParaButton);
        paraRemoveHandler(initialRemoveParaButton);
        paraExtendHandler(initialExtendParaButton);
        paraRemoveHandler(initialCancelRemoveParaButton);
        confirmParaRemoveHandler(initialConfirmRemoveParaButton);
        paraPointAddHandler(initialPointAddButton);
        editableAreaHandler(initialEditableAreas);
        // populate cards and content
        loadData();
    };

    function paraAddHandler(buttonEl){
        buttonEl.on('click', function(e){
            // find top-level-row of clicked button
            var parentRow = $(this).closest('.top-level-row');
            // create and append new element
            var newRow = appendNewRow(this, parentRow);
            // insert data into paraCards.cards array
            generateNewRowData(parentRow);
            // update contents of new para to template
            populateData(newRow, newRow[0].dataset.index);
        });
    };

    function paraRemoveHandler(buttonEl){
        buttonEl.on('click', function(){
            var hideRow = this.closest('.flex-row');
            toggleClassesUponTest(hideRow, true, ['d-flex', 'd-none'])
            if(this.classList.contains('btn-para-remove')){
                var revealButtonRow = this.closest('.flex-row').nextElementSibling
            } else {
                var revealButtonRow = this.closest('.flex-row').previousElementSibling
            }
            toggleClassesUponTest(revealButtonRow, true, ['d-flex', 'd-none'])
        })
    };

    function confirmParaRemoveHandler(buttonEl){
        buttonEl.on('click', function(){
            var deleteRow = this.closest('.top-level-row');
            deleteRowDataIndex = deleteRow.dataset.index;
            paraCards.cards.splice(deleteRowDataIndex,1);
            deleteRow.remove();
        });
    };
    
    function paraExtendHandler(buttonEl){
        buttonEl.on('click', function(e){
            // find col of clicked button
            var colDiv = e.target.closest('.top-level-row').querySelector('.para-points-column');
            // toggle classes
            colDiv.classList.toggle('d-none');
            toggleClassesUponTest(this.children[0], true, ['fa-angle-double-right','fa-angle-double-left'])
        });
    };

    function paraPointAddHandler(buttonEl){
        buttonEl.on('click', function(){
            console.log(this);
            var pointsListItem = $(this).closest('.card-body').find('.para-points-li')
            var newPointsListItem = '<li class="para-points-li">'
            + '<span class="para-points-text d-block" contenteditable="true">Add extra details for your paragraph here</span>'
            + '</li>'
            console.log('newPointsListItem: ', newPointsListItem)
            newPointsListItem = pointsListItem.clone(true)[0]

            // NEED FUNCTION TO CONVERT TEXT TO HTML AND APPEND AFTER ELEMENT

            pointsListItem.after(newPointsListItem);
            console.log('pointsListItem: ', pointsListItem)
        });
    };

    function editableAreaHandler(arr){
        console.log(arr)
        $.each(arr, function(i, el){
            console.log(el)
            el.addEventListener('click', function(){
                console.log('connected')
                saveData(el.closest('.top-level-row'))
            })
        });
    }

    function loadData(){
        // loop through paraCards object to generate rows and cards as req'd
        for(var i=0; i<paraCards.cards.length; i++){
            // append new row into app-body if required
            if(i>0){
                newRow = appendNewRow(initialAddParaButton);
            } else {
                newRow = $('#row-1');
            }
            // populate saved data into app
            populateData(newRow, i);
        };
    };
    
    init();

});