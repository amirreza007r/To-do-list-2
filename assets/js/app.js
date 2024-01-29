// Get references to HTML elements
const inputBox = document.getElementById("input");
const listContainer = document.getElementById("list-container");
const endDateInput = document.getElementById("endDateInput");
const startDateInput = document.getElementById("startDateInput");
const myButton = document.getElementById("add-task-window");
const myPopup = document.getElementById("popup");

/**
 * Handles the input change event by updating the state of the add button based on the input text length.
 * @Author: amir
 * @Date: 2024-01-29 11:06:20
 */
function handleInputChange() {
    const addBtn = document.getElementById("add-btn");
    const inputText = inputBox.value.trim();

    if (inputText.length > 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

// Event listener for displaying the popup
myButton.addEventListener("click", function () {
    myPopup.classList.add("show");
});

// Event listener for closing the popup
closePopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
});

// Event listener to close the popup when clicking outside it
window.addEventListener("click", function (event) {
    if (event.target == myPopup) {
        myPopup.classList.remove("show");
    }
});

/**
 * Adds a task to the list with start and end dates.
 * @Author: flydreame
 * @Date: 2024-01-29 11:04:06
 * @Desc: Validates input and adds a task with timestamps and optional styling based on the current time.
 */
function addTask() {
    if (
        inputBox.value === "" ||
        endDateInput.value === "" ||
        startDateInput.value === ""
    ) {
        alert("Fill all the boxes");
    } else {
        const currentTime = new Date();
        const timestamp = `${currentTime.toLocaleDateString()}`;
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        let li = document.createElement("li");
        li.innerHTML = `${inputBox.value}  <div class="timestamp"><p>Start: ${startDateInput.value}</p><p> End: ${endDateInput.value}</p></div>`;
        listContainer.appendChild(li);

        if (currentTime >= startDate && currentTime <= endDate) {
            li.classList.add("active-task");
        } else if (currentTime < startDate || currentTime > endDate) {
            li.classList.add("inactive-task");
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    // Clear input values and reset button state
    inputBox.value = "";
    endDateInput.value = "";
    startDateInput.value = "";
    document.getElementById("add-btn").classList.remove("active");
    saveData();
}

/**
 * Handles key press events, triggering addTask() when Enter key is pressed.
 * @param {KeyboardEvent} event - The key press event.
 */
function handleKeyPress(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

// Event listener for list item clicks to toggle checked state
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

/**
 * Clears all tasks in the list.
 */
function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
    }
}

/**
 * Saves the current state of the list to local storage.
 */
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

/**
 * Displays tasks from local storage on page load.
 */
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Show tasks on page load
showTask();

/**
 * Filters tasks based on the specified filter.
 * @param {string} filter - The filter keyword ("ongoing", "completed", "activeTask", "inactiveTask").
 */
function filterTasks(filter) {
    const listItems = document.querySelectorAll("#list-container li");
    const filterButtons = document.querySelectorAll(".filter-section button");

    listItems.forEach((item) => {
        item.style.display = "block";

        switch (filter) {
            case "ongoing":
                if (item.classList.contains("checked")) {
                    item.style.display = "none";
                }
                break;
            case "completed":
                if (!item.classList.contains("checked")) {
                    item.style.display = "none";
                }
                break;
            case "activeTask":
                if (!item.classList.contains("active-task")) {
                    item.style.display = "none";
                }
                break;
            case "inactiveTask":
                if (!item.classList.contains("inactive-task")) {
                    item.style.display = "none";
                }
                break;
        }
    });

    // Remove the active class from all buttons
    filterButtons.forEach((button) => {
        button.classList.remove("active");
    });

    // Add the active class to the clicked button
    document.getElementById(`${filter}Btn`).classList.add("active");
}
