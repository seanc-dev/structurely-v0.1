$(document).ready(function(){
    var firstRow = $('.top-level-row');
    var initialAddComponentButton = firstRow.find('.btn-add-component');
    var initialRemoveComponentButton = firstRow.find('.btn-remove-component');
    var initialCancelRemoveParaButton = firstRow.find('.btn-cancel-remove-component');
    var initialConfirmRemoveParaButton = firstRow.find('.btn-confirm-remove-component');
    var initialLiAddButton = firstRow.find('#btnPointAdd-1');
    var initialEditableAreas = firstRow.find('.editable');

    function init() {
        // add event handlers
        handlerAddComponent(initialAddComponentButton);
        handlerRemoveComponent(initialRemoveComponentButton);
        handlerRemoveComponent(initialCancelRemoveParaButton);
        handlerConfirmRemoveComponent(initialConfirmRemoveParaButton);
        handlerAddLi(initialLiAddButton);
        editableAreaHandler(initialEditableAreas);
        // populate cards and content
        //loadData();
    };

    function handlerAddComponent(buttonEl){
        buttonEl.on('click', function(){
            jQueryEl = $(this);
            parentRow = jQueryEl.closest('.top-level-row');
            parentCol = jQueryEl.closest('.top-level-col');
            // append new row if required
            if(this.classList.contains('btn-add-row')){
                newRow = cloneEmptyAppendElement(parentRow);
                newCol = cloneEmptyAppendElement(parentCol, newRow)
            } else {
                newCol = cloneEmptyAppendElement(parentCol, parentRow)
            }
            // insert item - which item? defined by row index in the meantime?
            newCol.html(templates[newCol[0].dataset.index].html);
            // add handlers to item
            handlerAddComponent(newCol.children().find('.btn-add-component'));
            handlerRemoveComponent(newCol.children().find('.btn-remove-component, .btn-cancel-remove-component'));
            handlerConfirmRemoveComponent(newCol.children().find('.btn-confirm-remove-component'));
            // correct all row numbers
            setRowDivIds(); // -won't be necessary once db is connected (ID will be db _id)
            // insert data into components collection
            //generateNewRowData(parentRow);
            // update contents of new para to template
            //populateData(newRow, newRow[0].dataset.index);
        });
    };

    function handlerRemoveComponent(buttonEl){
        buttonEl.on('click', function(){
            console.log('Remove Handler Connected');
            // find and hide row with button
            var hideRow = this.closest('.flex-row');
            toggleClassesUponTest(hideRow, true, ['d-flex', 'd-none'])
            // find and reveal the Confirm/Cancel button row
            if(this.classList.contains('btn-remove-component')){
                var revealButtonRow = this.closest('.flex-row').nextElementSibling
            } else {
                var revealButtonRow = this.closest('.flex-row').previousElementSibling
            }
            toggleClassesUponTest(revealButtonRow, true, ['d-flex', 'd-none'])
        })
    };

    function handlerConfirmRemoveComponent(buttonEl){
        buttonEl.on('click', function(){
            var deleteRow = this.closest('.top-level-col');
            deleteRowDataIndex = deleteRow.dataset.index;
            //paraCards.cards.splice(deleteRowDataIndex,1);
            deleteRow.remove();
        });
    };

    function handlerAddLi(buttonEl){
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
        arr.on('blur', function(){
            console.log('editable handler connected')
            //saveData(el.closest('.top-level-row'))
        });
    };

    // function loadData(){
    //     // loop through paraCards object to generate rows and cards as req'd
    //     for(var i=0; i<paraCards.cards.length; i++){
    //         // append new row into app-body if required
    //         if(i>0){
    //             newRow = appendNewRow(initialAddParaButton);
    //         } else {
    //             newRow = $('#row-1');
    //         }
    //         // populate saved data into app
    //         populateData(newRow, i);
    //     };
    // };
    
    init();

});