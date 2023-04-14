import * as elementLogic from "./elementLogic.js"

// GLOBAL VARIABLES
let rowID = 0;

/**
 * Recreates the todo list in the DOM by grabbing the contents of the LocalStorage,
 * and using that information to recreate the items.
 */
 function recreateTodoList() {
    let itemList = elementLogic.getItemList();
    let todoListElement = document.getElementsByClassName('todo-list-container')[0];
    
    for (let i = 0; i < itemList.length; i++) {
        let itemElement = document.createElement('li');
        let itemNameElement = document.createElement('span');
        let selectElement = createPrioritySelect(rowID);
        let itemOptions = document.createElement('div');
        let completeButtonElement = createCompleteButton(rowID);
        let removeButtonElement = createRemoveButton(rowID); 
        let deadlineElement = createDeadlineInput(rowID);
        let deadlineInputElement = deadlineElement.getElementsByTagName("input")[0];
        let item = itemList[i];

        if (item.completeState) {
            itemElement.classList.add('item-completed');
            itemNameElement.classList.add('strike-through');
        }

        itemNameElement.classList.add('todo-list-item-name');
        itemNameElement.append(document.createTextNode(item.name));

        itemOptions.classList.add('item-options');
        itemOptions.append(deadlineElement, selectElement,completeButtonElement, 
            removeButtonElement);

        selectElement.value = item.priority;

        switch(item.priority) {
            case "1":
                selectElement.classList.add("priority-one");
            break;
            case "2":
                selectElement.classList.add("priority-two");
            break;
            case "3":
                selectElement.classList.add("priority-three");
            break;
        }

        deadlineInputElement.value = item.deadlineDate === null ? "" : item.deadlineDate
        elementLogic.changeDateDisplay(new Date(item.deadlineDate), deadlineInputElement);
        
        itemElement.classList.add('todo-list-item');
        itemElement.append(itemNameElement, itemOptions);

        todoListElement.append(itemElement);
        rowID += 1;
    }  
}

/**
 * Creates a new todo item from the input text.
 * Creating the title, complete button, and remove button.
 */
 function createItem() {
    let inputElement = document.getElementsByClassName('todo-list-input')[0];
    let itemName = inputElement.value;
    let itemList = elementLogic.getItemList();

    if (itemName) {
        let todoListElement = document.getElementsByClassName('todo-list-container')[0];
        let itemElement = document.createElement('li');
        let itemNameElement = document.createElement('span');
        let completeButtonElement = createCompleteButton(rowID);
        let removeButtonElement = createRemoveButton(rowID); 
        let selectElement = createPrioritySelect(rowID);
        let deadlineElement = createDeadlineInput(rowID);
        let itemOptions = document.createElement('div');

        itemNameElement.classList.add('todo-list-item-name');
        itemNameElement.append(document.createTextNode(inputElement.value))

        // Remove text from the input
        inputElement.value = ''; 

        itemOptions.classList.add('item-options');
        itemOptions.append(deadlineElement, selectElement, completeButtonElement, 
            removeButtonElement);

        itemElement.classList.add('todo-list-item');
        itemElement.append(itemNameElement, itemOptions);

        todoListElement.append(itemElement);

        itemList.push({'name': itemName, 'completeState': false, 'priority': selectElement.value});
        localStorage.setItem('itemList', JSON.stringify(itemList));
        rowID += 1;
    }
}

/**
 * Creates the priority select option 
 * 
 * @returns The select element with the change priority functionality
 */
function createPrioritySelect(itemID) {
    let selectElement = document.createElement('select');
    let selectPriority = document.createElement('option');
    let priorityOneElement = document.createElement('option');
    let priorityTwoElement = document.createElement('option');
    let priorityThreeElement = document.createElement('option');

    selectPriority.append(document.createTextNode('Please select a priority ...'));
    priorityOneElement.append(document.createTextNode('High'));
    priorityTwoElement.append(document.createTextNode('Medium'));
    priorityThreeElement.append(document.createTextNode('Low'));

    selectPriority.value = "no-value";
    selectPriority.selected = "selected";
    priorityOneElement.value = "3";
    priorityTwoElement.value = "2";
    priorityThreeElement.value = "1";

    selectElement.classList.add("priority");
    selectElement.id = itemID;

    selectElement.onchange = function(e) {
        elementLogic.changePriority(e, this.id);
    }

    selectElement.append(selectPriority, priorityOneElement, priorityTwoElement, 
        priorityThreeElement);

    return selectElement;
}

/**
 * Creates a remove button
 * 
 * @returns Button element with the remove functionality
 */
function createRemoveButton(itemID) {
    let buttonElement = document.createElement('button');
    let iconElement = document.createElement('i');
    
    buttonElement.classList.add('remove-button');
    iconElement.classList.add('fa-solid', 'fa-xmark');
    buttonElement.append(iconElement);
    buttonElement.id = itemID;

    buttonElement.onclick = function(e) {
        elementLogic.removeItem(this.id);
        rowID -= 1;
    }

    return buttonElement;
}

/**
 * Creates a complete button
 * 
 * @returns Button element with the complete functionality
 */
function createCompleteButton(itemID) {
    let buttonElement = document.createElement('button');
    let iconElement = document.createElement('i');
    
    buttonElement.classList.add('complete-button');
    iconElement.classList.add('fa-solid', 'fa-check');
    buttonElement.append(iconElement);
    buttonElement.id = itemID;

    // When creating an event, we need to assign a nameless
    // function to the event to call the logic we want
    buttonElement.onclick = function(e) {
        elementLogic.completeItem(this.id);
    }

    return buttonElement;
}

function createDeadlineInput(itemID) {
    let deadlineInput = document.createElement('input');
    deadlineInput.type = 'datetime-local';
    deadlineInput.id = itemID;
    let deadlineContainer = document.createElement('figure');
    let deadlineTitle = document.createElement('figcaption');

    deadlineInput.onchange = function(e) {
        elementLogic.checkItemDeadline(e, this.id);
    }

    deadlineTitle.innerText = 'Task Deadline'
    deadlineContainer.append(deadlineTitle, deadlineInput); 

    return deadlineContainer;
}

export { recreateTodoList, createItem  };
export { getItemList } from './elementLogic.js'
