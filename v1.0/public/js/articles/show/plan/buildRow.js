function handlerRowAddButton(rowAddButton){
    rowAddButton.on('click', function(e){
        // insert new row
        newRow = insertRow($(this).closest('.row'));
        // set new row as active
        setElementAsActive(newRow, '.app-row');
        // insert new card in row NOTE: Once menu is up and running this may not be necessary
        newRow.find('.card-add-button').click();
        handlerRowActivator(newRow.find('.row-activator'));
        // bypass default click behaviour
        return false;
    });
};

function insertRow(clickedRow){
    // identify preceding row
    var lastRowIndex = clickedRow.prev().attr('data-row-index');
    // insert new row before clicked row
    insertedRow = clickedRow.before(rowHTML).prev();
    // update attributes
    newRowIndex = String(Number(lastRowIndex) + 1)
    insertedRow.attr('data-row-index', newRowIndex);
    insertedRow.attr('id', 'appRow-' + newRowIndex);
    // update row number to be roman numerals
    updateRowNum(insertedRow);
    // add handler for card-add-button
    handlerCardAddButton(insertedRow.find('.card-add-button'));
    return insertedRow;
};

function updateRowNum(rowEl){
    rowEl.find('.app-row-number').text(romanize(rowEl.data('rowIndex')));
};

function romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
        roman = '',
        i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
};