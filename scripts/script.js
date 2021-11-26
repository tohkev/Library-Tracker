let myLibrary = [];

let addBtn = document.querySelector("#addbtn");
let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let genreInput = document.querySelector("#genre");
let catalogBlock = document.querySelector(".catalog");
let catalogList = document.querySelector(".catalog-list");
let readTotal = document.querySelector(".read-count");
let unreadTotal = document.querySelector(".unread-count");
let totalBooks = document.querySelector(".total-count");

function Book(title, author, genre) {
  this.title = title;
  this.author = author;
  this.genre = genre;
}

function addBookToLibrary(title, author, genre) {
  let newBook = Object.create(Book);
  newBook.title = title;
  newBook.author = author;
  newBook.genre = genre;
  myLibrary.push(newBook);
}

//*************** EVENTS **********************

//adds the new book to the myLibrary array and updates website
addBtn.addEventListener("click", () => {
  let title = titleInput.value;
  let author = authorInput.value;
  let genre = genreInput.value;
  if (title && author && genre) {
    addBookToLibrary(title, author, genre);
    updateLibrary();
    updateCounts();
  }
});

catalogBlock.addEventListener("click", (e) => {
  //event delegation to toggle Read/Unread status buttons
  if (e.target.classList.contains("readbtn")) {
    e.target.classList.toggle("readbtn");
    e.target.classList.toggle("unreadbtn");
  } else if (e.target.classList.contains("unreadbtn")) {
    e.target.classList.toggle("unreadbtn");
    e.target.classList.toggle("readbtn");
  }
  //event delegation to delete a row
  if (e.target.classList.contains("deletebtn")) {
    let delTitle =
      e.target.parentNode.parentNode.querySelector(".title").innerText;
    let delAuthor =
      e.target.parentNode.parentNode.querySelector(".author").innerText;
    myLibrary.splice(findBookIndex(delTitle, delAuthor), 1);
    updateLibrary();
  }

  updateCounts();
});

//*************** DOM Functions *************************

function updateLibrary() {
  //refreshes the catalog to match the array myLibrary
  catalogList.textContent = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("catalog-entry");
    newDiv.classList.add("hline-break");
    newDiv.innerHTML = `
          <span class="col-3 title">${myLibrary[i].title}</span>
          <span class="col-3 author">${myLibrary[i].author}</span>
          <span class="col-3 genre">${myLibrary[i].genre}</span>
          <div class="buttons col-3">
            <button class="btn btn-light entry-button unreadbtn"></button>
            <button class="btn btn-danger entry-button deletebtn">
              Delete
            </button>
          </div>
    `;
    catalogList.appendChild(newDiv);
  }
}

//updates counts at the top of the page
function updateCounts() {
  totalBooks.textContent = myLibrary.length;

  let readCount = document.querySelectorAll(".readbtn");
  readTotal.textContent = readCount.length;

  let unreadCount = document.querySelectorAll(".unreadbtn");
  unreadTotal.textContent = unreadCount.length;
}

//finds the book in the myLibrary array and returns its index
function findBookIndex(title, author) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i]["title"] === title && myLibrary[i]["author"] === author) {
      return i;
    } else {
      return -1;
    }
  }
}
