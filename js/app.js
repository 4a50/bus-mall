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
  if (timesVoted > numberRounds) { //If we exceed the number of authorized click, disable the event listener
    imageContainer.removeEventListener('click', clickHandler);
    displayChart();


  }
  else {
    generateThreeImages();
    displayImages();
  }
}

function chartColorPaletteSetup() { //color and border color setup returns colorArray and borderColorArray
  var colorPaletteNumElements = [];
  var borderColorPaletteNumElements = [];
  var t = 0;

  var colorPalette = ['rgba(0, 0, 255, 0.3)', //blue
    'rgba(255, 0, 0, 0.3)', //red
    'rgba(255, 255, 0, 0.3)',//yellow
    'rgba(0, 255, 0, 0.3)', //green
    'rgba(102, 0, 255, 0.3)', //purple
    'rgba(0,0,0,0.3)']; //black
  for (var i = 0; i < allProducts.length; i++) {
    colorPaletteNumElements.push(colorPalette[t]);
    t++;
    if (t >= colorPalette.length) { t = 0; }
  }

  borderColorPaletteNumElements = [];
  var borderColorPalette = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];
  t = 0;
  for (var j = 0; j < allProducts.length; j++) {
    borderColorPaletteNumElements.push(borderColorPalette[t]);
    t++;
    if (t >= colorPalette.length) { t = 0; }
  }
  return [colorPaletteNumElements, borderColorPaletteNumElements];
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
  for (var i = 0; i < allProducts.length; i++) {
    chartData.push(allProducts[i].numberClicks);
  }
  return chartData;
}

function displayChart() {



  var graphColors = chartColorPaletteSetup();
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartTitleArray(),
      datasets: [{
        label: '# of Votes',
        data: chartDataSetup(),
        backgroundColor: graphColors[0],
        borderColor: graphColors[1],
        borderWidth: 3
      }]
    },
    options: {
      legend: {
        labels: {
          fontSize: 30,
          fontColor: 'purple',

          scales: {
            xAxes: [{
              ticks: {
                fontSize: 30,
                fontColor: 'purple'
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontSize: 24,
                fontColor: 'purple'
              }
            }]
          }
        }
      }
    }
  });
}
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


generateThreeImages();
displayImages();
//TODO: Appears that clicking the results button or off the image will result in the clickHandler being activate.  If statement not catching it in function.
imageContainer.addEventListener('click', clickHandler);
document.getElementById('disp-results').addEventListener('click', displayResults);
