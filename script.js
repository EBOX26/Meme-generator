var meme = {
  quote: null
};

function generateQuote() {
  fetch('https://type.fit/api/quotes?quote')
    .then(response => response.json())
    .then(jsonResponse => {
      var singleQuote = null;

      if (jsonResponse.length) {
        singleQuote = jsonResponse[Math.floor(Math.random() * jsonResponse.length)];
      }

      if (singleQuote) {
        meme.quote = singleQuote.text;
        displayQuote(); // Call a function to display the quote
        console.log(meme);
      }
    });
}

function displayQuote() {
  var quoteDisplay = document.getElementById("quote-display");
  if (meme.quote) {
    quoteDisplay.innerHTML = `<span class = "quote-txt">${meme.quote}</span>`;
  } else {
    quoteDisplay.innerHTML = "<span>Failed to fetch a quote</span>";
  }
}

$("#quote-btn").click(generateQuote);

var apikey = "fC3IfRYFrPhw6uqa9envFuRBednzN9PspuoNszKCJR6xrya5LRl6WPJl";
var input = document.querySelector("input");
var searchBtn = document.querySelector(".search_btn");
var page_num = 1;
var search_text = "";
var search = false;

input.addEventListener("input", (event) => {
  event.preventDefault();
  search_text = event.target.value;
});

async function CuratedPhotos(page_num) {
  // Fetch the data from the API
  var data = await fetch(`https://api.pexels.com/v1/curated?query=dog&page=${page_num}&per_page=1`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: apikey,
    },
  });
  var response = await data.json(); 
  console.log(response);

  // Display image
  displayImages(response);
}

function displayImages(response) {
  // Use forEach loop to iterate on each item
  response.photos.forEach((image) => {
    var photo = document.createElement("div");
    photo.innerHTML = `<img src=${image.src.large}>`;
    document.querySelector(".display_images").appendChild(photo);
  });
} 

//search button event listener and modal

// Initialize the modal
document.addEventListener('DOMContentLoaded', function () {
  var modalElement = document.getElementById('modal1');
  var modalInstance = M.Modal.init(modalElement, { dismissible: false });

  searchBtn.addEventListener('click', () => {
    if (input.value === '') {
      // Open the modal
      modalInstance.open();
      return;
    }
    clearGallery();
    search = true;
    SearchPhotos(search_text, page_num);
  });

  // Close the modal when the user clicks the "Close" button
  document.querySelector('.modal-close').addEventListener('click', () => {
    modalInstance.close();
  });
});

async function SearchPhotos(query, page_num) {
  var data = await fetch(`https://api.pexels.com/v1/search?query=dog+${query}&page=${page_num}&per_page=1`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: apikey,
    },
  });

  var response = await data.json();
  console.log(response);

  displayImages(response);
}

function clearGallery() {
  document.querySelector(".display_images").innerHTML = "";
  page_num = 1;
}

var titleInput = document.getElementById("titleInput");
var saveButton = document.getElementById("saveButton");
var titleList = document.getElementById("titleList");

// added code starts here

document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById("modal1");
  var instance = M.Modal.init(modal);
});

function saveTitle() {
  var titleInput = document.getElementById("titleInput");
  var title = titleInput.value;

  if (title.trim() === "") {
      // Open the modal if the title is empty
      var modal = document.getElementById("modal1");
      var instance = M.Modal.getInstance(modal);
      instance.open();
      return;
  }

  // Save the title to local storage
  localStorage.setItem(`savedTitle-${Date.now()}`, title);

  // Create a button to display the saved title
  var button = document.createElement("button");
  button.textContent = title;
  button.classList.add("waves-effect", "waves-teal", "btn", "create-btn");
  button.addEventListener("click", function() {
      // Handle button click (you can add your logic here)
  });

  // Add the button to the document
   titleList.appendChild(button);

  // Clear the input field
  titleInput.value = "";
}

// Event listener for the "Save" button
saveButton.addEventListener("click", saveTitle);

// Function to load saved titles from local storage
function loadSavedTitles() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith("savedTitle-")) {
      var title = localStorage.getItem(key);
      var button = document.createElement("button");
      button.classList.add("waves-effect", "waves-teal", "btn", "create-btn");
      button.textContent = title;
      button.addEventListener("click", function() {
       // will add code here
      });
      titleList.appendChild(button);
    }
  }
}

// Load saved titles when the page loads
loadSavedTitles();