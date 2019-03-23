const cards = {
    standard: {
        html: "<div class='col-4 col-app-card row-activator'><div class='card card-component card-component-standard'><div class='card-body p-2'><div class='row'><div class='col-10 d-stretch pr-0'><h6 class='card-title my-1 editable' contenteditable='true'></h6><div class='card-text mb-1 editable' contenteditable='true'></div></div><div class='col-2 pl-0 text-center' style='padding-right: 10px'><i class='fas fa-bars '></i></div></div></div></div></div>",
        content: {
            title: {
                class: "card-title",
                text: "Card Title",
                tooltip: "Click to add a suitable title for this card"
            },
            body: {
                content: [{
                    class: "card-text",
                    text: "Add a few notes to expand on the point you want to discuss in this section"
                }],
                tooltip: "Click to edit"
            }
        }
    }
}