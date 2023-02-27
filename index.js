const list=document.querySelectorAll(".list ul li");
let todoitems=[];

const todolist=document.querySelector(".list ul");

// todoitems=[];

const render=()=>{
    console.log(localStorage)
    todoitems=JSON.parse(localStorage.getItem("todoitems"));
    // if(todoitems===null)
    console.log(todoitems)
    todolist.innerHTML="";
    if(todoitems===null || todoitems.length===0){
        todolist.textContent="Create today's work"
    }
    else{
        todoitems.forEach((item)=>{
            const newElement=document.createElement("li");
            newElement.innerHTML=`<span class="span" id=${item.id} ></span> <p>${item.data}</p> <i id=${item.id} class="fas fa-trash icon"></i>`;
            if(item.isCompleted){
                newElement.classList.add("change");
            }
            todolist.append(newElement);
        })
    }
    console.log(localStorage)
}  

render();

const inputitem=document.querySelector(".input input");
inputitem.addEventListener("keypress",(e)=>{
    const data=e.target.value;
    const todo={
        data,
        id:Date.now(),
        isCompleted:false
    }
    if(e.key=="Enter" &&data!==""){
        todoitems=(todoitems===null)?[todo]:[...todoitems,todo];
        // todoitems=[...todoitems,todo];
        localStorage.setItem("todoitems",JSON.stringify(todoitems));
        render();
        e.target.value="";
    }
    
})

// Select the span 

const complete=document.querySelectorAll(".list ul li span");
document.body.addEventListener("click",(e)=>{
    if(e.target.classList.contains("span")){
        console.log("Span is clicked");
        console.log(e.target.parentNode);
        e.target.parentNode.classList.toggle("change");
        todoitems.forEach((item)=>{
            if(item.id==e.target.id && e.target.parentNode.classList.contains("change")){
                item.isCompleted=true;
            }
            else if(item.id==e.target.id && e.target.parentNode.classList.contains("change")===false){
item.isCompleted=false;
            }
        })
        localStorage.setItem("todoitems",JSON.stringify(todoitems));

        render();
    }
})

document.body.addEventListener("click",(e)=>{
    if(e.target.classList.contains("icon")){
        const newtodoitems=todoitems.filter((item)=>{
            return item.id!=e.target.id;
        })
        todoitems=[...newtodoitems];
        localStorage.setItem("todoitems",JSON.stringify(todoitems));
        render();
        
    }
})
