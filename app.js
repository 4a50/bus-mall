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

function generateThreeImages() { //You will generate three different index numbers for me

  selectedImages = [];

  for (var i = 0; i < 3; i++) { //This loop will make three choices.
    var randomImageIndex = generateRandomNumber(allProducts.length);
    while (prevImageDisplay.includes(randomImageIndex)) {
      randomImageIndex = generateRandomNumber(allProducts.length);
    }
    prevImageDisplay.push(randomImageIndex);
    if (prevImageDisplay.length > 5) {
      prevImageDisplay.shift();

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

function getRadioButtonElement() {
  const rbs = document.querySelectorAll('input[name="choice"]');
  for (var i = 0; i < rbs.length; i++) {
    if (rbs[i].checked) {
      var grandParent = ((rbs[1].parentElement).parentElement);
      var imgElement = grandParent.getElementsByTagName('img');

      break;
    }

  }


  return imgElement[0].title;
}
function displayResults() { //Displays the final results after all rounds are complete

  var attachMain = document.getElementById('results-list');
  attachMain.innerHTML = '';

  var getP;
  for (var i = 0; i < allProducts.length; i++) {
    getP = document.createElement('li');
    getP.innerHTML = `${allProducts[i].titleAlt}: ${allProducts[i].numberClicks} votes`;

    attachMain.appendChild(getP);
  }

}

function clickHandler(event) {//event) {
  //Determine which product has the title of the event that was clicked.
  //search through each product until found, if not throw new error

  var radioTitle = getRadioButtonElement();
  if (!radioTitle) {
    console.log('Image Not Selected');
    return;
  }
  for (var i = 0; i < allProducts.length; i++) {//Searches for the matching target title to titleAlt
    if (radioTitle === allProducts[i].titleAlt) {//(event.target.title === allProducts[i].titleAlt) {//if you find it, update the clicks and break the loop
      allProducts[i].numberClicks++;
      break;
    }
  }
  timesVoted++;

  if (timesVoted >= numberRounds) { //If we exceed the number of authorized click, disable the event listener
    imageContainer.removeEventListener('click', clickHandler);
    displayResults();
    displayChart();
    //Save everything to local storage
    saveToLocalStorage(allProducts, 'allProducts');


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
// Create new instances
function createNewObjects() {
  allProducts = [];
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
function firstRun(storageKey) { //This will determine whether to build the objects, or pull from local storage
  var fromLocalStorage = localStorage.getItem(storageKey); //Attempt to retrieve storage
  var hasLocalStorage = checkLocalStorage(fromLocalStorage); //true or false

  if (hasLocalStorage) {
    console.log('pulled from storage.  running function to instantiate all the literals.');
    var parsedData = parseDataArray(fromLocalStorage); //Converted to JS from JSON
    rebuildInstancesFromObjLiteral(parsedData);

  } else {
    createNewObjects();
    console.log('created new instances');
  }
  //OUTCOME: allProducts Objects are created and populated.

}
function rebuildInstancesFromObjLiteral(objLiteralArray) {
  allProducts = [];
  var objectInstance;

  for (var i = 0; i < objLiteralArray.length; i++) {
    objectInstance = new Product(objLiteralArray[i].titleAlt, objLiteralArray[i].filePath);
    objectInstance.numberClicks = objLiteralArray[i].numberClicks;
    objectInstance.numberDisplayed = objLiteralArray[i].numberDisplayed;

  }
  console.log('rebuilt allProducts Array from objLiteral');
}

function checkLocalStorage(storageKey) {
  var hasStorage;

  if (storageKey === null) {
    hasStorage = false;
  } else
    hasStorage = true;
  return hasStorage;
}
function parseDataArray(retrievedDataArray) {  //Will output the parsedJSON array.
  if (retrievedDataArray === null) { //Another check to see if there is data
    console.log('No data to retrieve.  Exiting Function');
    return;
  }
  return JSON.parse(retrievedDataArray);
}
function saveToLocalStorage(arrayName = [], storageKey = 'allProducts') {

  var stringifyArray = JSON.stringify(arrayName);
  localStorage.setItem(storageKey, stringifyArray);
  console.log(`saved to Storage: ${stringifyArray}`);

}


firstRun('allProducts');
// //allProducts object array should be created.

// //Voting Functions:
generateThreeImages();
displayImages();

// //Event Listeners:
//imageContainer.addEventListener('click', clickHandler);
document.getElementById('disp-results').addEventListener('click', clickHandler);//displayResults);
