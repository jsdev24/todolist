
let input = document.getElementById("taskInput");
let list = document.getElementById("list");
let pendingTask = document.getElementById("pending");
let modal = document.getElementById("myModal");
let editTaskInput = document.getElementById("editTaskInput");
let allTask = JSON.parse(localStorage.getItem("tasks")) || [];



input.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        let inputLength = input.value.trim().length;
        if (inputLength != 0) {
            createTaskObj(input.value);
            input.value = "";
        }
    }
})


let createTaskObj = task => {
    let taskObj = {
        id: generateId(),
        taskName: task,
        isComplete: false
    }
    allTask.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(allTask));
    updateDOM();
}


let generateId = () => {
    let chars = "0123456789";
    let uniqueId = "";
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * chars.length);
        uniqueId += chars[index];
    }
    return uniqueId;
}


let updateDOM = () => {
    list.innerHTML = "";
    let taskCount = 0;

    allTask.forEach(element => {
        let createListElement = document.createElement("li");
        createListElement.setAttribute("data-id", element.id);
        let createListItem;

        if (element.isComplete == true) {
            createListItem = `<span onclick="updateTaskStatus(this)" style="color: gray; text-decoration: line-through;">${element.taskName}</span>`;
        } else {
            createListItem = `<span onclick="updateTaskStatus(this)">${element.taskName}</span>`;
        }

        createListItem += `<img onclick="deleteTask(this)" src="img/deleteBtn.png"/>`;
        createListItem += `<img onclick="editTask(this)" src="img/editBtn.png"/>`;
        createListElement.innerHTML = createListItem;
        list.appendChild(createListElement);

        if (element.isComplete == false) {
            taskCount++;
        }
    });

    pendingTask.innerHTML = taskCount + " Pending Task";
}


let updateTaskStatus = element => {
    let getTaskId = element.parentNode.getAttribute("data-id");
    allTask.forEach(item => {
        if (item.id == getTaskId) {
            if (item.isComplete == false) {
                item.isComplete = true;
            } else {
                item.isComplete = false;
            }

            localStorage.setItem("tasks", JSON.stringify(allTask));
            updateDOM();
        }
    })
}

let deleteTask = element => {
    let getTaskId = element.parentNode.getAttribute("data-id");

    allTask.forEach((item, index) => {
        if (item.id == getTaskId) {
            allTask.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(allTask));
            updateDOM();
        }
    })

}

let editTask = element => {
    let getTaskId = element.parentNode.getAttribute("data-id");

    allTask.forEach(item => {
        if (item.id == getTaskId) {
            let taskName = item.taskName;
            edit(taskName, getTaskId);
        }
    })

}

let edit = (taskname, getTaskId) => {
    modal.style.display = "block";
    editTaskInput.value = taskname;

    document.getElementsByClassName("close")[0].addEventListener("click", () => {
        modal.style.display = "none";
    })

    document.getElementById("updateBtn").addEventListener("click", () => {
        if (editTaskInput.value.trim().length > 0) {
            allTask.forEach(item => {
                if (item.id == getTaskId) {
                    item.taskName = editTaskInput.value;
                    localStorage.setItem("tasks", JSON.stringify(allTask));
                    updateDOM();
                }
            })
        }

        modal.style.display = "none";
    })
}


window.onload = updateDOM;
