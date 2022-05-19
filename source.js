'use strict';

import {
    appendSiblings, createSimilarElems,
} from './function.js'


const container = document.getElementById('container');
const containerHeight = 500; // 500*500 space for our etch-a-sketch
let etchDivArray = [];

// divs are arranged in a square
function calcDivNumber(dimension) {
    return (dimension*dimension);
}

// want each etchDiv to take up same amount of space in 1000*1000 container
// all etchDivs are squares
function calcDivHeight(dimension) {
    return Math.floor(containerHeight / dimension);
}

function createEtchDivs(totalDimension) {
    // remove old divs
    removeEdgeDivs();
    // calculate how many divs total we will make
    let totalNumDiv = calcDivNumber(totalDimension); 
    // calculate how large we want each div
    let eachDivHeight = calcDivHeight(totalDimension); 
    // reinit array to be new divs
    etchDivArray = [];
    etchDivArray = createSimilarElems('div', totalNumDiv, ['etchDiv']);
    // add unique id's to the divs just because:
    for (let i = 0; i < totalNumDiv; i++) {
        etchDivArray[i].setAttribute('id', 'etchDiv' + i);
    }
    // set size from calculated divHeight, and add text content:
    etchDivArray.forEach(etchDiv => {
        etchDiv.style.height = eachDivHeight; // variable
        etchDiv.style.width = eachDivHeight; // variable
    });
    // event listener for mouseover to change bg to green for now:
    addEdgeDivListeners(totalNumDiv, 'green');

    // add column styling rules to the container grid:
    styleGrid(totalDimension, eachDivHeight);
    // put on page
    appendSiblings(container, etchDivArray);

}

function styleGrid(totalDimension, eachDivHeight) {
    container.style.gridTemplateRows = `repeat(${totalDimension}, ${eachDivHeight}px)`;
    container.style.gridTemplateColumns = // technically unneccesary
            `repeat(${totalDimension}, ${eachDivHeight}px)`;
}

function addEdgeDivListeners(numDiv, bgColor) {
    for (let i = 0; i < numDiv; i++) {
        etchDivArray[i].addEventListener('mouseover', () => {
            etchDivArray[i].style.backgroundColor = bgColor;
        });
    }
}

function removeEdgeDivs() {
    etchDivArray.forEach(etchDiv => {
        etchDiv.remove();
    });    
}

// Init: 16*16
createEtchDivs(16);


// buttons 


const add9Btn = document.getElementById('addBtn');
add9Btn.addEventListener('click', () => {
    createEtchDivs(3);
})

const removeBtn = document.getElementById('removeBtn');
btn.addEventListener('click', removeEdgeDivs);


const colorBtn = document.getElementById('colorBtn');