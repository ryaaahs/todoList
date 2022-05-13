// GLOBAL VARIABLES
let itemList = JSON.parse(localStorage.getItem("itemList") || "[]");
let buttonID = 0;

document.addEventListener("DOMContentLoaded", function(e) {
    // Add the content to the todoList
    if (itemList) {
        recreateTodoList();
    }
});

/**
 * Recreates the todo list in the DOM by grabbing the contents of the LocalStorage,
 * and using that information to recreate the items.
 */
function recreateTodoList() {

    let todoListElement = document.getElementsByClassName('todo-list-container')[0];
    
    for (let i = 0; i < itemList.length; i++) {
        let itemElement = document.createElement('li');
        let itemNameElement = document.createElement('span');
        let selectElement = createPrioritySelect();
        let itemOptions = document.createElement('div');
        let completeButtonElement = createCompleteButton();
        let removeButtonElement = createRemoveButton(); 
        let item = itemList[i];

        if (item.completeState) {
            itemElement.classList.add('item-completed');
            itemNameElement.classList.add('strike-through');
        }

        itemNameElement.classList.add('todo-list-item-name');
        itemNameElement.append(document.createTextNode(item.name));

        itemOptions.classList.add('item-options');
        itemOptions.append(selectElement,completeButtonElement, 
            removeButtonElement);

        selectElement.value = item.priority;

        switch(item.priority) {
            case "1":
                // Clear all classes
                selectElement.classList.add("priority-one");
            break;
            case "2":
                // Clear all classes
                selectElement.classList.add("priority-two");
            break;
            case "3":
                // Clear all classes
                selectElement.classList.add("priority-three");
            break;
        }
        
        itemElement.classList.add('todo-list-item');
        itemElement.append(itemNameElement, itemOptions);

        todoListElement.append(itemElement);
        buttonID++;
    }
    
}

/**
 * Creates a new todo item from the input text.
 * Creating the title, complete button, and remove button.
 */
function createItem() {
    let inputElement = document.getElementsByClassName('todo-list-input')[0];
    let itemName = inputElement.value;

    if (itemName) {
        let todoListElement = document.getElementsByClassName('todo-list-container')[0];
        let itemElement = document.createElement('li');
        let itemNameElement = document.createElement('span');
        let completeButtonElement = createCompleteButton();
        let removeButtonElement = createRemoveButton(); 
        let selectElement = createPrioritySelect();
        let itemOptions = document.createElement('div');

        itemNameElement.classList.add('todo-list-item-name');
        itemNameElement.append(document.createTextNode(inputElement.value))

        // Remove text from the input
        inputElement.value = ''; 

        itemOptions.classList.add('item-options');
        itemOptions.append(selectElement,completeButtonElement, 
            removeButtonElement);

        itemElement.classList.add('todo-list-item');
        itemElement.append(itemNameElement, itemOptions);

        todoListElement.append(itemElement);

        itemList.push({'name': itemName, 'completeState': false});
        localStorage.setItem('itemList', JSON.stringify(itemList));
        buttonID++;
    }
}

/**
 * Sets the display of an item to the complete state
 * 
 * @param Number index  The index of the item we're changing
 */
function completeItem(index) {
    let todoListElement = document.getElementsByClassName('todo-list-container')[0];
    let itemElement = todoListElement.getElementsByTagName('li')[index];
    let itemNameElement = itemElement.getElementsByTagName('span')[0];
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
    itemElement.remove();

    itemList.splice(index, 1);

    for (let i = 0; i < itemList.length; i++) {
        itemElement = todoListElement.getElementsByTagName('li')[i];
        let buttonElements = itemElement.getElementsByTagName('button');
        buttonElements[0].id = i;
        buttonElements[1].id = i;

    }

    buttonID--;
    localStorage.setItem('itemList', JSON.stringify(itemList));
}

/**
 * Creates a complete button
 * 
 * @returns Button element with the complete functionality
 */
function createCompleteButton() {
    let buttonElement = document.createElement('button');
    let iconElement = document.createElement('i');
    
    buttonElement.classList.add('complete-button');
    iconElement.classList.add('fa-solid', 'fa-check');
    buttonElement.append(iconElement);
    buttonElement.id = buttonID;

    // When creating an event, we need to assign a nameless
    // function to the event to call the logic we want
    buttonElement.onclick = function(e) {
        completeItem(this.id);
    }

    return buttonElement;
}

/**
 * Creates a remove button
 * 
 * @returns Button element with the remove functionality
 */
function createRemoveButton() {
    let buttonElement = document.createElement('button');
    let iconElement = document.createElement('i');
    
    buttonElement.classList.add('remove-button');
    iconElement.classList.add('fa-solid', 'fa-xmark');
    buttonElement.append(iconElement);
    buttonElement.id = buttonID;

    buttonElement.onclick = function(e) {
        removeItem(this.id);
    }

    return buttonElement;
}

/**
 * Creates the priority select option 
 * 
 * @returns The select element with the change priority functionality
 */
 function createPrioritySelect() {
    let selectElement = document.createElement('select');
    let selectPriority = document.createElement('option');
    let priorityOneElement = document.createElement('option');
    let priorityTwoElement = document.createElement('option');
    let priorityThreeElement = document.createElement('option');

    selectPriority.append(document.createTextNode('Please select a priority ...'));
    priorityOneElement.append(document.createTextNode('High'));
    priorityTwoElement.append(document.createTextNode('Medium'));
    priorityThreeElement.append(document.createTextNode('Low'));

    selectPriority.value = "";
    priorityOneElement.value = "3";
    priorityTwoElement.value = "2";
    priorityThreeElement.value = "1";

    selectElement.classList.add("priority");
    selectElement.id = buttonID;

    selectElement.onchange = function(e) {
        changePriority(e, this.id);
    }

    selectElement.append(selectPriority, priorityOneElement, priorityTwoElement, 
        priorityThreeElement);

    return selectElement;
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
    let item = itemList[index];
    let value = e.target.value;

    switch(value) {
        case "":
            // Clear all classes
            priorityElement.classList.remove("priority-one", "priority-two", "priority-three");
            item.priority = "";
        break;
        case "1":
            // Low  priority
            priorityElement.classList.add("priority-one");
            priorityElement.classList.remove("priority-two", "priority-three");
            item.priority = "1";
        break;
        case "2":
            // Medium priority
            priorityElement.classList.add("priority-two");
            priorityElement.classList.remove("priority-one", "priority-three");
            item.priority = "2";
        break;
        case "3":
            // High priority
            priorityElement.classList.add("priority-three");
            priorityElement.classList.remove("priority-one", "priority-two");
            item.priority = "3";
        break;
    }
    localStorage.setItem('itemList', JSON.stringify(itemList));
}
