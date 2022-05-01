// GLOBAL VARIABLES
let itemList = [];

/**
 * Creates a new todo item from the input text.
 * Creating the title, complete button, and remove button.
 */
function createItem() {
    let input = document.getElementsByClassName('todo-list-input')[0];
    let itemValue = input.value; 

    if (itemValue) {
        let todoList = document.getElementsByClassName('todo-list-container')[0];
        let item = document.createElement('li');

        let itemName = document.createElement('span');
        itemName.classList.add('todo-list-item-name');
        itemName.append(document.createTextNode(itemValue))

        let completeButton = createCompleteButton();
        let removeButton = createRemoveButton(); 

        // Remove text from the input
        input.value = ''; 

        item.classList.add('todo-list-item');
        item.append(itemName, completeButton, removeButton);

        todoList.append(item);
        itemList.push(item);
    }
}

/**
 * Sets the display of an item to the complete state
 * 
 * @param Number index  The index of the item we're changing
 */
function completeItem(index) {
    let item = itemList[index];
    let itemName = item.getElementsByTagName('span')[0];

    if (itemName.classList.contains('strike-through')) {
        itemName.classList.remove('strike-through');
        item.classList.remove('item-completed');
    } else {
        itemName.classList.add('strike-through');
        item.classList.add('item-completed');
    }
}

/**
 * Removes the item from the DOM and itemList
 * 
 * @param Number index  The index of the item we're removing
 *                      from the todo list
 */
function removeItem(index) {
    itemList[index].remove();

    itemList.splice(index, 1);

    for (let i = 0; i < itemList.length; i++) {
        let buttons = itemList[i].getElementsByTagName('button');
        buttons[0].id = i;
        buttons[1].id = i;
    }
}

/**
 * Creates a complete button
 * 
 * @returns Button element with the complete functionality
 */
function createCompleteButton() {
    let button = document.createElement('button');
    let icon = document.createElement('i');
    
    button.classList.add('complete-button');
    icon.classList.add('fa-solid', 'fa-check');
    button.append(icon);
    button.id = itemList.length;

    // When creating an event, we need to assign a nameless
    // function to the event to call the logic we want
    button.onclick = function(e) {
        completeItem(this.id);
    }

    return button;
}

/**
 * Creates a remove button
 * 
 * @returns Button element with the remove functionality
 */
function createRemoveButton() {
    let button = document.createElement('button');
    let icon = document.createElement('i');
    
    button.classList.add('remove-button');
    icon.classList.add('fa-solid', 'fa-xmark');
    button.append(icon);
    button.id = itemList.length;

    button.onclick = function(e) {
        removeItem(this.id);
    }

    return button;
}
