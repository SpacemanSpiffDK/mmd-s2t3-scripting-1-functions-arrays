// JS by Dan Høegh
// UCN MMD 2019

window.onload = function () {
    generateItems(64);
    initFilter();
}

function initFilter() {
    // purpose of this function:
    // add eventlisteners to the filter a-tags
    // call filter if element is clicked, pass the value of data-selector as parameter

    let filterLinks = document.querySelectorAll("ul#filterList a"); // create an array with all the a-tags inside ul#filterList
    for (let i = 0; i < filterLinks.length; i++) { // loop through the filterLinks array
        filterLinks[i].addEventListener("click", function (event) { // add eventlistener for each of the array items
            // alert(this.dataset.selector);
            event.preventDefault(); // prevent adding an unintentional # in the url
            filter(this.dataset.selector); // call the filter function
        });
    }
}

function manipulateClass(targetSelector, className, isAdd) {
    // purpose of this function:
    // this is a helper function that adds or removes (isAdd) a class name (className) to all elements that fits targetSelector (used in the same way as a css selector)
    
    // check first character in targetSelector, if # it's an ID, if . it's a class, if neither it's a tag
    let targetFirstChar = targetSelector.substr(0, 1); // get first character of targetSelector, put it in the targetFirstChar variable
    
    // 2 options: either it's an ID (8)starts with #, use querySelector) OR it's a class or tag (use querySelectorAll)
    
    if (targetFirstChar == "#") { // it's an id
        let elm = document.querySelector(targetSelector); // find the matching element
        if (isAdd) { // check isAdd, if true, then we should add the className
            elm.classList.add(className); // add className to the classList on the element
        } else { // if false, then we should remove the className
            elm.classList.remove(className); // remove className from the classList on the element
        }
    } else { // must be class or tag
        let elms = document.querySelectorAll(targetSelector); // create an array with the matching elements
        for (let i = 0; i < elms.length; i++) { // loop through the array of elements
            if (isAdd) { // check isAdd, if true, then we should add the className
                elms[i].classList.add(className); // add className to the classList on the current element
            } else { // if false, then we should remove the className
                elms[i].classList.remove(className); // remove className from the classList on the current element
            }
        }
    }
}

function addClass(targetSelector, className) { 
    // purpose of this function:
    // helper function, that makes it easier to use the manipulateClass function
    manipulateClass(targetSelector, className, true);
}

function removeClass(targetSelector, classname) {
    // purpose of this function:
    // helper function, that makes it easier to use the manipulateClass function
    manipulateClass(targetSelector, classname, false);
}

function filter(selector) {
    // purpose of this function:
    // hide all colored shapes, show only elements with current selector
    addClass(".item", "hide"); // add the class "hide" on all elements with the ".item" class
    removeClass(selector, "hide"); // remove the "hide" class from all elements that match the value of the selector variable (string)
}

function generateItems(amount){
    // purpose of this function:
    // generate random items, that each have a color class and a shape class

    // set two arrays with our color and shape values
    const colors = ["red", "green", "blue", "purple", "magenta", "orange"];
    const shapes = ["square", "circle", "rounded"];

    let content = ""; // initiate a content variable, we're gonna output this to HTML later
    for (let i=0; i < amount; i++){ // create as many items (colored shapes) as amount is set to
        let randomColor = colors[Math.floor(Math.random() * colors.length)]; // random color
        let randomShape = shapes[Math.floor(Math.random() * shapes.length)]; // random shape
        content += `<div class="item ${randomColor} ${randomShape}"></div>`; // add div to output string - random color and shape added as class names
    }
    
    // output to HTML
    document.querySelector("#jsFilterItems").innerHTML = content;
    // after we've created the random items, lets create filters for whatever random stuff came up
    generateFilter();
}

function generateFilter() {
    // purpose of this function:
    // create array with the values of the colors and shapes that have been generated in the item list
    // no double entries please!
    // output array as links and init them with initFilter()

    let filters = []; // create an array that is going to store the filter names
    let filterItems = document.querySelectorAll(".item"); // grab all the items (colored shapes) to an array 
    for (let i = 0; i < filterItems.length ; i++){ // go through the array of colored/shaped items
        let itemClassList = filterItems[i].classList; // renaming the current items classList for clarity - this is an array!
        for (let j = 0; j < itemClassList.length; j++){ // go through the classList array for the current item
            if (itemClassList[j] != "item"){ // we don't want to include the "item" class. This class only exist for us to find the items
                let currentClass = itemClassList[j]; // renaming for clarity (example: currentClass could now be "red")
                let currentClassFound = false; // to avoid repeats of the classes we initiate an "already here!" boolean. False by default
                for (let k = 0; k < filters.length; k++){ // we loop through filters to check if the classname we found is already there
                    if (filters[k] == currentClass){ // If the current item in filters is equal to the currentClass we set currentClassFound to true
                        currentClassFound = true;
                    }
                }
                if (!currentClassFound) { // if class isn't already in filters array, let's push it there
                    filters.push(itemClassList[j]); // push the current classname to the filters array
                }
            }
        }
    }
    // console.log(filters);    

    filters.sort(); // sort filters alphabetically

    // filterClassList should end up looking something like this: ".red, .green, .blue, .square, .circle, .rounded"
    let filterClassList = ""; // new empty string variable
    for (let i = 0; i < filters.length; i++){ 
        filterClassList += `.${filters[i]}, `; // add a ".name, " for each of the items in the filters array 
    }
    filterClassList = filterClassList.substr(0,filterClassList.length - 2); // remove the last 2 characters (there's a ", " that needs to be removed)
    let content = `<li><a href="#" data-selector="${filterClassList}" class="filterAll">all</a></li>`; // make a "all" filter button at the beginning of the filters
    for (let i = 0; i < filters.length; i++){
        content += `<li><a href="#" data-selector=".${filters[i]}">${filters[i]}</a></li>`; // add a <li> for each filter item, writing name as a class in data-selector and as a name
    }
    // output filters to HTML
    document.querySelector("#filterList").innerHTML = content;
}