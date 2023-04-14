/**
 * Sets the display of an item to the complete state
 * 
 * @param Number index  The index of the item we're changing
 */
function completeItem(index) {
    let todoListElement = document.getElementsByClassName('todo-list-container')[0];
    let itemElement = todoListElement.getElementsByTagName('li')[index];
    let itemNameElement = itemElement.getElementsByTagName('span')[0];
    let itemList = getItemList();
    let item = itemList[index];

    if (itemNameElement.classList.contains('strike-through')) {
        itemNameElement.classList.remove('strike-through');
        itemElement.classList.remove('item-completed');
        item.completeState = false;
    } else {
        itemNameElement.classList.add('strike-through');
        itemElement.classList.add('item-completed');
        item.completeState = true;
    }

    localStorage.setItem('itemList',  JSON.stringify(itemList));
}

/**
 * Removes the item from the DOM and itemList
 * 
 * @param Number index  The index of the item we're removing
 *                      from the todo list
 */
function removeItem(index) {
    let todoListElement = document.getElementsByClassName('todo-list-container')[0];
    let itemElement = todoListElement.getElementsByTagName('li')[index];
    let itemList = getItemList();
    
    // Index will be returned as a string, we need to convert it to a int to use 
    // splice
    itemList.splice(parseInt(index), 1);
    itemElement.remove();

    for (let i = 0; i < itemList.length; i++) {
        itemElement = todoListElement.getElementsByTagName('li')[i];
        let buttonElements = itemElement.getElementsByTagName('button');
        let priorityElement = itemElement.getElementsByTagName('select');
        priorityElement[0].id = i;
        buttonElements[0].id = i;
        buttonElements[1].id = i;
    }

    localStorage.setItem('itemList', JSON.stringify(itemList));
}

/**
 * Changes the item select value to the priority selected 
 * by the user
 * 
 * @param {*} e Event data
 * @param {*} index The index we're changing
 */
function changePriority(e, index) {
    // Get value from event
    // Add or remove class depending on what value we have.
    let priorityElement = document.getElementsByClassName("priority")[index];
    let itemList = getItemList();
    let item = itemList[index];
    let value = e.target.value;

    switch (value) {
        case "no-value":
            // Clear all classes
            priorityElement.classList.remove("priority-one", "priority-two", "priority-three");
        break;
        case "1":
            // Low  priority
            priorityElement.classList.add("priority-one");
            priorityElement.classList.remove("priority-two", "priority-three");
        break;
        case "2":
            // Medium priority
            priorityElement.classList.add("priority-two");
            priorityElement.classList.remove("priority-one", "priority-three");
        break;
        case "3":
            // High priority
            priorityElement.classList.add("priority-three");
            priorityElement.classList.remove("priority-one", "priority-two");
        break;
    }

    item.priority = value; 
    localStorage.setItem('itemList', JSON.stringify(itemList));
}

function checkItemDeadline(e, index) {
    let todoListElement = document.getElementsByClassName('todo-list-container')[0];
    let itemElement = todoListElement.getElementsByTagName('li')[index];
    let deadlineInput = itemElement.getElementsByTagName('input')[0];
    let deadlineDate = new Date(deadlineInput.value);
    let itemList = getItemList();
    let item = itemList[index];

    changeDateDisplay(deadlineDate, deadlineInput);

    console.log(JSON.stringify(deadlineDate));

    item.deadlineDate = deadlineInput.value;
    localStorage.setItem('itemList', JSON.stringify(itemList));
}

function checkDatePassed(date) {
    let currentDate = new Date();
    
    if (date < currentDate) {
        return true;
    } else {
        return false;
    }
}

function checkIfOneDayBefore(date) {
    let currentDate = new Date();

    let dayBefore = new Date(date.getTime());
    dayBefore.setDate(date.getDate() - 1);
   
    if (currentDate > dayBefore && currentDate < date) {
        return true;
    } else {
        return false;
    }
}

function changeDateDisplay(date, dateInput) {
    if (checkDatePassed(date)) {
        dateInput.style.backgroundColor = "red";
    } else if (checkIfOneDayBefore(date)) {
        dateInput.style.backgroundColor = "yellow";
    }
    else {
        if (dateInput.value !== "") {
            dateInput.style.backgroundColor = "greenyellow";
        }   
    }
}

function getItemList() {
    return JSON.parse(localStorage.getItem("itemList") || "[]");
}

export { completeItem, removeItem, changePriority, checkItemDeadline, getItemList, changeDateDisplay }
