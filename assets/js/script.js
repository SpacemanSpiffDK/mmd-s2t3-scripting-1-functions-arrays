// JS by Dan Høegh
// UCN MMD 2019

const data = {
    
}


function manipulateClass(targetSelector, className, isAdd) {
    let error = "";
    if (targetSelector == undefined || targetSelector.trim() == "") {
        error += "Missing targetSelector (string expected) ";
    }
    if (className == undefined || className.trim() == "") {
        error += "Missing className (string expected) ";
    }
    if (isAdd == undefined) {
        error += "Missing add/remove (boolean expected) ";
    }

    if (error.trim() == "") { // no errors, let's do this!
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

    } else {
        console.log("Error in manipulateClass: " + error);
    }
}

function addClass(targetSelector, className) {
    manipulateClass(targetSelector, className, true);
}

function removeClass(targetSelector, classname) {
    manipulateClass(targetSelector, classname, false);
}


function initFilter() {
    let filterLinks = document.querySelectorAll("ul#filterList a");
    for (let i = 0; i < filterLinks.length; i++) {
        filterLinks[i].addEventListener("click", function () {
            // alert(this.dataset.selector);
            filter(this.dataset.selector);
        });
    }
}


function filter(selector) {
    // hide all, show only elements with current selector
    addClass(".filter", "hide");
    removeClass(selector, "hide");
}

window.onload = function () {
    initFilter();
}