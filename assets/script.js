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
    quoteDisplay.innerHTML = `<span class="quote-txt">${meme.quote}</span>`;
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

// Search button event listener and modal

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
var titleList = document.getElementById("lefty");

document.addEventListener('DOMContentLoaded', function () {
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

  // Pass the title to captureScreenshot and use it as the key
  captureScreenshot(title);

  // Create a button to display the saved title
  var button = document.createElement("button");
  button.textContent = title;
  button.classList.add("waves-effect", "waves-teal", "btn", "create-btn");

  button.addEventListener("click", function () {
    displayScreenshot(title); // Display the corresponding screenshot when the button is clicked
  });

  // Add the button to the document
  titleList.appendChild(button);

  // Clear the input field
  titleInput.value = "";
}

function captureScreenshot(title) {
  var memeDiv = document.getElementById("meme");

  // Configure html2canvas with useCORS option
  var options = {
    useCORS: true, // Allow cross-origin content to be captured (needed for pexels API)
  };

  // Use html2canvas with the configured options
  html2canvas(memeDiv, options).then(function (canvas) {
    // Convert canvas to an image
    var screenshot = new Image();
    screenshot.src = canvas.toDataURL("image/png");

    // Save both title and screenshot to local storage with the provided title as the key
    var entry = {
      title: title,
      screenshot: screenshot.src,
    };

    // Save the entry to local storage with the provided title as the key
    localStorage.setItem(title, JSON.stringify(entry));

    console.log(entry);
  });
}

// Event listener for the "Save" button
saveButton.addEventListener("click", saveTitle);

function displayScreenshot(entry) {
  // Display the screenshot in the "screenshotDisplay" element
  var screenshotDisplay = document.getElementById("screenshotDisplay");
  screenshotDisplay.innerHTML = ""; // Clear any existing content

  var screenshotImg = new Image();
  screenshotImg.src = entry.screenshot;
  screenshotImg.className = "screenshot-img";
  screenshotDisplay.appendChild(screenshotImg);
}

function loadSavedTitles() {
  var titleList = document.getElementById("lefty");

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);

    var entry = JSON.parse(localStorage.getItem(key));

    var button = document.createElement("button");
    button.textContent = entry.title;
    button.classList.add("waves-effect", "waves-teal", "btn", "create-btn");

    button.addEventListener("click", function (currentKey) {
      return function () {
        var data = JSON.parse(localStorage.getItem(currentKey)); // Get data associated with the current key
        console.log(currentKey); // Log the corresponding key when the button is clicked
        displayScreenshot(data); // Display the corresponding screenshot when the button is clicked
      };
    }(key));

    titleList.appendChild(button);
  }
}

loadSavedTitles();





