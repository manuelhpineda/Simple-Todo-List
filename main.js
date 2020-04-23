//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-submit-btn');
const todoList = document.querySelector('.todo-list');
const body = document.querySelector('.body');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', validateForm);
todoList.addEventListener('click', checkMark);
todoList.addEventListener('click', deleteCheck);

//color variables
const colors = ['#22C18D', '#F4D03F', '#884EA0', '#5D6D7E', '#3498DB', '#34495E', '#D35400'];

//functions
window.onload = function () {
    colorPicker();
};

function colorPicker() {
    const arrLenght = colors.length;
    let num = Math.floor(Math.random() * arrLenght);
    body.style.background = colors[num];
}

function validateForm(e) {
    if (todoInput.value === "") {
        alert("Please fill the form")
        event.preventDefault();
    } else {
        addTodo(e);
    }
}

function addTodo(event) {
    event.preventDefault();

    // create li
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo');
    //create p inside the li
    const newTodo = document.createElement('p');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    //this puts the child p into the parent li
    todoLi.appendChild(newTodo);
    //Add to-do to local storage
    saveLocalTodos(todoInput.value);

    //Checks for mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoLi.appendChild(completeButton);
    //Checks for Delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoLi.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoLi);
    //clear to do input value
    todoInput.value = '';
}

function deleteCheck(e) {
    // console.log(e.target);
    const item = e.target;
    //DELETE to-do
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //this is the animation
        todo.classList.add('fall');
        removeLocaltodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    //CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function checkMark(e) {
    // console.log(e.target);
    const item = e.target;
    console.log(item);
    //DELETE to-do
    if (item.className === "trash-btn") {
        const todo = item.parentElement;
        //this is the animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    //CHECK MARK
    if (item.className === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function saveLocalTodos(todo) {
    //Check if there is a to-do already inside
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //Check if there is a to-do already inside
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // create li
        const todoLi = document.createElement('li');
        todoLi.classList.add('todo');
        //create p inside the li
        const newTodo = document.createElement('p');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        //this puts the child p into the parent li
        todoLi.appendChild(newTodo);

        //Checks for mark button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoLi.appendChild(completeButton);
        //CHecks for Delete button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoLi.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoLi);
        //clear to do input value
        todoInput.value = '';
    })
}

function removeLocaltodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}