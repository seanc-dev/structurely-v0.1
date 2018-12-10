function appendNewRow(clickedButton, clickedRow){
    var clickedRow = clickedRow || clickedButton.closest('.top-level-row');
    // clone and append new row to dom
    newRow = cloneElement(clickedRow.attr('id'), clickedRow.attr('id'));
    // ensure non-first columns in appended row are hidden
    $.each(newRow.children(), function(i, el){
        if(i>0){
            toggleClassesUponTest(el, !el.classList.contains('d-none'), ['d-none']);
        };
    });
    // update all ids in app-body to reflect new row order
    setRowDivIds();
    // update classes on para-expand-btn so arrow points right
    var newRowParaExpandIcon = document.getElementById(newRow.find('.btn-para-expand').attr('id')).children[0];
    toggleClassesUponTest(newRowParaExpandIcon, !newRowParaExpandIcon.classList.contains('fa-angle-double-right'), [
        'fa-angle-double-right',
        'fa-angle-double-left'
    ]);
    return newRow
}

function cloneElement(idToClone, idToAppendAfter){
    var clonedElement = $('#' + idToClone).clone(true)
    $('#' + idToAppendAfter).after(clonedElement);
    return clonedElement;
};

function toggleClassesUponTest(element, test, classArr){
    if(test){
        //console.log('post-test: ', element, classArr)
        classArr.forEach(function(cl){
            element.classList.toggle(cl);
        });
    };
};

function setRowDivIds(){
    // loop through all top level row divs
    $.each($('.top-level-row'), function(rowNum, el){
        // update data index
        el.dataset.index = rowNum
        // increment rowNum
        rowNum += 1
        // update row id
        el.id = incrementId(el.id,rowNum);
        // create array of all child elements with id and increment them too
        var idArr = $('div#' + el.id + ' [id]');
        $.each(idArr, function(i, elem){
            elem.id = incrementId(elem.id, rowNum);
        });
    });
};

function incrementId(id, idNum){
    if(id){
        if(RegExp('[/S]*-[0-9]*').test(id)){
            idStr = id.slice(0, (id.lastIndexOf('-') - id.length + 1));
            id = idStr + String(idNum);
            return id;
        } else {
            console.log("Invalid ID: ", id);
        };
    };
};