'use strict';

import {
    appendSiblings, createSimilarElems,
} from './function.js'


const btn = document.getElementById('btn');
btn.addEventListener('click', removeEdgeDivs);

const container = document.getElementById('container');
const containerHeight = 1000; // 1000*1000 space for our etch-a-sketch
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

function createEtchDivs(dimension) {
    // remove old divs
    removeEdgeDivs();
    // calculate how many divs total we will make
    let totalNumDiv = calcDivNumber(dimension); 
    // calculate how large we want each div
    let divHeight = calcDivHeight(dimension); 
    // reinit array to be new divs
    etchDivArray = [];
    etchDivArray = createSimilarElems('div', totalNumDiv, ['etchDiv']);
    // add unique id's to the divs just because:
    for (let i = 0; i < totalNumDiv; i++) {
        etchDivArray[i].setAttribute('id', 'etchDiv' + i);
    }
    // set size from calculated divHeight, and add text content:
    etchDivArray.forEach(etchDiv => {
        etchDiv.style.height = divHeight; // variable
        etchDiv.style.width = divHeight; // variable
        etchDiv.innerText = 'hello div' // remove this later
    });
    // event listener for mouseover to change bg to green for now:
    addEdgeDivListeners(totalNumDiv, 'green');
    // put on page
    appendSiblings(container, etchDivArray);

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
