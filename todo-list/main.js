const addTodoButton = document.getElementById("add-todo-btn");
const addInput = document.getElementById("add-input");
const todoList = document.getElementById("todo-list");
const editFormWrapper = document.getElementById("edit-form-wrapper");
const editInput = document.getElementById("edit-input");
const editForm = document.getElementById("edit-form");
const alertText = document.querySelector(".alert-text");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const displayTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.classList = "todo-item";
    todoItem.innerHTML = `
             <span class='todo-text'>${todo}</span>
             <button type='button' class='todo-btn' id='edit-btn' data-index= '${index}' onclick='editTodo(this)'>
               <i class='fa fa-edit'></i>
             </button>
             <button type='button' class='todo-btn' id='delete-btn' data-index= '${index}' onclick='deleteTodo(this)'>
               <i class='fa fa-trash'></i>
             </button>
         `;
    todoList.appendChild(todoItem);
  });
  if (todos.length === 0) {
    alertText.classList.add("show-alert-text");
    alertText.textContent = "todo list is empty!";
  }
};
displayTodos();

addTodoButton.addEventListener("click", (e) => {
  e.preventDefault();
  const value = addInput.value.trim();
  if (value !== "") {
    todos.push(value);
    saveTodosToLocalStorage();
    displayTodos();
    addInput.value = "";
    alertText.classList.remove("show-alert-text");
  } else {
    alertText.classList.add("show-alert-text");
    alertText.textContent = "For God Sake Write Somthing 😔";
    alertText.classList.add("alert-animation");
    alertText.addEventListener("animationend", () => {
      alertText.classList.remove("alert-animation");
    });
  }
});

const deleteTodo = (btn) => {
  const index = btn.dataset.index;
  todos.splice(index, 1);
  saveTodosToLocalStorage();
  displayTodos();
};

const editTodo = (btn) => {
  const index = btn.dataset.index;
  editFormWrapper.classList.add("show-form");
  editInput.value = todos[index];
  editInput.dataset.index = index;
  editInput.focus();
};

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoIndex = editInput.dataset.index;
  editFormWrapper.classList.remove("show-form");
  todos[todoIndex] = editInput.value;
  if (editInput.value === "") {
    alertText.classList.add("show-alert-text");
    alertText.textContent = "edit input can't be empty";
    return;
  } else {
    alertText.classList.remove("show-alert-text");
  }
  saveTodosToLocalStorage();
  displayTodos();
});
editFormWrapper.addEventListener("click", (e) => {
  const id = e.target.getAttribute("id");
  if (id === "edit-form-wrapper") {
    editFormWrapper.classList.remove("show-form");
    editInput.value = "";
  }
});
