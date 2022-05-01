function createItem() {
    let input = document.getElementsByClassName('todo-list-input')[0];
    let itemValue = input.value; 

    if (itemValue) {
        let todoList = document.getElementsByClassName('todo-list')[0];
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
    }
}

function createCompleteButton() {
    let button = document.createElement('button');
    let icon = document.createElement('i');
    
    button.classList.add('complete-button');
    icon.classList.add('fa-solid', 'fa-check');
    button.append(icon);

    return button;
}

function createRemoveButton() {
    let button = document.createElement('button');
    let icon = document.createElement('i');
    
    button.classList.add('remove-button');
    icon.classList.add('fa-solid', 'fa-xmark');
    button.append(icon);

    return button;
}