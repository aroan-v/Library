function extractDataFromForm(event) {
  event.preventDefault();

  // Get the values from the input fields
  const titleValue = document.getElementById("book-title").value;
  const authorValue = document.getElementById("author").value;
  const pagesValue = document.getElementById("pages").value;
  const ratingValue = document.getElementById("rating").value;
  const coverFiles = document.getElementById("upload");
  const bookCover = coverFiles.files[0];

  if (checkDuplicate(titleValue, authorValue)) {
    alert("Duplicate!");

    const title = document.getElementById("book-title");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Duplicate found! Check the library";
    errorMessage.classList.add("invalid-message");

    title.insertAdjacentElement(`afterend`, errorMessage);

    return;
  }

  // Retrieves data from dropdown selection
  const status = document.querySelector('select[name="status"]').value;
  const startingBook = false;

  bookList.push(
    new Book(
      titleValue,
      authorValue,
      pagesValue,
      ratingValue,
      status,
      startingBook,
      bookCover
    )
  );
  addBookToTheContainer();
}
