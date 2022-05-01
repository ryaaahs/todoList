let itemList = [];

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

function createCompleteButton() {
    let button = document.createElement('button');
    let icon = document.createElement('i');
    
    button.classList.add('complete-button');
    icon.classList.add('fa-solid', 'fa-check');
    button.append(icon);
    button.id = itemList.length;

    button.onclick = function(e) {
        completeItem(this.id);
    }

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
