'use strict';

import {
    appendSiblings, createSimilarElems,
} from './function.js'


const etchContainer = document.getElementById('etchContainer');
const etchContainerHeight = 500; // 500*500 space for our etch-a-sketch

let etchDivArray = [];
let totalNumDiv;
let currentColor = 'red'; // init

// divs are arranged in a square
function calcDivNumber(dimension) {
    return (dimension*dimension);
}

// want each etchDiv to take up same amount of space in 500*500 etchContainer
// all etchDivs are squares
function calcDivHeight(dimension) {
    return Math.floor(etchContainerHeight / dimension);
}

function createEtchDivs(totalDimension) {
    // remove old divs
    removeEdgeDivs();
    // calculate how many divs total we will make
    totalNumDiv = calcDivNumber(totalDimension); 
    // calculate how large we want each div to be
    let eachDivHeight = calcDivHeight(totalDimension); 
    // reinit array to be new divs
    etchDivArray = [];
    etchDivArray = createSimilarElems('div', totalNumDiv, ['etchDiv']);
    // add unique id's to the divs just because:
    for (let i = 0; i < totalNumDiv; i++) {
        etchDivArray[i].setAttribute('id', 'etchDiv' + i);
    }
    // set size from calculated height:
    etchDivArray.forEach(etchDiv => {
        etchDiv.style.height = eachDivHeight; // variable
        etchDiv.style.width = eachDivHeight; // variable
    });
    // event listener for mouseover to change bg to last color selected (red init):
    addEdgeDivListeners(totalNumDiv, currentColor);
    // add column styling rules to the etchContainer grid:
    styleGrid(totalDimension, eachDivHeight);
    // put on page
    appendSiblings(etchContainer, etchDivArray);

}

function styleGrid(totalDimension, eachDivHeight) {
    etchContainer.style.gridTemplateRows = `repeat(${totalDimension}, ${eachDivHeight}px)`;
    etchContainer.style.gridTemplateColumns = // technically unneccesary
            `repeat(${totalDimension}, ${eachDivHeight}px)`;
}

function addEdgeDivListeners(numDiv, bgColor) {
    for (let i = 0; i < numDiv; i++) {
        etchDivArray[i].addEventListener('mouseover', () => {
            etchDivArray[i].style.backgroundColor = bgColor;
        });
    }
}

function removeEdgeDivListeners(numDiv, oldColor) {
    for (let i = 0; i < numDiv; i++) {
        etchDivArray[i].removeEventListener('mouseover', () => {
            etchDivArray[i].style.backgroundColor = oldColor;
        });
    }
}

function removeEdgeDivs() {
    etchDivArray.forEach(etchDiv => {
        etchDiv.remove();
    });    
}

// buttons 

const add9Btn = document.getElementById('add9Btn');
add9Btn.addEventListener('click', () => {
    createEtchDivs(3);
})

const removeBtn = document.getElementById('removeBtn');
removeBtn.addEventListener('click', removeEdgeDivs);


const colorSelect = document.getElementById('colorSelect');
addColorsToSelect('red', 'orange', 'yellow', 'green', 'blue', 'purple',
        'white', 'black', 'gray');
colorSelect.addEventListener('change', (event) => {
    console.log('pain');
    let selectedColor = event.currentTarget.value;
    // this also removes old listener:
    selectMouseoverColor(totalNumDiv, selectedColor); 
});

function selectMouseoverColor(numDiv, color) {
    removeEdgeDivListeners(numDiv, currentColor); // this is the old color we are
            // now removing
    console.log(currentColor);
    currentColor = color; // reinit color
    console.log(currentColor);
    addEdgeDivListeners(numDiv, color);
}

// input list of colors to add to the dropdown, by english name
function addColorsToSelect(...colors) {
    colors.forEach(color => {
        // capitalization:
        let colorStrLower = color.toLowerCase();
        let colorStrCapital = (color[0].toUpperCase()) + (color.slice(1));
        // create the option
        let colorOption = document.createElement('option');
        colorOption.value = colorStrLower;
        colorOption.text = colorStrCapital;
        // add to the select list
        colorSelect.appendChild(colorOption);
    })
}


// Init: 16*16
createEtchDivs(16);