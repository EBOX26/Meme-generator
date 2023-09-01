
var meme = {
  quote: null,
  image: null
};

// allow a meme's quote to be generated ondemand
function generateQuote()
{    
    fetch('https://type.fit/api/quotes?quote').then(response => {
      return response.json()
    }).then(jsonResponse => {

      var singleQuote = null;

      if (jsonResponse.length) {
        singleQuote =jsonResponse[Math.floor(Math.random() * jsonResponse.length)]
      }

      if (singleQuote)
      {
        meme.quote = singleQuote.text;
      }

      templateMeme();
     
    });
}

// allow a meme's quote to be generated ondemand
function generateImage()
{    



  
    /*fetch('https://api.pexels.com/v1/search?query=husky&per_page=1', {
      mode: 'no-cors',
       headers: {
        'Authorization': 'fC3IfRYFrPhw6uqa9envFuRBednzN9PspuoNszKCJR6xrya5LRl6WPJl'
      }
    }).then(response => {
      //return response.json()
    }).then(jsonResponse => {

      //console.log(jsonResponse);

      // var singleQuote = null;

      // if (jsonResponse.length) {
      //   singleQuote =jsonResponse[Math.floor(Math.random() * jsonResponse.length)]
      // }

      // if (singleQuote)
      // {
      //   meme.image = singleQuote.text;
      // }

      // templateMeme();
     
    });
*/
    $.ajax({
      url: "https://api.pexels.com/v1/search?query=husky&per_page=1",
      type: "GET",
      crossDomain: true,
      headers: {
          "Authorization": "fC3IfRYFrPhw6uqa9envFuRBednzN9PspuoNszKCJR6xrya5LRl6WPJl"
      },
      dataType: "json",
      success: function (response) {
          console.log(response);
      },
      error: function (xhr, status) {
          console.log(xhr, status);
      }
  });
}






 function templateMeme() {
  console.log(meme);
  console.log(image);
 }
  
  /*generateQuote().then(quote => {
    var text = quote.text;
    console.log(text)
    return text
  })*/
  


/*function quotePar(){
  var generateQuote = generateQuote();
  var quoteP = document.getElementById("quote-p");

  quoteP.value = generateQuote;
}*/


//zvar quoteButton = document.getElementById('#quote-btn');
 //if (quoteButton) {
 //quoteButton.addEventListener("click", getQuote);
 //}

 //quoteButton.addEventListener("click", generateQuote);
 $("#quote-btn").click(generateImage);
 $("#image-btn").click(templateMeme);
  