const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-result");
const errorDiv = document.getElementById("error");
const resultFound = document.getElementById("result-found");
const divErr = document.getElementById("hendel-err");
const loadData = () => {
  const searchText = searchInput.value;
  //   console.log(searchText);
  if (searchText === "") {
    errorDiv.innerText = "Search field can not be empty.";
    searchResult.textContent = "";
    resultFound.innerText = "";
    return;
  }

  const url = `http://openlibrary.org/search.json?q=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      resultFound.innerText = `${data.numFound} Result Found`;
      displayData(data.docs.slice(0, 25));
    })
    .finally(() => (searchInput.value = ""));
};

const displayData = (books) => {
  console.log(books);
  //  clear
  errorDiv.innerText = "";
  searchResult.textContent = "";

  books.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100">
            <img height="350" src="${`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}" alt="image" />
            <div class="card-body">
              <h2 class="card-title">${book.title}</h2>
              <h5>Author : ${book.author_name[0]}</h5>
              <p class="card-text"> Frist publish year :
                ${book.first_publish_year}
              </p>
            </div>
          </div>
      `;
    searchResult.appendChild(div);
  });
};
