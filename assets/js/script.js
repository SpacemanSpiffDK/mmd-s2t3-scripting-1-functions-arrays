// JS by Dan Høegh
// UCN MMD 2019

window.onload = function () {
    generateFilterItems(3);
    initFilter();
}



function initFilter() {
    let filterLinks = document.querySelectorAll("ul#filterList a");
    for (let i = 0; i < filterLinks.length; i++) {
        filterLinks[i].addEventListener("click", function (event) {
            // alert(this.dataset.selector);
            event.preventDefault();
            filter(this.dataset.selector);
        });
    }
}

function filter(selector) {
    // hide all, show only elements with current selector
    addClass(".filterItem", "hide");
    removeClass(selector, "hide");
}

function addClass(targetSelector, className) {
    manipulateClass(targetSelector, className, true);
}

function removeClass(targetSelector, classname) {
    manipulateClass(targetSelector, classname, false);
}

function manipulateClass(targetSelector, className, isAdd) {
    targetSelector = targetSelector.trim();
    // check first character in targetSelector, if # it's an ID, if . it's a class, if neither it's a tag
    let targetFirstChar = targetSelector.substr(0, 1);
    switch (targetFirstChar) {
        case "#":
            // id
            // console.log("ID found");
            let elm = document.querySelector(targetSelector);
            if (isAdd) {
                elm.classList.add(className);
            } else {
                elm.classList.remove(className);
            }
            break;

        default:
            // must be class or tag
            // console.log("Class or tag found");
            let elms = document.querySelectorAll(targetSelector);
            for (let i = 0; i < elms.length; i++) {
                if (isAdd) {
                    elms[i].classList.add(className);
                } else {
                    elms[i].classList.remove(className);
                }
            }
            break;
    }
}

function generateFilterItems(amount){
    const colors = ["red", "green", "blue", "purple"];
    const shapes = ["square", "circle", "rounded"];
    let content = "";
    for (let i=0; i < amount; i++){
        // random color
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        let randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        content += `<div class="filterItem ${randomColor} ${randomShape}"></div>`;
    }
    
    // output to HTML
    document.querySelector("#jsFilterItems").innerHTML = content;
    generateFilter();
}

function generateFilter() {
    // create array of colors and shapes that have been generated
    // no double entries please!
    // output array as links and init them with initFilter()

    let filters = [];
    let filterItems = document.querySelectorAll(".filterItem");
    for (let i = 0; i < filterItems.length ; i++){
        let itemClassList = filterItems[i].classList;
        for (let j = 0; j < itemClassList.length; j++){
            if (itemClassList[j] != "filterItem"){
                // if class isn't already in list, let's push it there
                let currentClass = itemClassList[j];
                let currentClassFound = false;
                for (let k = 0; k < filters.length; k++){
                    if (filters[k] == currentClass){
                        currentClassFound = true;
                    }
                }
                if (!currentClassFound) {
                    filters.push(itemClassList[j]);
                }
            }
        }
    }
    console.log(filters);    
    // sort filters alpha
    filters.sort();
    filters.reverse();

    // output filters to HTML
    let content = `<li><a href="#" data-selector=".red, .green, .blue, .square, .circle, .rounded">all</a></li>`;
    for (let i = 0; i < filters.length; i++){
        content += `<li><a href="#" data-selector=".${filters[i]}">${filters[i]}</a></li>`;
    }
    document.querySelector("#filterList").innerHTML = content;
}
