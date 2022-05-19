/*
Element generating functions as well as isPositiveInt function
*/

/* Append a set of elements to the same parent
Parameters can be elements or arrays of elements
Returns an array of these siblings elements */
function appendSiblings(elemParent, ...elemSiblings) {
    let siblingArray = [];
    elemSiblings.forEach(elem => { 
        if (Array.isArray(elem)) { // passing in array of siblings
            appendSiblings(elemParent, ...elem);
            return; // do not attempt to append array itself
        }
        elemParent.appendChild(elem);
        siblingArray.push(elem);
    });
    return siblingArray;
}

/* Add multiple classes to one element
Class parameters can be array of classes or classes
Returns the element itself */
function addMultipleClasses(elem, ...elemClasses) {
    elemClasses.forEach((elemClass) => {
        if (Array.isArray(elemClass)) { // passing in arrays of classes
            addMultipleClasses(elem, ...elemClass);
            return; // do not add array as a class
        }
        elem.classList.add(elemClass);
    });
    return elem;
}

/* input a single element and multiple classes to remove
Class parameters can be array of classes or classes
returns this element */
function removeMultipleClasses(elem, ...elemClasses) {
    elemClasses.forEach((elemClass) => {
        if (Array.isArray(elemClass)) { // if inputting an array of classes as a param
            removeMultipleClasses(elem, ...elemClass);
            return; // do not attempt to remove full array as a class
        }
        elem.classList.remove(elemClass);
    });
    return elem;
}


/* add a class for an inputted array of elements
dependant upon addMultipleClasses
Returns the element array itself */

function addClassesToArray(elemArray, ...elemClasses) {
    elemArray.forEach((elem) => {
        addMultipleClasses(elem, elemClasses);
    });
    return elemArray;
}

/* remove a class for an inputted array of elements
dependant upon removeMultipleClasses
Returns the element array itself */
function removeClassesFromArray(elemArray, ...elemClasses) {
    elemArray.forEach((elem) => {
        removeMultipleClasses(elem, elemClasses);
    });
    return elemArray;
}

/* input a tag, number of elems to generate, array of
        classes to add, and id's
classes MUST be an array due to ability to
        input specific id parameters
returns an array of these new elements */
function createSimilarElems(tagName, numElem, classArray, ...elemIdList) {
    let valid = true;
    // mandatory parameters
    if (tagName === undefined) {
        valid = false;
    }
    if (!isPositiveInteger(numElem)) {
        numElem = 0;
    }

    // if attempting to add less elements
            // than # of ids inputted, will default to amount of id
    if ( (numElem <= elemIdList.length)) {
        if (elemIdList.length === 0) { // no id's passed into func
            valid = false;
        }
        numElem = elemIdList.length;
    }

    let similarElemArray = [];
    let currentElem;
    if (!valid) {
        similarElemArray.push('invalid input to createSimilarElems');
    } else {
        for (let currentIndex = 0; currentIndex < numElem; currentIndex++) {
            currentElem = document.createElement(tagName); // create elem
            if (elemIdList[currentIndex] !== undefined) { // set its id if exists
                currentElem.setAttribute('id', elemIdList[currentIndex]);
            }
            addMultipleClasses(currentElem, classArray); // add the input classes
            similarElemArray.push(currentElem);
        }
    }
    return similarElemArray;
}

// clear inner text of array of (for ex.) paragraphs
function clearArrayInnerText(array) {
    array.forEach(elem => {
        elem.innerText = '';
    })
}

// Returns a bool of if passed input is positive integer
function isPositiveInteger(num) {
    if (Number.isInteger(num) && num > 0) {
        return true;
    } else {
        return false;
    }
}

export {
    appendSiblings, addMultipleClasses, addClassesToArray, removeMultipleClasses, removeClassesFromArray, createSimilarElems, isPositiveInteger, clearArrayInnerText
}