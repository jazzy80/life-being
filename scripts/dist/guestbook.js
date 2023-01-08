"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const textlengthvalidator_1 = require("./classes/textlengthvalidator");
const alphanumvalidator_1 = require("./classes/alphanumvalidator");
const compositevalidator_1 = require("./classes/compositevalidator");
const overlay_1 = require("./utils/overlay");
const ADDCOMMENT_SELECTOR = ".add-comment";
const CANCELCOMMENT_SELECTOR = ".cancel-comment";
const SUBMITCOMMENT_SELECTOR = ".submit-comment";
const GUESTBOOKFORM_SELECTOR = ".guestbook-form";
const ERROR = "error";
const ERROR_COLOR = "red";
const NEUTRAL_COLOR = "black";
const GUESTBOOK_POST_URL = "/wp-json/api/guestbook/";
const TEXTMAXLENGTH = 200;
function init() {
    const form = getCommentForm();
    const nameField = document.querySelector(".input-name");
    const commentField = document.querySelector(".comment-text");
    const formFields = [nameField, commentField];
    const addCommentBtn = document.querySelector(ADDCOMMENT_SELECTOR);
    addCommentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showCommentModal(form, formFields);
    });
    const cancelCommentBtn = document.querySelector(CANCELCOMMENT_SELECTOR);
    cancelCommentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        removeCommentModal(form, formFields);
    });
    const submitCommentBtn = document.querySelector(SUBMITCOMMENT_SELECTOR);
    submitCommentBtn.addEventListener("click", (e) => {
        removeErrors();
        e.preventDefault();
        validateFormFields(form, formFields);
    });
}
function getCommentForm() {
    return document.querySelector(GUESTBOOKFORM_SELECTOR);
}
function showCommentModal(form, fields) {
    (0, overlay_1.addOverlay)();
    showForm(form);
    resetForm(fields);
}
function removeCommentModal(form, fields) {
    hideForm(form);
    (0, overlay_1.removeOverlay)();
    resetForm(fields);
}
function showForm(form) {
    form.style.display = "flex";
}
function hideForm(form) {
    form.style.display = "none";
}
function validateFormFields(form, fields) {
    const guestBookValidator = createGuestBookValidator();
    const invalidFields = fields.filter((field) => !guestBookValidator.validate(field));
    if (invalidFields.length === 0)
        return submitComment(form, fields);
    generateErrors(guestBookValidator, invalidFields);
}
function generateErrors(validator, fields) {
    fields.forEach((field) => {
        displayError(field, validator.getError(field));
    });
}
function createGuestBookValidator() {
    return new compositevalidator_1.CompositeValidator(new textlengthvalidator_1.TextLengthValidator(TEXTMAXLENGTH), new alphanumvalidator_1.AlphaNumValidator());
}
function submitComment(form, fields) {
    const body = fields.reduce((acc, field) => (Object.assign({ [field.name]: field.value }, acc)), {});
    fetch(GUESTBOOK_POST_URL, {
        method: "POST",
        body: JSON.stringify(body)
    }).then(() => {
        removeCommentModal(form, fields);
        location.reload();
    });
}
function displayError(field, errorMsg) {
    field.style.borderColor = ERROR_COLOR;
    const errorField = createErrorText(errorMsg);
    field.after(errorField);
}
function createErrorText(errorMsg) {
    const pElement = document.createElement("p");
    pElement.classList.add(ERROR);
    pElement.innerText = errorMsg;
    return pElement;
}
function resetForm(fields) {
    fields.forEach((field) => {
        field.value = "";
        field.style.borderColor = NEUTRAL_COLOR;
    });
    removeErrors();
}
function removeErrors() {
    const errorFields = document.getElementsByClassName(ERROR);
    Array.prototype.slice.call(errorFields).forEach((field) => field.remove());
}
init();
