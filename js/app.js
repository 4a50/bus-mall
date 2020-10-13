'use strict';
var numberRounds = 25;
var allProducts = [];
var prevImageDisplay = [];
var selectedImages = [];

function Product(fileName, filePath) {
  this.title = fileName;
  this.filePath = filePath;
  this.alt = fileName;
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
      /// prevSelected[] has one of the random number in it
      /// also if the prevImageDisplay[] has one of the numbers in it.
      var randomImageIndex = generateRandomNumber(allProducts.length);
      if (selectedImages.includes(randomImageIndex) && prevImageDisplay.includes(randomImageIndex)) {
        randomImageIndex = generateRandomNumber(allProducts.length);
      } else {
        areConditionsTrue = true;
      }
    }
    selectedImages.push(randomImageIndex); //add the image index to one of the three to be used    
  }
}

function displayImages() {
  var imgHTMLElements = [document.getElementById('image-1'), document.getElementById('image-2'), document.getElementById('image-3')];
  for (var i = 0; i < selectedImages.length; i++) {
    imgHTMLElements[i].src = allProducts[selectedImages[i]].filePath;

    debugger;
  }
}

new Product('bathroom', 'img/bathroom.jpg'); // fileName, filePath
new Product('bubblegum', 'img/bubblegum');
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
debugger;
generateThreeImages();
displayImages();

