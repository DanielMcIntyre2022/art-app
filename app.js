// What are we doing in our app???

// 1. Create an app object (to make use of namespacing)
const artApp = {};

// Save information which will be reused (e.g. API Key) within properties on the app object

artApp.apiKey = `TPf59cAe`;
artApp.apiUrl = `https://www.rijksmuseum.nl/api/en/collection`;

// Create a method which will make a call to the API and get some data back 
///// THEN we will take that data and put it on the page /////
artApp.getArt = function (usersChosenAnimal) {

    // use the URL constructor to format the API endpoint to which we will be makeing our request 
    const url = new URL(artApp.apiUrl);

    console.log(url);

    // add our parameters to our URL
    url.search = new URLSearchParams({
        // include the API parameters here: 
        key: artApp.apiKey,
        q: usersChosenAnimal,
        imgonly: true
    });

    // now it is finally time to FETCH some data from the beautiful endpoint we have just created 
    fetch(url)
        .then(function (apiResponse) {
            // take the promise that is returned and parse it into json 
            return apiResponse.json()
        })
        .then(function (artFromTheApi) {
            // this gives us the whole object
            console.log(artFromTheApi);
            // lets navigate into the propety with the art object specificly
            console.log(artFromTheApi.artObjects);

            artApp.displayArt(artFromTheApi.artObjects);
        })
}

// create a method which will take the API data and display it on our page
artApp.displayArt = function (artArray) {
    artArray.forEach(function (individualArtObject) {
        console.log(individualArtObject);

        // extract the data from the API (artist name, piece title, image URL, alt text) and save within variables 
        const artworkTitle = individualArtObject.title;
        const artworkImage = individualArtObject.webImage.url;
        const artist = individualArtObject.principalOrFirstMaker
        const altText = individualArtObject.artworkTitle

        // create an li element in which this information will be added 
        const listElement = document.createElement('li');

        listElement.classList.add('piece');

        // create an h2 to hold the art title

        const heading = document.createElement('h2');
        heading.textContent = artworkTitle;

        // create an img to hold the artwork picture

        const image = document.createElement('img')

        //this element node has src and alt properties 

        image.alt = altText;
        image.src = artworkImage;

        // create a p with a class of artist to hold the artist name  
        const paragraphElement = document.createElement('p');
        paragraphElement.classList.add('artist');
        paragraphElement.textContent = artist;

        // take the elements we have created and add them to the li 
        listElement.append(heading, image, paragraphElement)

        // add the li to the ul (so that the data is finally in the DOM!!!)

        const UlElement = document.querySelector("#artwork")
        UlElement.appendChild(listElement);

    })

}

// Ceate an initilization method which will kickstart our app 

artApp.init = function () {
    console.log('App is working');

    // call the method which will get us our art data
    artApp.getArt('whales');
}

// Call the initialization method (at the end of our code)
artApp.init();