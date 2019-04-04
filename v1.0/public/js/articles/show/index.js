function handlerAppTab(tabElementArr){
    // console.log('tabElementArr: ', tabElementArr)
    tabElementArr.each(function(i, tabEl){
        // console.log('tabEl: ', tabEl)
        $(this).on('click', function(tabEl){
            if(!$(this).hasClass('active')){
                tabElementArr.each(function(i,tabElForToggle){
                    tabElForToggle.classList.toggle('active');
                });
            }
        });
    });
}

function setElementAsActive(elToActivate, targetElSelector){
    var targetEls = $('#appBody').find(targetElSelector);
    targetEls.each(function(i, targetEl){
        if(targetEl.classList.contains('active')){
            targetEl.classList.remove('active');
        }
    });
    if(!elToActivate.hasClass('active')){
        elToActivate.focus().addClass('active');
    }
}

// function initializeCardData()