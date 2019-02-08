var cards = {
    standard: {
        html: "<div class='col-4 col-app-card'><div class='card card-component-standard active'><div class='card-body p-2'><div class='row'><div class='col-10 d-stretch pr-0'><h6 class='card-title my-1 editable' contenteditable='true'></h6><div class='card-text mb-1 editable' contenteditable='true'></div></div><div class='col-2 pl-0 text-center' style='padding-right: 10px'><</div></div></div></div></div>",
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