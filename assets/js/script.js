let containerEl = $("section.container");
let currentDateEl = $("#currentDay");
let saveBtnEl = $(".saveBtn");
// let taskDescriptionEl = $(".description");
let todaysDate = Date();

// state support for saving task
let saveTask = function (event) {
    let selectedBtnEl = $(event.target);
    
    if (selectedBtnEl.hasClass(".saveBtn") {

    })


    /* let saveTaskObj = {
        task: task,
        id: id
    };

    localStorage.setItem("taskpersist", JSON.stringify(saveTaskObj));
    console.log("Task has been saved!"); */
}

// updates current date and time
let currentDateTime = function () {
    todaysDate = Date();
    currentDateEl.html(todaysDate);
}

// allows user to customize task 
let customizeTask = function(event) {
    let selectedElementEl = $(event.target);
    console.log(selectedElementEl);

    // captures description-pane class child element and data
    if (selectedElementEl.hasClass("description-pane")) {
    let pChildEl = selectedElementEl.children();
    console.log(pChildEl);
    let pChildData = pChildEl.attr("data-timeslot");
    console.log(pChildData);

    // makes schedule text customizable
    let textAreaEl = $("<textarea>");
    pChildEl.replaceWith(textAreaEl);
    textAreaEl.focus();
    
    // set customize state to default display text
    textAreaEl.on("blur", function () {
        let taskText = textAreaEl.val();
        console.log(taskText);
        textAreaEl.replaceWith(pChildEl);
        pChildEl.text(taskText);
        console.log(pChildEl.text());

    })
}
}


$(document).ready(currentDateTime);
containerEl.on("click", customizeTask);
saveBtnEl.on("click", saveTask);
