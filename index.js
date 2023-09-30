// rename the functions 

let books = [];
function Book(title, author, pages, index){
  this.title = title;
  this.author = author;
  this.pages = pages;
}

let addBookBtn = document.querySelector(".addBook");
let createBookBtn = document.querySelector(".createBook");

function createBook(){
  let bookForm = document.querySelector('.book-form');
  let createBook = document.querySelector('.add-book');
  createBook.classList.add('hide');
  bookForm.classList.remove('hide');
}
createBookBtn.addEventListener('click', createBook)
function addBook(e){
  let title = document.querySelector("#book-title");
  let author = document.querySelector("#book-author");
  let pages = document.querySelector("#book-pages");
  let newBook = new Book(title.value, author.value, pages.value);
  if(title.value ==""|| author.value ==""|| pages.value ==""){
  return
  }
  else{
    books.push(newBook);
    showBook();
    hideMessage();
    document.forms[0].reset();
    e.preventDefault();
  }
  
}
function showBook(){
  // img
  let img = document.createElement("img");
  img.src = './imgs/book-52.svg';
  
  // img div
  let imgDiv = document.createElement('div');
  imgDiv.appendChild(img);
  imgDiv.classList.add('cardImg');
  
  // heading
  let titleHeading = document.createElement('h3');
  titleHeading.textContent = books[books.length-1].title;
  titleHeading.classList.add('title');
  
  // author
  let authorPara = document.createElement('p');
  authorPara.textContent ="By: "+ books[books.length-1].author;
  authorPara.classList.add();

  // pages
  let pagesPara = document.createElement('p');
  pagesPara.textContent =  books[books.length-1].pages + " pages";

  // Remove button
  let btn = document.createElement('button');
  btn.textContent = "Remove Book";
  btn.classList.add('btn', 'removeBook');

  // Read button
  let ReadBtn = document.createElement('button');
  ReadBtn.textContent = "Read Book";
  ReadBtn.classList.add('btn', 'readBook');

  // book div
  let book = document.createElement("div");
  book.appendChild(imgDiv);
  book.appendChild(titleHeading);
  book.appendChild(authorPara);
  book.appendChild(pagesPara);
  book.appendChild(btn);
  book.appendChild(ReadBtn);
  
  book.classList.add('card', 'book');

  // add the book div to the container
  let container = document.querySelector('.container');
  container.appendChild(book);
}
addBookBtn.addEventListener('click', addBook);

function hideMessage(){
  let message = document.querySelector('.message');
  if(books.length !== 0){
    message.classList.add('hide');
  }
}
let container = document.querySelector('.container');
function removeBook(e){
  let buttons = container.querySelectorAll('.btn.removeBook');
  buttons.forEach(button=>{ 
    if(e.target == button){
      let elTitle = e.target.parentElement.firstElementChild.nextSibling.textContent;
      let removeEl = books.findIndex(el => el.title === elTitle);
      books.splice(removeEl, 1);
      e.target.parentElement.remove();
      hideMessage();
    }
  })
  
}
container.addEventListener('click', removeBook)