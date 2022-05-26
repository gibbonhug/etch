'use strict';

import './style.css';

import {
    appendSiblings, createSimilarElems, getElem,
} from './function.js'


const etchContainer = getElem('etchContainer');
const etchContainerHeight = 80; // 80vh*80vh space for our etch-a-sketch

let etchDivArray = [];
let totalNumDiv = 0; // 0 before createEtchDivs
let currentColor = 'red'; // init


// divs are arranged in a square: input dimension as one side
function calcDivNumber(dimension) {
    return (dimension*dimension);
}

// want each etchDiv to take up same amount of space in 500*500 etchContainer
// (all etchDivs are squares)
function calcDivHeight(dimension) {
    return (etchContainerHeight / dimension);
}

// input is side length of the total square of etchDivs
function createEtchDivs(totalDimension) {
    // remove old divs
    removeEtchDivs();
    // calculate how many divs total we will make
    totalNumDiv = calcDivNumber(totalDimension); 
    // how large we want each div to be
    let eachDivHeight = calcDivHeight(totalDimension); 
    // reinit array to be new divs
    etchDivArray = createSimilarElems('div', totalNumDiv, ['etchDiv']);
    // add unique id's to the divs just because:
    for (let i = 0; i < totalNumDiv; i++) {
        etchDivArray[i].setAttribute('id', 'etchDiv' + i);
    }
    // set size on each div from the calculated height:
    etchDivArray.forEach(etchDiv => {
        etchDiv.style.height = eachDivHeight; // variable
        etchDiv.style.width = eachDivHeight; // variable
    });
    // event listener for mouseover to change bg to last color selected (red init):
    addEtchDivListeners(totalNumDiv, currentColor);
    // add column styling rules to the etchContainer grid:
    styleGrid(totalDimension, eachDivHeight);
    // put on page
    appendSiblings(etchContainer, etchDivArray);
}

// takes num of rows / cols from side length of etch div square
// then calculates how wide/long each row/col shuolud be
function styleGrid(totalDimension, eachDivHeight) {
    etchContainer.style.gridTemplateRows = `repeat(${totalDimension}, ${eachDivHeight}vh)`;
    etchContainer.style.gridTemplateColumns = // technically unneccesary
            `repeat(${totalDimension}, ${eachDivHeight}vh)`;
}

// broke when tried forEach
function addEtchDivListeners(numDiv, bgColor) {
    for (let i = 0; i < numDiv; i++) {
        etchDivArray[i].addEventListener('mouseover', () => {
            etchDivArray[i].style.backgroundColor = bgColor;
        });
    }
}

// broke when tried forEach
function removeEtchDivListeners(numDiv, oldColor) {
    for (let i = 0; i < numDiv; i++) {
        etchDivArray[i].removeEventListener('mouseover', () => {
            etchDivArray[i].style.backgroundColor = oldColor;
        });
    }
}

function removeEtchDivs() {
    etchDivArray.forEach(etchDiv => {
        etchDiv.remove();
    });    
}

// buttons :

const colorSelect = getElem('colorSelect');
// default options:
addColorsToSelect('red', 'orange', 'yellow', 'green', 'blue', 'purple',
        'white', 'black', 'gray');
// selecting a color for new mouseover,
// this also removes old listener:
colorSelect.addEventListener('change', (event) => {
    selectNewColor(totalNumDiv, event.currentTarget.value); 
});

function selectNewColor(numDiv, color) {
    removeEtchDivListeners(numDiv, currentColor); // this is the old color we are
            // now removing
    currentColor = color; // reinit color
    addEtchDivListeners(numDiv, color);
}

// input list of colors to add to the dropdown, by english name
function addColorsToSelect(...colors) {
    colors.forEach(color => {
        // capitalization:
        const colorStrLower = color.toLowerCase();
        const colorStrCapital = (color[0].toUpperCase()) + (color.slice(1));
        // create the option
        const colorOption = document.createElement('option');
        colorOption.value = colorStrLower;
        colorOption.text = colorStrCapital; // 'proper' capital for dropdown
        // add to the select list
        colorSelect.appendChild(colorOption);
    })
}


// change dimension of etch's: slider
const showSliderBtn = getElem('showSliderBtn');
const hideSliderBtn = getElem('hideSliderBtn');
const sliderContainer = getElem('sliderContainer');

showSliderBtn.addEventListener('click', toggleSliderHidden);
hideSliderBtn.addEventListener('click', toggleSliderHidden);

function toggleSliderHidden() {
    sliderContainer.classList.toggle('hidden');
    showSliderBtn.classList.toggle('hidden');
    hideSliderBtn.classList.toggle('hidden');
}

const slider = getElem('slider');
const sliderText = getElem('sliderText');

slider.oninput = function () {
    createEtchDivs(slider.value);
    sliderText.innerText = slider.value + 'x' + slider.value;
}


// Init: 16*16
createEtchDivs(16);
slider.value = 16;
sliderText.innerText = slider.value + 'x' + slider.value;