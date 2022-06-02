import * as elementCreate from "./modules/elementCreate.js"
import { getItemList }  from "./modules/elementCreate.js"

document.addEventListener("DOMContentLoaded", function(e) {
    // Add the content to the todoList container
    if (getItemList()) {
        elementCreate.recreateTodoList();
    }
});

// Bind item create to dom element
document.getElementsByClassName('add-button')[0].addEventListener("click", function(e) {
    elementCreate.createItem();
})
