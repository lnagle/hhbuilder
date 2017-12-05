/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable object-shorthand */

var addButton, ageInput, debugElement, household, householdElement, isSmokerInput, relationshipInput, submitButton;

addButton = document.getElementsByTagName("button")[0];
ageInput = document.getElementsByName("age")[0];
debugElement = document.getElementsByClassName("debug")[0];
householdElement = document.getElementsByClassName("household")[0];
isSmokerInput = document.getElementsByName("smoker")[0];
relationshipInput = document.getElementsByName("rel")[0];
submitButton = document.getElementsByTagName("button")[1];

addButton.onclick = createOnClick(add);
submitButton.onclick = createOnClick(submit);

household = [];


function add() {
    var age, isSmoker, relationship;

    age = ageInput.value;
    isSmoker = isSmokerInput.checked;
    relationship = relationshipInput[relationshipInput.selectedIndex].value;

    if (isValidAge(age) && relationship) {
        addHouseholdMember(age, isSmoker, relationship);
        updateWorkingList();
    } else {
        alert("Oh no, something went wrong! \nPlease be sure to select a relationship and provide an age that is greater than zero.");
    }
}


/**
 * @param {number} age
 * @param {boolean} isSmoker
 * @param {string} relationship
 */
function addHouseholdMember(age, isSmoker, relationship) {
    household.push({
        age: age,
        isSmoker: isSmoker,
        relationship: relationship
    });
}


/**
 * @param {number} i
 * @return {HTMLElement}
 */
function createMemberLi(i) {
    var li, removeButton, text;

    li = document.createElement("li");
    text = document.createTextNode(JSON.stringify(household[i]));

    removeButton = document.createElement("input");
    removeButton.type = "button";
    removeButton.value = "remove";
    removeButton.onclick = createRemoveButton(i);

    li.append(removeButton);
    li.appendChild(text);

    return li;
}


/**
 * @param {Function} callback
 * @return {Function}
 */
function createOnClick(callback) {
    return function (event) {
        event.preventDefault();

        callback();
    };
}


/**
 * @param {number} id
 * @return {Function}
 */
function createRemoveButton(id) {
    return function () {
        household.splice(id, 1);
        updateWorkingList();
    };
}


/**
 * @param {number} age
 * @return {boolean}
 */
function isValidAge(age) {
    return age && age > 0;
}


function submit() {
    debugElement.textContent = JSON.stringify(household);
    debugElement.style.display = "initial";
}


function updateWorkingList() {
    var i, memberLi;

    householdElement.innerHTML = "";

    for (i = 0; i < household.length; i += 1) {
        memberLi = createMemberLi(i);
        householdElement.appendChild(memberLi);
    }
}
