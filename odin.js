const myLibrary = [];

// the book constructor...
function Book(title, author, pages, readBook) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readBook = readBook;
}
let formWrapper = document.querySelector('.formWrapper');
function showBookForm(){
    let showBookForm = document.querySelector('.new-book-form');
    formWrapper.classList.add('active');
    formWrapper.classList.remove('hide');
    showBookForm.classList.remove('hide');
}
function getBookInfo(){
  let title = document.querySelector("#book-title");
  let author = document.querySelector("#book-author");
  let pages = document.querySelector("#book-pages");
  let bookReadStatus = document.querySelector('#readBook');
  let bookInfo = [title.value, author.value, pages.value, bookReadStatus.checked];
  return bookInfo;
}
function hideMessage(){
  let message = document.querySelector('.message');
  if(myLibrary.length !== 0){
    message.classList.add('hide');
  }
}
function renderBook(){
  // img
  let img = document.createElement("img");
  img.src = './imgs/book-52.svg';
  
  // img div
  let imgDiv = document.createElement('div');
  imgDiv.appendChild(img);
  imgDiv.classList.add('cardImg');
  
  // heading
  let titleHeading = document.createElement('h3');
  titleHeading.textContent = myLibrary[myLibrary.length-1].title;
  titleHeading.classList.add('title');
  
  // author
  let authorPara = document.createElement('p');
  authorPara.textContent ="By: "+ myLibrary[myLibrary.length-1].author;
  authorPara.classList.add();

  // pages
  let pagesPara = document.createElement('p');
  pagesPara.textContent =  myLibrary[myLibrary.length-1].pages + " pages";

  // Remove button
  let btn = document.createElement('button');
  btn.textContent = "Remove Book";
  btn.classList.add('btn', 'removeBook');

  // Read button
  let ReadBtn = document.createElement('button');
  if(myLibrary[myLibrary.length-1].readBook){
    ReadBtn.textContent = "Read Book";
    ReadBtn.classList.add('btn','status', 'read');
  }
  else{
    ReadBtn.textContent = "Not Book";
    ReadBtn.classList.add('btn','status', 'notRead');
  }

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
  formWrapper.classList.remove('active');
  formWrapper.classList.add('hide');

}

function addBookToLibrary(e) {
  e.preventDefault();
  let info = getBookInfo();
  let i = myLibrary.findIndex(book=> book.title == info[0])
  if(info[0] == "" || info[1] ==""|| info[2] == ""){
    alert("all fields should be filled!")
    return
  }
  else if(i> -1){
    alert('This book already exits in the library!');
  }
  else{
    let newBook = new Book(...info);
    myLibrary.push(newBook);
    hideMessage();
    document.forms[0].reset();
    renderBook();
  }
}

function createBook(e){
  addBookToLibrary(e);

}
// delete a book or change reading status of the book

function removeBook(e){
  let removeButtons = container.querySelectorAll('.btn.removeBook');
  let statusButtons = container.querySelectorAll('.btn.status');
  removeButtons.forEach(removeButton=>{ 
    if(e.target == removeButton){
      let elTitle = e.target.parentElement.firstElementChild.nextSibling.textContent;
      let removeElIndex = myLibrary.findIndex(el => el.title === elTitle);
      myLibrary.splice(removeElIndex, 1);
      e.target.parentElement.remove();
      hideMessage();
    }
  })
  statusButtons.forEach(statButton=>{
    if(e.target == statButton){
      if(statButton.classList.contains('notRead')){
      statButton.classList.add('read');
      statButton.textContent = 'Read Book';
      statButton.classList.remove('notRead');
      let elTitle = e.target.parentElement.firstElementChild.nextSibling.textContent;
      let elStatus = myLibrary.findIndex(el => el.title === elTitle);
      myLibrary[elStatus].readBook = true;
      }
      else{
        statButton.classList.add('notRead');
        statButton.textContent = 'Not Read';
        statButton.classList.remove('read');
        let elTitle = e.target.parentElement.firstElementChild.nextSibling.textContent;
        let elStatus = myLibrary.findIndex(el => el.title === elTitle);
        myLibrary[elStatus].readBook = false;
      }
  
    }
    
  })
}
let container = document.querySelector('.container');
container.addEventListener('click', removeBook);
// show new book form
let showBookFrombtn = document.querySelector('.new-book');
showBookFrombtn.addEventListener('click', showBookForm);

// Add book to the library and render on DOM

let addBookBtn = document.querySelector('.addBookBtn');
addBookBtn.addEventListener('click', createBook);