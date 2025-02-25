const template = document.querySelector("template");
const enterContentButton = document.querySelector(".enter-content-button");
const todo = document.querySelector(".todo");
const done = document.querySelector(".done");
const main = document.querySelector("main");
const todoContent = main.getElementsByClassName("todo-content");
const enterContentInput = document.querySelector(".enter-content-input");
const task0Todo = document.querySelector(".task0__todo");
const task0Done = document.querySelector(".task0__done");
const enterArea = document.querySelector(".enter");
const sideMenu = document.querySelector(".side-menu");
const todoScroll = todo.getBoundingClientRect();

window.addEventListener("load",function(){
   enterArea.style.height = this.window.innerHeight + "px";
   sideMenu.style.height = this.window.innerHeight - 90 + "px";
});

enterContentInput.addEventListener("keypress",function(e){
   if(e.keyCode === 13){
      enter();
   }
});
enterContentButton.addEventListener("click", enter);

function enter(){
   const enterContentInputValue = document.querySelector(".enter-content-input").value.trim();
   const cloneTodoContent = template.content.cloneNode(true);
   if(enterContentInputValue){
      cloneTodoContent.querySelector(".todo-content-header__input").value = enterContentInputValue;
      todo.appendChild(cloneTodoContent);
      const newTodoContent = todo.lastElementChild;
      const checkbox = newTodoContent.querySelector(".todo-content-header__checkbox");
      check(checkbox);
      const trashbox = newTodoContent.querySelector(".todo-content-header__trash");
      trash(trashbox);
      const editbox = newTodoContent.querySelector(".todo-content-header__edit");
      edit(editbox);
      document.querySelector(".enter-content-input").value = "";
      task0();
   }
};
function trash(trashbox){
   trashbox.addEventListener("click",function(){
      const todoContentTrash = trashbox.closest(".todo-content");
      todoContentTrash.remove();
      task0();
   });
}
function edit(editbox){
   editbox.addEventListener("click",function(){
      const todoContentTrash = editbox.closest(".todo-content");
      const todoContentBody = todoContentTrash.querySelector(".todo-content-body");
      if(todoContentBody.classList.contains("todo-content-body__clicked")){
         todoContentBody.classList.remove("todo-content-body__clicked");
      }else{
         todoContentBody.classList.add("todo-content-body__clicked");
      }
   });
}
function check(checkbox){
   checkbox.addEventListener("click", function () {
      const todoContentCheck = checkbox.closest(".todo-content");
      if(todoContentCheck.classList.contains("done-content")){
         todoContentCheck.classList.remove("done-content");
         todo.appendChild(todoContentCheck);
      }else{
         todoContentCheck.classList.add("done-content");
         done.appendChild(todoContentCheck);
      }
      task0();
   });
}
function task0(){
   if(todo.querySelector(".todo-content")){
      task0Todo.classList.add("task-not0");
   }else{
      task0Todo.classList.remove("task-not0");
   }
   if(done.querySelector(".todo-content")){
      task0Done.classList.add("task-not0");
   }else{
      task0Done.classList.remove("task-not0");
   }
}
const enterContent = document.querySelector(".enter-content");
const enterContentScroll = enterContent.getBoundingClientRect();
document.addEventListener("scroll",function(){
   if(window.scrollY > enterContentScroll.bottom){
      enterContent.classList.add("enter-content__scroll");
   }else{
      enterContent.classList.remove("enter-content__scroll");
   }
});

const menuBar = document.querySelector(".menu-bar");
menuBar.addEventListener("click",function(){
   if(sideMenu.classList.contains("side-menu__hidden")){
      sideMenu.classList.remove("side-menu__hidden");
   }else{
      sideMenu.classList.add("side-menu__hidden");
   }
});
