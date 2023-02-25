//detect user click search button
let btnClick = document.getElementById("search-btn");
btnClick.addEventListener("click", renderBooks);

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

//array to store results
let cards = [];

//fuction to fetch data aand
function renderBooks() {
  let bookName = input.value;
  console.log(bookName);
  fetch("https://www.googleapis.com/books/v1/volumes?q=" + bookName)
    .then((response) => response.json())
    .then((data) => {
      let len = data.items.length;
      //dyanimcally creating cards for each response.
      console.log("FETCHING BOOKS",data);
      data.items.forEach((book) => {
        let temp = `<div class="col-sm">
        <div class="card" style="width: 18rem">
                    <img class="card-img-top" src="${book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks?.thumbnail :'""'}" alt="no image">
                    <div class="card-body">
                      <h5 class="card-title">${book.volumeInfo.title}</h5>
                      <h6>${book.volumeInfo.authors?book.volumeInfo.authors:''}</h6>
                    </div>
                  </div>
                  </div>
                  `;
        cards.push(temp);
      });
      //testing
    //   console.log("FETCHED BOOKS");
    //   console.log("Creting UI");
      let numRows = Math.floor(len / 3) + 1;
      let list = "";
      let x = 0;
      for (i = 0; i < numRows; i++) {
        //creating a row.
        let row = '<div class="row">';
        for (; x < len; x++) {
          row += cards[x];
        }
        row += "</div>";
        list += row;
      }
      document.getElementById("books").innerHTML = list;
    }).finally(()=>{
        // console.log("Hello") //testing
        cards=[]; //resetting so that logic works for new requests
    });
}
//display cards for testing
//console.log(cards);

//show one card.
// console.log(cards[0])
