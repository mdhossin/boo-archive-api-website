// delare gloabl variable
const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-result");
const errorDiv = document.getElementById("error");
const resultFound = document.getElementById("result-found");
// add spinners
const spinners = (displayNone) => {
  document.getElementById("spinner").style.display = displayNone;
};
// search result not found display this message
const errorData = (displayStyle) => {
  document.getElementById("error-handel").style.display = displayStyle;
};
// when click the button api data loading
const loadData = () => {
  errorData("none");
  spinners("block");
  const searchText = searchInput.value;
  resultFound.innerText = "";
  resultFound.innerText = "";
  searchResult.textContent = "";
  errorDiv.innerText = "";
  if (searchText === "") {
    errorDiv.innerText = "Search field can not be empty";
    errorData("none");
    spinners("none");
    return;
  }
  // fetching data from api
  fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      resultFound.innerText = `Search Result Found : ${data.numFound}`;
      displayData(data.docs.slice(0, 25));
    })
    .finally(() => (searchInput.value = ""));
};

// click the button search result showing on display
const displayData = (books) => {
  //  clear
  if (books.length !== -1) {
    errorData("block");
    spinners("none");
  }
  errorDiv.innerText = "";
  searchResult.textContent = "";
  books?.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100 shadow">
            <img height="350" src="${`https://covers.openlibrary.org/b/id/${
              book.cover_i ? book.cover_i : "Not found"
            }-M.jpg`}" alt="Book Image" />
            <div class="card-body">
              <h2 class="card-title">${
                book.title ? book.title : "Not found"
              }</h2>
              <h5 class ="fw-bold">${
                book.author_name ? book.author_name.slice(0, 1) : "Not found"
              }</h5>
              <p class="card-text"> Frist publish year :
                ${
                  book.first_publish_year
                    ? book.first_publish_year
                    : "Not found"
                }
              </p>
              <p class="card-text text-primary fst-italic">Publiser : ${
                book.publisher ? book.publisher.slice(0, 1) : "Not found"
              }</p>
            </div>
          </div>
      `;
    searchResult.appendChild(div);
    errorData("none");
    spinners("none");
  });
};
