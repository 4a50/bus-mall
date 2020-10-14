'use strict';
var numberRounds = 25;
var timesVoted = 0;
var allProducts = [];
var prevImageDisplay = [];
var selectedImages = [];
var imageContainer = document.getElementById('image-display');

function Product(fileName, filePath) {
  this.titleAlt = fileName;
  this.filePath = filePath;
  this.numberClicks = 0;
  this.numberDisplayed = 0;
  allProducts.push(this);
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function localStore() {
  //converting to JSON
  var stringifyAllProducts = JSON.stringify(allProducts);
  // console.log(stringifyAllProducts);
  //put JSON into local storage
  localStorage.setItem('allProducts', stringifyAllProducts);
  //retrieve the item
  var fromLocalStorage = localStorage.getItem('allProducts');
  // console.log('retrieved: ' + fromLocalStorage);
  //translate back to javascript (parse JSON to JS)
  var parsedFromLocaleStorage = JSON.parse(fromLocalStorage);
  // console.log('parsed allProducts: ', parsedFromLocaleStorage);
  // When parsed loose connection to the constructor. They are all object literals
  // If you need to re-establish to constructor: loop over all the object literals and create new object instances
  return parsedFromLocaleStorage;
}

/// Grab three Random images <=Function
/// Cannot be any previously display
/// Cannot have any repeated.
/// RESULT: Three images that can be displayed.

function generateThreeImages() { //You will generate three different index numbers for me

  selectedImages = [];
  var areConditionsTrue;
  for (var i = 0; i < 3; i++) { //This loop will make three choices.
    areConditionsTrue = false;
    while (!areConditionsTrue) {
      var randomImageIndex = generateRandomNumber(allProducts.length);
      if (selectedImages.includes(randomImageIndex) || prevImageDisplay.includes(randomImageIndex)) {
        randomImageIndex = generateRandomNumber(allProducts.length);
      } else {
        areConditionsTrue = true;
      }

    }

    selectedImages.push(randomImageIndex); //add the image index be to one of the three to be used
    updateNumberDisplayed(randomImageIndex);
  }
}
function updateNumberDisplayed(indexNum) {
  allProducts[indexNum].numberDisplayed++;

}

function displayImages() {
  var imgHTMLElements = [document.getElementById('image-1'), document.getElementById('image-2'), document.getElementById('image-3')];
  for (var i = 0; i < selectedImages.length; i++) {
    imgHTMLElements[i].src = allProducts[selectedImages[i]].filePath;
    imgHTMLElements[i].alt = allProducts[selectedImages[i]].titleAlt;
    imgHTMLElements[i].title = allProducts[selectedImages[i]].titleAlt;
  }
}

function displayResults() { //Displays the final results after all rounds are complete
  var attachMain = document.getElementById('results-display');
  attachMain.innerHTML = '';

  var getP;
  for (var i = 0; i < allProducts.length; i++) {
    getP = document.createElement('p');
    getP.innerHTML = `${allProducts[i].titleAlt} had <span class="bold">${allProducts[i].numberClicks} votes</span>, and was seen <span class="bold">${allProducts[i].numberDisplayed} times</span>`;

    attachMain.appendChild(getP);
  }

}

function clickHandler(event) {
  //Determine which product has the title of the event that was clicked.
  //search through each product until found, if not throw new error
  //console.log(event.target.title);

  if (event.target.title === 'button' || event.target.title === '' || event.target.title === undefined) {
    console.log('Image Not Selected');
    return;
  }


  for (var i = 0; i < allProducts.length; i++) {//Searches for the matching target title to titleAlt
    if (event.target.title === allProducts[i].titleAlt) {//if you find it, update the clicks and break the loop
      allProducts[i].numberClicks++;
      break;
    }

  }
  timesVoted++;
  //console.log(timesVoted, numberRounds);
  if (timesVoted >= numberRounds) { //If we exceed the number of authorized click, disable the event listener
    imageContainer.removeEventListener('click', clickHandler);
    displayChart();


  }
  else {
    generateThreeImages();
    displayImages();
  }
}



function chartTitleArray() {
  var titleArray = [];
  for (var i = 0; i < allProducts.length; i++) {
    titleArray.push(allProducts[i].titleAlt);
  }
  return titleArray;
}

function chartDataSetup() {
  var chartData = [];
  var chartViews = [];
  for (var i = 0; i < allProducts.length; i++) {
    chartData.push(allProducts[i].numberClicks);
    chartViews.push(allProducts[i].numberDisplayed);
  }
  return [chartData, chartViews];
}

function displayChart() {

  var densityCanvas = document.getElementById('myChart').getContext('2d');

  var chartData = chartDataSetup();
  var chartTitles = chartTitleArray();

  console.log(chartData[0], chartData[1], chartTitles);
  var voteInfo = {
    label: 'Number of Votes',
    data: chartData[0],
    backgroundColor: 'rgba(128,0,128, 0.6)',
    borderWidth: 0,
  };

  var viewInfo = {
    label: 'Amount Viewed',
    data: chartData[1],
    backgroundColor: 'rgba(0, 0, 255, 0.6)',
    borderWidth: 0,
    yAxisID: "y-axis-votes"
  };

  var productTitle = {
    labels: chartTitles,
    datasets: [voteInfo, viewInfo]
  };

  var chartOptions = {
    scales: {

      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        id: "y-axis-votes"
      },]
    }
  };

  var barChart = new Chart(densityCanvas,
    {
      type: 'bar',
      data: productTitle,
      options: chartOptions,

    });
}

function createNewObjects() {
  new Product('bathroom', 'img/bathroom.jpg'); // fileName, filePath
  new Product('bubblegum', 'img/bubblegum.jpg');
  new Product('dog-duck', 'img/dog-duck.jpg');
  new Product('pet-sweep', 'img/pet-sweep.jpg');
  new Product('sweep', 'img/sweep.png');
  new Product('usb', 'img/usb.gif');
  new Product('bag', 'img/bag.jpg');
  new Product('boots', 'img/boots.jpg');
  new Product('chair', 'img/chair.jpg');
  new Product('dragon', 'img/dragon.jpg');
  new Product('scissors', 'img/scissors.jpg');
  new Product('tauntaun', 'img/tauntaun.jpg');
  new Product('water-can', 'img/water-can.jpg');
  new Product('banana', 'img/banana.jpg');
  new Product('breakfast', 'img/breakfast.jpg');
  new Product('cthulhu', 'img/cthulhu.jpg');
  new Product('pen', 'img/pen.jpg');
  new Product('shark', 'img/shark.jpg');
  new Product('unicorn', 'img/unicorn.jpg');
  new Product('wine-glass', 'img/wine-glass.jpg');
}
//Local Storage Functions
function checkLocalStorage(storageKey) {
  var hasStorage;
  console.log('storageKey: ', storageKey);
  if (storageKey !== null) {
    hasStorage = true;
  } else
    hasStorage = false;
  return hasStorage;
}
function retrieveFromLocalStorage(storageKey) {
  var storedInfo = localStorage.getItem(storageKey); //should be allProducts
  if (storedInfo === null) {
    console.log('No data to retrieve.  Exiting Function');
    return;
  }
  var parsedStorage = JSON.parse(storedInfo);
  allProducts = [];
  for (var i = 0; i < parsedStorage.length; i++) {
    // parsedStorage[i].
  }

}
function saveToLocalStorage(storageKey = 'allProducts', arrayName = []) {
  var stringifyArray = JSON.stringify(arrayName);
  localStorage.setItem(storageKey, stringifyArray);

}
function firstRun() { //This will determine whether to build the objects, or pull from local storage
  var fromLocalStorage = localStorage.getItem('allProducts');
  var hasLocalStorage = checkLocalStorage(fromLocalStorage);
  //console.log('hasLocalStorage: ', hasLocalStorage);

  if (hasLocalStorage) {
    console.log('pulled from storage.  running function to instantiate all the literals.');
    ///create a function to instantiate all of the objects from the literals
  } else {
    createNewObjects();
    console.log('created new instances');
  }

}

firstRun();
console.log(allProducts);
saveToLocalStorage('allProducts', allProducts);

