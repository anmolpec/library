let library=[];

let newBook=document.querySelector("#newBook");
newBook.addEventListener("click", addNewBook);
library.push(newBook);
/*
if(!localStorage.getItem("lib")){
    populateStorage();
}
else{
    setLib();
}

function setLib(){
    library=[...localStorage.getItem("lib").split("|").map((stringData)=>{
        let arr=stringData.split(" ");
        let temp= new Book(arr[0]==false?"":arr[0], arr[1]==false?"":arr[1], arr[2]==false?"":arr[2], arr[3]=="true"?true:false);
        updateDisplay();
        return temp;
    })];
    console.log(library, "set from ls");
}
function populateStorage(){
    localStorage.setItem("lib",library.reduce((str, book)=>{
        str+=`${book.title}  ${book.author} ${book.pages} ${book.readStatus}|`;
        return str;
    }," "));
    console.log(library, "update ls", localStorage.getItem("lib"));
}
*/
function Book(title, author, pages, readStatus){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readStatus=readStatus;
}


function addNewBook(){
    displayFormToggle();
    document.querySelector("#cancel").addEventListener("click", displayFormToggle);
    let submit=document.querySelector("#submit");
    submit.addEventListener("click", getNewBookData);
}

function getNewBookData(){
    let title=document.getElementsByName("title")[0].value;
    let author=document.getElementsByName("author")[0].value;
    let pages=document.getElementsByName("pages")[0].value;
    let readStatus=document.getElementsByName("readStatus")[0].checked;
    let book=new Book(title, author, pages, readStatus);
    library=[book, ...library];
    displayFormToggle();
    resetForm();
    updateDisplay();
    //populateStorage();
}

function displayFormToggle(){
    let form=document.querySelector("form");
    if(form.style.display=="none"||form.style.display==""){
        form.style.display="flex";
        form.style.flexDirection="column";
        form.style.justifyContent="center";
    }
    else{
        form.style.display="none";
    }
}

function resetForm(){
    document.getElementsByName("title")[0].value="";
    document.getElementsByName("author")[0].value="";
    document.getElementsByName("pages")[0].value="";
    document.getElementsByName("readStatus")[0].checked=false;
    document.getElementsByName("readStatus")[1].checked=false;
}

function updateDisplay(){
    let bookShelf=document.querySelector(".books");
    let book=document.createElement("div");
    book.id=`#${library[0].title}`;
    book.textContent=`${library[0].title} \n By: ${library[0].author} \n Pages: ${library[0].pages} \n ${library[0].readStatus?"Read":"Not read"}`;   
    bookShelf.appendChild(book);
    book.addEventListener("click", bookMenu);
}

function bookMenu(x){
    bookMenuToggle();
    let delBtn=document.querySelector("#deleteBook");
    let bookId=x.target.id;
    delBtn.addEventListener("click", function(){
        x.target.parentNode.removeChild(x.target);
        for(let i=0;i<library.length-1;i++){
            if(`#${library[i]["title"]}`==bookId){
                library.splice(i,1);
            }
        }
        bookMenuToggle();
        console.log(library);
        //populateStorage();
    });

    let readBtn=document.querySelector("#toggleRead");
    readBtn.addEventListener("click", function(){
        let str=x.target.textContent;
        x.target.textContent=str.replace("Not read", "Read");
        for(let i=0;i<library.length-1;i++){
            if(library[i]["title"]==bookId){
                library[i]["readStatus"]=true;
            }
        }
        bookMenuToggle();
        //populateStorage();
    })
    
    
}
function bookMenuToggle(){
    let temp=document.querySelector("#bookMenu");
    if(temp.style.display=="none"||temp.style.display==""){
        temp.style.display="flex";
        temp.style.flexDirection="column";
        temp.style.justifyContent="center";
    }
    else{
        temp.style.display="none";
    }
}
