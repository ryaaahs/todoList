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
 * Recreates the the todo list in the DOM by grabbing the contents of the LocalStorage,
 * and using that information to recreate the items.
 */
function recreateTodoList() {

    let todoListElement = document.getElementsByClassName('todo-list-container')[0];
    
    for (let i = 0; i < itemList.length; i++) {
        let itemElement = document.createElement('li');
        let itemNameElement = document.createElement('span');
        let completeButtonElement = createCompleteButton();
        let removeButtonElement = createRemoveButton(); 
        let item = itemList[i];

        if (item.completeState) {
            itemElement.classList.add('item-completed');
            itemNameElement.classList.add('strike-through');
        }

        itemNameElement.classList.add('todo-list-item-name');
        itemNameElement.append(document.createTextNode(item.name));

        itemElement.classList.add('todo-list-item');
        itemElement.append(itemNameElement, completeButtonElement, removeButtonElement);
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

        itemNameElement.classList.add('todo-list-item-name');
        itemNameElement.append(document.createTextNode(inputElement.value))

        // Remove text from the input
        inputElement.value = ''; 

        itemElement.classList.add('todo-list-item');
        itemElement.append(itemNameElement, completeButtonElement, removeButtonElement);

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
