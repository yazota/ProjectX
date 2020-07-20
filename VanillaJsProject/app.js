//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //clear todo input values
    todoInput.value ="";

}

function deleteCheck(event){
    const item = event.target;
    
    
    //delete todo
    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
               todo.remove();
        });
    }

    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
              todo.style.display = "flex";
              break;
            case "completed":
                if(todo.classList.contains("completed")){
                   todo.style.display = "flex";
                }else{
                   todo.style.display = "none"; 
                }
              break;
            case "uncompleted":
                if(todo.classList.contains('completed') === false){
                    console.log(todo);
                    todo.style.display = "flex";
                }else{
                  todo.style.display = "none";
                }
              break;  
        }
    });

}

//flagged func
function saveLocalTodos(todo){
    //check--hey do i already have thing in there?
    let todos;
    if(localStorage.getItem("todos") === null){
       todos = [];
    }else{
        todos =JSON.parse(localStorage.getItem('todos'));

    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    
}


//flagged func
function getTodos(){
//check--hey do i already have thing in there?
   let todos;
   if(localStorage.getItem("todos") === null){
     todos = [];
   }else{
    todos =JSON.parse(localStorage.getItem('todos'));

        }    

    todos.forEach(function())

}