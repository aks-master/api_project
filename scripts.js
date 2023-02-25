//detect user click search button
let btnClick = document.getElementById("search-btn");
btnClick.addEventListener("click", searchBook);

//detect if user pressed enter to search
let input = document.getElementById("search-input");
input.addEventListener("keypress", (Event) => {
  if (Event.key === "Enter") {
    // Cancel the default action, if needed
    Event.preventDefault();
    // Trigger the button element with a click
    btnClick.click();
  }
});
function searchBook() {
    let bookName=input.value;
  fetch("https://www.googleapis.com/books/v1/volumes?q=" + bookName)
    .then((response) => 
      response.json()
    )
    .then((data) => {
      console.log(data);
    });
}
