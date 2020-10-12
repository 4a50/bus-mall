'use strict';
var numberRounds = 25;
var allProducts = [];
var prevImageDisplay = []

function Product(fileName, filePath) {
  this.title = fileName;
  this.filePath = filePath;
  this.alt = fileName;
  this.numberClicks = 0;
  this.numberDisplayed = 0;
  allProducts.push(allProducts);
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/// Grab three Random images <=Function
/// Cannot be any previously display
/// Cannot have any repeated.
/// RESULT: Three images that can be displayed.

function generateThreeImages() {
  var selected = [];
  for (var i = 0; i < 3; i++) { //This loop will make three choices.

    while (selected.includes(randomImageIndex) && prevImageDisplay.includes(randomImageIndex)) {
      ///keep looping if:
      /// prevSelected[] has one of the random number in it
      /// also if the prevImageDisplay[] has one of the numbers in it.
      var randomImageIndex = generateRandomNumber(allProducts.length);
    }
    selected.push(randomImageIndex); //add the image index to one of the three to be used
  }
  console.log(selected, prevImageDisplay); //See what's up
}
new Product('bathroom', 'img/bathroom.jpg'); // fileName, filePath
new Product('bubblegum','img/bubblegum');
new Product('dog-duck','img/dog-duck.jpg');
new Product('pet-sweep','img/pet-sweep.jpg');
new Product('sweep','img/sweep.png');
new Product('usb','img/usb.gif');
new Product('wireframe','img/wireframe.png');
new Product('bag','img/bag.jpg');
new Product('boots','img/boots.jpg');
new Product('chair','img/chair.jpg');
new Product('dragon','img/dragon.jpg');
new Product('scissors','img/scissors.jpg');
new Product('tauntaun','img/tauntaun.jpg');
new Product('water-can','img/water-can.jpg');
new Product('banana','img/banana.jpg');
new Product('breakfast','img/breakfast.jpg');
new Product('cthulhu','img/cthulhu.jpg');
new Product('pen','img/pen.jpg');
new Product('shark','img/shark.jpg');
new Product('unicorn','img/unicorn.jpg');






generateThreeImages();
