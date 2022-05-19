'use strict';

import {
    appendSiblings, createSimilarElems,
} from './function.js'

const container = document.getElementById('container');
// create 256 (16*16)'etchDivs' :
const etchDivArray = createSimilarElems('div', 256, ['etchDiv']);
// add unique id's to the divs just because:
for (let i = 0; i < etchDivArray.length; i++) {
    etchDivArray[i].setAttribute('id', 'etchDiv' + i);
}
// add content inside to see them better:
etchDivArray.forEach(etchDiv => {
    etchDiv.innerText = 'hello div'
});

appendSiblings(container, etchDivArray); // put etchDivs in container

// event listener for mouseover to change bg:
for (let i = 0; i < etchDivArray.length; i++) {
    etchDivArray[i].addEventListener('mouseover', () => {
        etchDivArray[i].style.backgroundColor = 'green';
    });
}

const height = (1000);
let totalRows = 16;
let calculatedHeight = Math.floor(height / totalRows);
console.log(calculatedHeight);