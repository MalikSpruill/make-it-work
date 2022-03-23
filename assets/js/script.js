let containerEl = $("section.container");
let currentDateEl = $("#currentDay");
let saveBtnEl = $(".saveBtn");
let taskDescriptionEl = $(".description");
let ptimeEl = $(".hour");
let savedTasks = [];
let todaysDate = Date();


// shows current date and tasks
let currentDateTasks = function () {
    

    todaysDate = Date();
    let currentDay = todaysDate.split(" ");
    currentDay.length = 1;
    currentDay = currentDay[0];

    //resets saved tasks everyday
    if (localStorage.key("day")) {
        let storedDay = JSON.parse(localStorage.getItem("day"));
        if (storedDay !== currentDay) {
            localStorage.clear();
        }
    }
    else {
        localStorage.setItem("day", JSON.stringify(currentDay));
    }

    let formattedDate = dateFns.format(todaysDate, "MM/DD/YYYY hh:mm a")
    let formattedTime = formattedDate.split(" ")[1];
    let amPm = formattedDate.split(" ")[2];

    currentDateEl.html(`${currentDay}  ${formattedDate}`);

    currentTasks();
    timeFormatShader(formattedTime, amPm);
}


// formats task zones based on time of day
let timeFormatShader = function (currentTime, amPm) {
    for (let i = 0; i < ptimeEl.length; i++) {
        let pElement = $(ptimeEl[i]);
        let workHours = $(ptimeEl[i]).html();

        if (parseInt(currentTime) < parseInt(workHours) && workHours.includes(amPm)) {
            pElement.next().addClass("future").removeClass("past present");

            if (parseInt(workHours) == 12) {
                pElement.next().addClass("past").removeClass("present future");
             } 
        }
        else if (parseInt(currentTime) == 12 && parseInt(currentTime) > parseInt(workHours) && workHours.includes(amPm)) {
             
            pElement.next().addClass("future").removeClass("past present");
        }
        else if (parseInt(currentTime) > parseInt(workHours) && workHours.includes(amPm)) {
            pElement.next().addClass("past").removeClass("present future");
        }
        else if (parseInt(currentTime) == parseInt(workHours) && workHours.includes(amPm)) {
            pElement.next().addClass("present").removeClass("past future");
        }
        else {
            pElement.next().addClass("past").removeClass("present future");
        }
    }
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

    savedTasks.push(saveTaskObj);
    localStorage.setItem("taskpersist", JSON.stringify(savedTasks));
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

    // captures description-pane class child element and data
    if (selectedElementEl.hasClass("description-pane")) {
    let pChildEl = selectedElementEl.children();

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


