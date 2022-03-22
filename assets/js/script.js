let containerEl = $("section.container");
let currentDateEl = $("#currentDay");
let saveBtnEl = $(".saveBtn");
let taskDescriptionEl = $(".description");
let savedTasks = [];
let todaysDate = Date();

// shows current date and tasks
let currentDateTasks = function () {
    todaysDate = Date();
    let day = dateFns.getDay(todaysDate);
    let formattedDate = dateFns.format(todaysDate, "MMMM DD, YYYY")
    currentDateEl.html(todaysDate);

    //TURN BACK ON BEFORE THE END
    //currentTasks();
    console.log(todaysDate);
    console.log(formattedDate);
}

//COME BACK TO THIS 
// formats task zones based on time of day
let timeFormatShader = function (date) {

}

// state support for saving task
let saveTask = function () {
    let taskEl = $(this).siblings(".description-pane").children(".description");
    let task = taskEl.text();
    let taskId = taskEl.attr("data-timeslot");

    let saveTaskObj = {
        task: task,
        id: taskId
    };

    //check if local storage contains same id as current session !!!!!!!
    savedTasks.push(saveTaskObj);
    localStorage.setItem("taskpersist", JSON.stringify(savedTasks));
    console.log("Task has been saved!");
}

// keeps tasks on page (persists)
let currentTasks = function() {
    let listTasksString = localStorage.getItem("taskpersist");
    let listTasks = JSON.parse(listTasksString);
    if (listTasks) {
        for (let a = 0; a < listTasks.length; a++) {
            let tasks = listTasks[a];

            for (let b = 0; b < taskDescriptionEl.length; b++) {
                let description = $(taskDescriptionEl[b]);

                if (description.attr("data-timeslot") == tasks.id) {
                    description.html(tasks.task);
                } 
            }
        }
    }
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
    textAreaEl.addClass("col-10");
    pChildEl.replaceWith(textAreaEl);
    textAreaEl.focus();
    
    // set customize state to default display text
    textAreaEl.on("blur", function () {
        let taskText = textAreaEl.val();
        textAreaEl.replaceWith(pChildEl);
        pChildEl.text(taskText);
    });
}
}


$(document).ready(currentDateTasks);
containerEl.on("click", customizeTask);
saveBtnEl.on("click", saveTask);
