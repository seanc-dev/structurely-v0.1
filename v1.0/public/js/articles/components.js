var templates = [ // Type of card is implied by position in array
    {
        id: "zero-component-add",
        name: "",
        row: 1,
        col: 1,
        data:{},
        html: '<div class="col-4 d-flex align-items-center"><div id="paraCard-1" class="card app-card card-transparent"><div class="card-body justify-content-center d-flex mt-3"><button class="btn btn-outline-secondary btn-circle-xl btn-add-component"><i class="fa fa-plus"></i></button></div></div></div>'
    },
    {
        id: "paraCard-0",
        name: "Paragraph Concept",
        row: 1,
        col: 1,
        data: {
            0: "Paragraph or Concept",
            1:  "Write a simple sentence describing the concept you want to explore"
        },
        html: '<div id="paraCard-1" class="card app-card"><div class="card-body"><div class="d-flex flex-row justify-content-between align-items-center"><h5 id="paraCardTitle-1" class="card-title para-card-header mb-0 editable" contenteditable="true">Paragraph or Concept</h5><button type="button" id="btnAddCol-1" class="btn btn-outline-success btn-sm btn-add-component"><i class="fas fa-plus"></i></i></button></div><p id="paraCardBody-1" class="card-text para-card-body editable" contenteditable="true">Write a simple sentence describing the concept you want to explore</p><div class="d-flex flex-row justify-content-center"><button type="button" id="btnAddRow-1" class="btn btn-outline-success btn-sm px-2 btn-add-component btn-add-row"><i class="fas fa-plus"></i></button><button type="button" id="btnRemovePara-1" class="btn btn-outline-secondary btn-sm px-2 btn-remove-component" data-toggle-child="1"><i class="fas fa-minus"></i></button></div><div class="flex-row justify-content-center d-none"><button type="button" id="btnRemoveParaConfirm-1" class="btn btn-outline-danger btn-sm px-2 btn-confirm-remove-component">Confirm Deletion</button><button type="button" id="btnRemoveParaCancel-1" class="btn btn-outline-success btn-sm px-2 btn-cancel-remove-component">Cancel</button></div></div></div>'
    },
    {
        id: "paraPointsCard-0",
        name: "Additional Points",
        row: 1,
        col: 2,
        data: {
            0: "Additional Points",
            1: "Add extra details for your paragraph here"
        },
        html: '<div id="paraCard-1" class="card app-card"><div class="card-body"><div class="d-flex flex-row justify-content-between align-items-center"><h5 id="paraCardTitle-1" class="card-title para-card-header mb-0 editable" contenteditable="true">Paragraph or Concept</h5><button type="button" id="btnAddCol-1" class="btn btn-outline-success btn-sm btn-add-component"><i class="fas fa-plus"></i></i></button></div><p id="paraCardBody-1" class="card-text para-card-body editable" contenteditable="true">Write a simple sentence describing the concept you want to explore</p><div class="d-flex flex-row justify-content-center"><button type="button" id="btnAddRow-1" class="btn btn-outline-success btn-sm px-2 btn-add-component btn-add-row"><i class="fas fa-plus"></i></button><button type="button" id="btnRemovePara-1" class="btn btn-outline-secondary btn-sm px-2 btn-remove-component" data-toggle-child="1"><i class="fas fa-minus"></i></button></div><div class="flex-row justify-content-center d-none"><button type="button" id="btnRemoveParaConfirm-1" class="btn btn-outline-danger btn-sm px-2 btn-confirm-remove-component">Confirm Deletion</button><button type="button" id="btnRemoveParaCancel-1" class="btn btn-outline-success btn-sm px-2 btn-cancel-remove-component">Cancel</button></div></div></div>'
    }
]

function cloneEmptyAppendElement(elToClone, parent){
    siblingOrParent = parent || elToClone;
    var elClone = elToClone.clone(true);
    elClone.empty();
    if(!parent){
        siblingOrParent.before(elClone);
    } else {
        siblingOrParent.append(elClone);
    }
    return elClone;
}

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

function toggleClassesUponTest(element, test, classArr){
    if(test){
        //console.log('post-test: ', element, classArr)
        classArr.forEach(function(cl){
            element.classList.toggle(cl);
        });
    };
};