// What are we doing in our app???

// 1. Create an app object (to make use of namespacing)
const artApp = {};

// Save information which will be reused (e.g. API Key) within properties on the app object

artApp.apiKey = `TPf59cAe`;
artApp.apiUrl = `https://www.rijksmuseum.nl/api/en/collection`;

// Create a method which will make a call to the API and get some data back 
///// THEN we will take that data and put it on the page /////
artApp.getArt = function () {

    // use the URL constructor to format the API endpoint to which we will be makeing our request 
    const url = new URL(artApp.apiUrl);

    console.log(url);

    // add our parameters to our URL
    url.search = new URLSearchParams({
        // include the API parameters here: 
        key: artApp.apiKey,
        q: `monkey`,
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
        })
}

// Ceate an initilization method which will kickstart our app 

artApp.init = function () {
    console.log('App is working');

    // call the method which will get us our art data
    artApp.getArt();
}

// Call the initialization method (at the end of our code)
artApp.init();