var cards = {
    standard: {
        html: "<div class='col-4 col-app-card row-activator'><div class='card card-component card-component-standard'><div class='card-body p-2'><div class='row'><div class='col-10 d-stretch pr-0'><h6 class='card-title my-1 editable' contenteditable='true'></h6><div class='card-text mb-1 editable' contenteditable='true'></div></div><div class='col-2 pl-0 text-center' style='padding-right: 10px'><</div></div></div></div></div>",
        title: {
            key: "card-title",
            text: "Paragraph Summary",
            tooltip: "Click to add a suitable title for this card"
        },
        body: {
            content: [{
                key: "card-text",
                text: "Write a simple sentence to describe the main point of this paragraph"
            }],
            tooltip: "Click to edit"
        }
    }
}

var rowHTML = '<div id="appRow-1" class="row app-row">'
    + '<div class="col-1 d-flex justify-content-center align-items-center row-number-wrapper row-activator">'
    + '<div class="app-row-number text-center">'
    + '</div></div>'
    + '<div class="col-10 p-0"><div class="row m-0">'
    + '<!-- inner row for card-components -->'
    + '<!-- card-add-button col -->'
    + '<div class="col-4 col-add-button">'
    + '<div class="card add-button">'
    + '<div class="card-body d-flex align-items-center justify-content-center">'
    + '<a href="#" class="card-add-button row-activator">'
    + '<i class="fas fa-plus-circle">'
    + '</i></a></div></div></div></div></div>'
    + '<div class="col-1 p-0">'
    + '</div></div>'