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
      const inputDate = newTodoContent.querySelector(".input-date");
      inputDate.value = ymd;
   }
};
function trash(trashbox){
   const todoContentTrash = trashbox.closest(".todo-content");
   const mordalWrap = todoContentTrash.querySelector(".mordal-wrap");
   trashbox.addEventListener("click",function(){
      mordalWrap.classList.remove("mordal__hidden");
   });
   const trashButton = todoContentTrash.querySelector(".mordal-button:first-of-type");
   trashButton.addEventListener("click",function(){
      todoContentTrash.remove();
      task0();
   });
   const cancelButton = todoContentTrash.querySelector(".mordal-button:last-of-type");
   cancelButton.addEventListener("click",function(){
      mordalWrap.classList.add("mordal__hidden");
  });
   const closeButton = todoContentTrash.querySelector(".mordal-content-close");
   closeButton.addEventListener("click",function(){
       mordalWrap.classList.add("mordal__hidden");
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
window.addEventListener("click",function(event){
   if(event.target != menuBar && event.target != sideMenu){
      sideMenu.classList.add("side-menu__hidden");
   }
});

const howtoCarouselButton = document.getElementsByClassName("howto-carousel-button");
const howtoInner = document.querySelector(".howto-inner");
const howtoDots = document.getElementsByClassName("howto-carousel-dot");
howtoCarouselButton[0].addEventListener("click",carouselRight);
howtoCarouselButton[1].addEventListener("click",carouselLeft);
var cnt = 0;

function carouselLeft(){
   if(cnt < 3){
     cnt += 1;
     howtoInner.style.transform = "translateX(-"+ (cnt*25) +"%)"
     howtoDots[cnt-1].classList.remove("howto-carousel-dot__click");
     howtoDots[cnt].classList.add("howto-carousel-dot__click");
   }
}
function carouselRight(){
   if(cnt > 0){
      cnt -= 1;
     howtoInner.style.transform = "translateX(-"+ (cnt*25) +"%)"
     howtoDots[cnt+1].classList.remove("howto-carousel-dot__click");
     howtoDots[cnt].classList.add("howto-carousel-dot__click");
   }
}

for(let i=0; i<=3; i++){
   howtoDots[i].addEventListener("click",function(){
      cnt = i;
      howtoInner.style.transform = "translateX(-"+ (cnt*25) +"%)"
      for(j=0; j<=3; j++){
         if(howtoDots[j].classList.contains("howto-carousel-dot__click")){
            howtoDots[j].classList.remove("howto-carousel-dot__click");
         }
      }
      howtoDots[cnt].classList.add("howto-carousel-dot__click");
   });
}

window.addEventListener("resize",function(){
   if(this.window.innerWidth >= 768){
      howtoInner.style.transform = "translateX(0)"
   }
})


   //今日の日時を表示
   var date = new Date()
   var year = date.getFullYear()
   var month = date.getMonth() + 1
   var day = date.getDate()
 
   var toTwoDigits = function (num, digit) {
     num += ''
     if (num.length < digit) {
       num = '0' + num
     }
     return num
   }
   
   var yyyy = toTwoDigits(year, 4)
   var mm = toTwoDigits(month, 2)
   var dd = toTwoDigits(day, 2)
   var ymd = yyyy + "-" + mm + "-" + dd;