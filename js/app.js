'use strict';
var numberRounds = 2;
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
  prevImageDisplay = selectedImages;
  selectedImages = [];
  var areConditionsTrue;
  for (var i = 0; i < 3; i++) { //This loop will make three choices.
    areConditionsTrue = false;
    while (!areConditionsTrue) {
      ///keep looping if:
      /// selectedImages one of the random numbers in it
      /// also if the prevImageDisplay[] has one of the numbers in it.
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
  allProducts[indexNum].numberDisplayed++

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
  debugger;
  console.log(attachMain);
  var getP;
  for (var i = 0; i < allProducts.length; i++) {
    getP = document.createElement('h4');
    getP.innerText = `${allProducts[i].titleAlt} had ${allProducts[i].numberClicks} votes, and was seen ${allProducts[i].numberDisplayed} times`;

    attachMain.appendChild(getP);
  }

}

function clickHandler(event) {
  //Determine which product has the title of the event that was clicked.
  //search through each product until found, if not throw new error
  console.log('allProducts: ', allProducts.length);
  for (var i = 0; i < allProducts.length; i++) {  //Searches for the matching target title to titleAlt
    if (event.target.title === allProducts[i].titleAlt) {  //if you find it, update the clicks and break the loop
      allProducts[i].numberClicks++;
      break;
    }

  }
  timesVoted++;
  console.log(timesVoted);
  if (timesVoted > numberRounds) {  //If we exceed the number of authorized click, disable the event listener
    imageContainer.removeEventListener('click', clickHandler);
    displayResults();
  }
  else {
    generateThreeImages();
    displayImages();
  }
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

imageContainer.addEventListener('click', clickHandler);


