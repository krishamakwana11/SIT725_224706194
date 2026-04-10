async function loadBooks() {
  const booksList = document.getElementById("books-list");

  try {
    const response = await fetch("/api/books");

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const books = await response.json();

    booksList.innerHTML = "";

    books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card";

      bookCard.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
      `;

      booksList.appendChild(bookCard);
    });
  } catch (error) {
    booksList.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

window.onload = loadBooks;