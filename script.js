const dialog = document.getElementById("dialog");
const addBookButtons = document.querySelectorAll(".add-book");
const closeDialogButton = document.querySelector(".close-dialog-button");
const booksContainer = document.querySelector(".books-container");
const addBookBtn = booksContainer.querySelector(".add-book-button");
const titleInput = document.getElementById("book-title");
const messageContainer = document.querySelector(".message-container");
const submitButton = document.getElementById("submit");
const bookForm = document.querySelector(".book-form");
const stars = document.querySelectorAll(".star");
const coverFiles = document.getElementById("upload");
const coverPreview = document.querySelector(".book-cover-preview");
const emptyLibraryButton = document.querySelector(
  ".empty-library-button-header"
);
let bookList = [];

// My own starting books, stored in an array.
const startingBooks = [
  {
    title: "Super Powereds, Year 4",
    author: "Drew Hayes",
    pages: 1022,
    rating: 5,
    status: "Read",
    image: "images/book-0.png",
    isDefaultBook: true,
  },
  {
    title: "The Choice of Magic",
    author: "Michael G. Manning",
    pages: 626,
    rating: 4,
    status: "Currently Reading",
    image: "images/book-1.png",
    isDefaultBook: true,
  },
  {
    title: "Aristotle and Dante Discover the Secrets of the Universe",
    author: "Benjamin Alire Sáenz",
    pages: 392,
    rating: 5,
    status: "Read",
    image: "images/book-2.png",
    isDefaultBook: true,
  },
  {
    title: "The Magicians",
    author: "Lev Grossman",
    pages: 1402,
    rating: 2,
    status: "Read",
    image: "images/book-3.png",
    isDefaultBook: true,
  },
];

const statusOptions = [
  { value: "Not Read Yet", text: "Not Read Yet" },
  { value: "Read", text: "Read" },
  { value: "Want to Read", text: "Want to Read" },
  { value: "Currently Reading", text: "Currently Reading" },
];

function Book(arg) {
  // Newly added books by the User is passed as an array.
  if (Array.isArray(arg)) {
    this.title = arg[0];
    this.author = arg[1];
    this.pages = arg[2];
    this.rating = arg[3];
    this.status = arg[4];
    this.image = arg[5];
    this.isDefaultBook = arg[6];
  } else if (typeof arg === "object") {
    // Starting books are passed as an object.
    const { title, author, pages, rating, status, image, isDefaultBook } = arg;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.rating = rating;
    this.status = status;
    this.image = image;
    this.isDefaultBook = isDefaultBook;
  } else {
    console.log("Invalid argument passed to the constructor");
    return;
  }
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}.`;
};

Book.prototype.generateStatus = function () {
  // Create a <select> element
  const selectElement = document.createElement("select");
  selectElement.name = "status";

  // Create and append the "Select Status" option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Select Status";
  selectElement.appendChild(defaultOption);

  statusOptions.forEach((option) => {
    const optionElement = document.createElement("option");

    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectElement.appendChild(optionElement);

    optionElement.selected = this.status === option.value ? true : false;
  });

  // Event listener to record changes

  const self = this;

  selectElement.addEventListener("change", function () {
    self.status = this.value;

    console.log(`Book: ${self.title}`);
    console.log("New status: ", self.status);
  });

  return selectElement;
};

Book.prototype.generateStars = function () {
  const bookRating = document.createElement("div");

  for (i = 1; i <= 5; i++) {
    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // Set attributes
    svg.setAttribute("width", "19");
    svg.setAttribute("height", "18");
    svg.setAttribute("viewBox", "0 0 19 18");

    // Create path element
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M8.53759 0.821825C8.83694 -0.0994856 10.1404 -0.0994847 10.4397 0.821826L11.8687 5.21985C12.0026 5.63188 12.3865 5.91084 12.8198 5.91084H17.4441C18.4128 5.91084 18.8156 7.15045 18.0319 7.71985L14.2907 10.438C13.9402 10.6926 13.7936 11.144 13.9275 11.556L15.3565 15.954C15.6558 16.8754 14.6013 17.6415 13.8176 17.0721L10.0764 14.3539C9.72594 14.0993 9.25135 14.0993 8.90086 14.3539L5.15968 17.0721C4.37596 17.6415 3.32148 16.8754 3.62084 15.954L5.04984 11.556C5.18372 11.144 5.03706 10.6926 4.68657 10.438L0.945383 7.71985C0.16167 7.15045 0.564446 5.91084 1.53317 5.91084H6.15753C6.59076 5.91084 6.97471 5.63188 7.10859 5.21985L8.53759 0.821825Z"
    );

    // Set the star color based on the rating

    if (i <= this.rating) {
      // Set the star to yellow fill.
      path.setAttribute("fill", "#E5A500");
    } else {
      // Set the star to gray fill.
      path.setAttribute("fill", "#BDBDBD");
    }

    // Append path to SVG element
    svg.appendChild(path);
    bookRating.appendChild(svg);
  }

  // return the element to be appended later
  return bookRating;
};

Book.prototype.generateCloseButton = function (bookTile) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const button = document.createElement("button");

  // Set attributes
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  button.classList.add("close-button");

  // Create path element for the close button
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  );
  path.setAttribute("fill", "#000000");
  svg.appendChild(path);

  // Add a callback function that will remove the Book instance from the array as well as the book tile element where the close button is attached to.
  svg.addEventListener("click", () => {
    bookList = bookList.filter((book) => book.title !== this.title);
    bookTile.remove();
  });

  button.appendChild(svg);

  return button;
};

Book.prototype.generateBookCover = function () {
  const img = document.createElement("img");
  if (this.isDefaultBook) {
    img.src = this.image;
  } else if (this.image === undefined) {
    this.image = "images/default-cover.png";
    img.src = this.image;
  } else {
    const reader = new FileReader();
    // Read the file as a data URL first
    reader.readAsDataURL(this.image);

    // Define what happens when the file is loaded
    reader.onload = () => {
      img.src = reader.result;
      this.image = reader.result;
    };
  }

  img.classList.add("book-cover");

  return img;
};

// Initialize the library with the startingBooks

deployBooks("starting-books");

function handleDataFromForm(event, action) {
  event.preventDefault();

  // Get the values from the input fields
  const title = document.getElementById("book-title");
  const titleValue = title.value;
  const authorValue = document.getElementById("author").value;
  const pagesValue = document.getElementById("pages").value;
  const ratingValue = dialog.querySelectorAll(".lit").length;
  const bookCover = coverFiles.files[0];

  if (checkDuplicate(titleValue, authorValue)) {
    title.blur();
    messageContainer.classList.add("invalid-message");
    return;
  } else {
    dialog.close();
  }

  // Retrieves data from dropdown selection
  const statusValue = document.querySelector('select[name="status"]').value;
  const isDefaultBook = false;

  const newBookData = [
    titleValue,
    authorValue,
    pagesValue,
    ratingValue,
    statusValue,
    bookCover,
    isDefaultBook,
  ];

  deployBooks("new-book", newBookData);
}

function clearDataFromForm() {
  const dialog = document.getElementById("dialog");
  const inputs = dialog.querySelectorAll("input");

  inputs.forEach((input) => {
    input.value = "";
  });

  // messageContainer.classList.remove("invalid-message");
  coverPreview.src = "images/placeholder-cover.png";
  stars.forEach((star) => star.classList.remove("lit"));
}

function deployBooks(group, value) {
  console.clear();
  if (group === "starting-books") {
    bookList = startingBooks.map((book) => new Book(book));

    for (let i = 0; i < bookList.length; i++) {
      addBookToTheContainer(i);
    }
  } else if (group === "new-book" && value) {
    bookList.push(new Book(value));
    addBookToTheContainer();
  } else if (bookList.length === 0) {
    console.log("The library is empty.");
    return;
  }
}

function checkDuplicate(title, author) {
  const inputAuthor = author.replace(/\s+/g, "").toLowerCase();
  const inputTitle = title.replace(/\s+/g, "").toLowerCase();

  const duplicateFound = bookList.some((book) => {
    const formattedCurrentAuthor = book.author
      .replace(/\s+/g, "")
      .toLowerCase();
    const formattedCurrentTitle = book.title.replace(/\s+/g, "").toLowerCase();

    if (
      formattedCurrentAuthor === inputAuthor &&
      formattedCurrentTitle === inputTitle
    ) {
      console.log("Duplicate found! This book is already in the library");
      return true;
    }
    return false;
  });

  return duplicateFound;
}

function addBookToTheContainer(bookNumber) {
  bookNumber = bookNumber != null ? bookNumber : bookList.length - 1;

  const newBookTile = document.createElement("div");
  const bookDetailsContainer = document.createElement("div");
  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("div");
  const bookPages = document.createElement("p");

  // Assign the classes
  const className = "book-tile";
  newBookTile.classList.add(className);
  bookAuthor.classList.add("book-author");
  bookDetailsContainer.classList.add("book-details");

  const bookTitleLength = bookList[bookNumber].title.length;

  if (bookTitleLength > 30 && bookTitleLength <= 60) {
    bookTitle.classList.add("long-title");
  } else if (bookTitleLength > 60) {
    bookTitle.classList.add("extra-long-title");
  }

  // Assign the content
  bookTitle.textContent = bookList[bookNumber].title;
  bookAuthor.textContent = bookList[bookNumber].author
    ? `by ${bookList[bookNumber].author}`
    : `Written by Unknown Author`;
  bookPages.textContent = bookList[bookNumber].pages
    ? `${bookList[bookNumber].pages} pages`
    : `Pages not specified`;

  // Append to the DOM
  bookDetailsContainer.append(
    bookTitle,
    bookAuthor,
    bookPages,
    bookList[bookNumber].generateStars(),
    bookList[bookNumber].generateStatus(),
    bookList[bookNumber].generateCloseButton(newBookTile)
  );

  newBookTile.append(
    bookList[bookNumber].generateBookCover(),
    bookDetailsContainer
  );
  booksContainer.insertBefore(newBookTile, addBookBtn);
}

function handleBookCoverFile() {
  // Get the first file in case the user uploads multiple files
  const bookCover = coverFiles.files[0];

  const reader = new FileReader();
  // Read the file as a data URL first
  reader.readAsDataURL(bookCover);

  // Define what happens when the file is loaded
  reader.onload = function () {
    coverPreview.src = reader.result;
  };
}

// Event Listeners

addBookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    messageContainer.classList.remove("invalid-message");
    dialog.showModal();
  }); // Opens the dialog
});

closeDialogButton.addEventListener("click", () => {
  clearDataFromForm();
  dialog.close(); // Closes the dialog
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (bookForm.checkValidity()) {
    handleDataFromForm(event);
    clearDataFromForm();
  }
});

titleInput.addEventListener("input", () => {
  messageContainer.classList.remove("invalid-message");
});

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    stars.forEach((s) => s.classList.remove("lit"));

    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("lit");
    }
  });

  star.addEventListener("mouseover", () => {
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("lit-hover");
    }
  });

  star.addEventListener("mouseout", () => {
    stars.forEach((s) => s.classList.remove("lit-hover"));
  });
});

coverFiles.addEventListener("change", handleBookCoverFile);
coverPreview.addEventListener("click", function () {
  coverFiles.click();
});

emptyLibraryButton.addEventListener("click", () => {
  bookList = [];
  const bookTilesToDelete = booksContainer.querySelectorAll(".book-tile");

  bookTilesToDelete.forEach((book) => {
    book.remove();
  });
});
