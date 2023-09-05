const meme = {
  quote: null
};

function generateQuote() {
  fetch('https://type.fit/api/quotes?quote')
    .then(response => response.json())
    .then(jsonResponse => {
      let singleQuote = null;

      if (jsonResponse.length) {
        singleQuote = jsonResponse[Math.floor(Math.random() * jsonResponse.length)];
      }

      if (singleQuote) {
        meme.quote = singleQuote.text;
        displayQuote(); // Call a function to display the quote
      }
    });
}

function displayQuote() {
  const quoteDisplay = document.getElementById("quote-display");
  if (meme.quote) {
    quoteDisplay.innerHTML = `<p>${meme.quote}</p>`;
  } else {
    quoteDisplay.innerHTML = "<p>Failed to fetch a quote</p>";
  }
}

$("#quote-btn").click(generateQuote);

const apikey = "fC3IfRYFrPhw6uqa9envFuRBednzN9PspuoNszKCJR6xrya5LRl6WPJl";
const input = document.querySelector("input");
const searchBtn = document.querySelector(".search_btn");
const showMoreBtn = document.querySelector(".showmore");

let page_num = 1;
let search_text = "";
let search = false;

input.addEventListener("input", (event) => {
  event.preventDefault();
  search_text = event.target.value;
});

async function CuratedPhotos(page_num) {
  // Code to be executed
  // Fetch the data from the API
  const data = await fetch(`https://api.pexels.com/v1/curated?page=${page_num}&per_page=1`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: apikey,
    },
  });
  const response = await data.json(); 
  console.log(response);

  // Display image
  displayImages(response);
}

function displayImages(response) {
  // Use forEach loop to iterate on each item
  response.photos.forEach((image) => {
    const photo = document.createElement("div");
    photo.innerHTML = `<img src=${image.src.large}>`;
    document.querySelector(".display_images").appendChild(photo);
  });
}

searchBtn.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please enter text");
    return;
  }
  clearGallery();
  search = true;
  SearchPhotos(search_text, page_num);
});

async function SearchPhotos(query, page_num) {
  const data = await fetch(`https://api.pexels.com/v1/search?query=dog+${query}&page=${page_num}&per_page=1`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: apikey,
    },
  });

  const response = await data.json();
  console.log(response);

  displayImages(response);
}

function clearGallery() {
  document.querySelector(".display_images").innerHTML = "";
  page_num = 1;
}

showMoreBtn.addEventListener("click", () => {
  if (!search) {
    page_num++;
    CuratedPhotos(page_num);
  } else {
    if (search_text.value === "") return;
    page_num++;
    SearchPhotos(search_text, page_num);
  }
});

CuratedPhotos(page_num);