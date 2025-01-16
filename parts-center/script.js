//hambergar content
const menuSide = document.getElementsByClassName("pub-menu-side");
function hambergar(){
    if(menuSide[0].classList.contains("pub-menu-side__checked")){
        menuSide[0].classList.remove("pub-menu-side__checked");
    }else{
        menuSide[0].classList.add("pub-menu-side__checked");
    }
}

// floating content
const button1 = document.getElementsByClassName("pub-button__red");
const floating = document.getElementsByClassName("pub-floating");
window.addEventListener("scroll",function(){
    const nowPosition = window.scrollY;
    const floatingDisplayPosition = button1[0].getBoundingClientRect();
    const targetPosition = nowPosition + floatingDisplayPosition.top;
    if(targetPosition < nowPosition ){
        floating[0].classList.remove("hidden");
        floating[0].classList.add("visible");
    }else{
        floating[0].classList.remove("visible");
        floating[0].classList.add("hidden");
    }
})

// accordion content
const accordionContent = document.getElementsByClassName("pub-accordion-content");
const accordionContentInner = document.querySelector(".pub-accordion-content div");
const accordionHeight = accordionContentInner.offsetHeight;
const accordionButton = document.getElementsByClassName("pub-accordion-button");
function accordionEvent(){
    if(accordionButton[0].classList.contains("clicked")){
        accordionContent[0].style.height = "0px";
        accordionButton[0].classList.remove("clicked");
    }else{
        accordionContent[0].style.height = accordionHeight + "px";
        accordionButton[0].classList.add("clicked");
    }
}

// modal content
const modalContent = document.getElementsByClassName("pub-modal-content");
const modalContentBack = document.getElementsByClassName("pub-modal-content-back");
function modalEvent(){
    modalContent[0].style.visibility = "visible";
    modalContentBack[0].style.visibility = "visible";
}
function modalCloseEvent(){
    modalContent[0].style.visibility = "hidden";
    modalContentBack[0].style.visibility = "hidden";
}

// carousel content
const carouselInner = document.getElementsByClassName("pub-carousel-innercontent");
//>現在地のプラス１にクラス付与&その－１と＋１には表示のクラス付与　&　該当しないものからクラスを外す
function carouselEventRight(){
    var carouselCenter = document.getElementsByClassName("pub-carousel__center");
    var cl = carouselInner.length;
    var c = 0;
    carouselInner[0].style.order = "0";
    carouselInner[cl - 1].style.order = "0";
    for(var i=0; i<cl; i++){
        if(carouselInner[i].id == carouselCenter[0].id){
            c = i+1;
        }
        carouselInner[i].classList.remove("pub-carousel__block");
    }
    carouselInner[c-1].classList.remove("pub-carousel__center");
    carouselInner[c-1].classList.add("pub-carousel__block");
    if(c == cl-1){
        carouselInner[cl-1].classList.add("pub-carousel__center");
        carouselInner[0].classList.add("pub-carousel__block");
        carouselInner[0].style.order = "1";
    }else if(c == cl){
        carouselInner[0].classList.add("pub-carousel__center");
        carouselInner[cl-1].classList.add("pub-carousel__block");
        carouselInner[1].classList.add("pub-carousel__block");
        carouselInner[cl-1].style.order = "-1";
    }else{
        carouselInner[c+1].classList.add("pub-carousel__block");
        carouselInner[c].classList.add("pub-carousel__center");
    }
}
function carouselEventleft(){
    var carouselCenter = document.getElementsByClassName("pub-carousel__center");
    var cl = carouselInner.length;
    var c = 0;
    carouselInner[0].style.order = "0";
    carouselInner[cl - 1].style.order = "0";
    for(var i=0; i<cl; i++){
        if(carouselInner[i].id == carouselCenter[0].id){
            c = i-1;
        }
        carouselInner[i].classList.remove("pub-carousel__block");
    }

    carouselInner[c+1].classList.remove("pub-carousel__center");
    carouselInner[c+1].classList.add("pub-carousel__block");

   
    if(c == 0){
        carouselInner[cl-1].classList.add("pub-carousel__block");
        carouselInner[cl-1].style.order = "-1";
        carouselInner[c].classList.add("pub-carousel__center");
    }else if(c == -1){
        carouselInner[cl-1].classList.add("pub-carousel__center");
        carouselInner[cl-2].classList.add("pub-carousel__block");
        carouselInner[0].style.order = "1";
    }
    else{
        carouselInner[c-1].classList.add("pub-carousel__block");
        carouselInner[c].classList.add("pub-carousel__center");
    }

}