'use strict';

import {
    appendSiblings, createSimilarElems,
} from './function.js'

const container = document.getElementById('container');
const containerHeight = 1000; // 1000*1000 space for our etch-a-sketch
let etchDivArray = [];

// want each etchDiv to take up same amount of space in 1000*1000 container
// all etchDivs are squares
function calcDivHeight(dimension) {
    return Math.floor(containerHeight / dimension);
}

function createEtchDivs(dimension) {
    // calculate how many divs total we will make
    let totalNumDiv = dimension * dimension; 
    // calculate how large we want each div
    let divHeight = calcDivHeight(dimension); 
    // redo array to be new divs
    etchDivArray = createSimilarElems('div', totalNumDiv, ['etchDiv']);
    // add unique id's to the divs just because:
    for (let i = 0; i < totalNumDiv; i++) {
        etchDivArray[i].setAttribute('id', 'etchDiv' + i);
    }
    // set size from calculated divHeight, and inner content:
    etchDivArray.forEach(etchDiv => {
        etchDiv.innerText = 'hello div' // remove this later
        etchDiv.style.height = divHeight; // variable
        etchDiv.style.width = divHeight; // variable
    });
    // event listener for mouseover to change bg:
    for (let i = 0; i < totalNumDiv; i++) {
        etchDivArray[i].addEventListener('mouseover', () => {
            etchDivArray[i].style.backgroundColor = 'green';
        });
    }
    console.log(etchDivArray);
    // put on page
    appendSiblings(container, etchDivArray);

}

// Init:
createEtchDivs(16);

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    etchDivArray.forEach(etchDiv => {
        etchDiv.remove();
    });    
})