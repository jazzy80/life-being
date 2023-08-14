"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextLengthValidator_1 = require("./validators/TextLengthValidator");
const AlphanumericValidator_1 = require("./validators/AlphanumericValidator");
const CompositeValidator_1 = require("./validators/CompositeValidator");
const overlay_1 = require("./utils/overlay");
const GuestBookRepository_1 = require("./api/repositories/GuestBookRepository");
const ADD_COMMENT_SELECTOR = ".add-comment";
const CANCEL_COMMENT_SELECTOR = ".cancel-comment";
const SUBMIT_COMMENT_SELECTOR = ".submit-comment";
const GUEST_BOOK_FORM_SELECTOR = ".guestbook-form";
const ERROR = "error";
const ERROR_COLOR = "red";
const NEUTRAL_COLOR = "black";
const TEXT_MAX_LENGTH = 200;
function init() {
    const form = getCommentForm();
    const nameField = document.querySelector(".input-name");
    const commentField = document.querySelector(".comment-text");
    const formFields = [nameField, commentField];
    const addCommentBtn = document.querySelector(ADD_COMMENT_SELECTOR);
    addCommentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showCommentModal(form, formFields);
    });
    const cancelCommentBtn = document.querySelector(CANCEL_COMMENT_SELECTOR);
    cancelCommentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        removeCommentModal(form, formFields);
    });
    const submitCommentBtn = document.querySelector(SUBMIT_COMMENT_SELECTOR);
    submitCommentBtn.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
        removeErrors();
        e.preventDefault();
        if (validateFormFields(formFields)) {
            yield submitComment(form, formFields);
        }
    }));
}
function getCommentForm() {
    return document.querySelector(GUEST_BOOK_FORM_SELECTOR);
}
function showCommentModal(form, fields) {
    overlay_1.addOverlay();
    showForm(form);
    resetForm(fields);
}
function removeCommentModal(form, fields) {
    hideForm(form);
    overlay_1.removeOverlay();
    resetForm(fields);
}
function showForm(form) {
    form.style.display = "flex";
}
function hideForm(form) {
    form.style.display = "none";
}
function validateFormFields(fields) {
    const guestBookValidator = createGuestBookValidator();
    const invalidFields = fields.filter((field) => !guestBookValidator.validate(field));
    if (invalidFields.length === 0)
        return true;
    generateErrors(guestBookValidator, invalidFields);
    return false;
}
function generateErrors(validator, fields) {
    fields.forEach((field) => {
        displayError(field, validator.getError(field));
    });
}
function createGuestBookValidator() {
    return new CompositeValidator_1.CompositeValidator(new TextLengthValidator_1.TextLengthValidator(TEXT_MAX_LENGTH), new AlphanumericValidator_1.AlphanumericValidator());
}
function submitComment(form, fields) {
    return __awaiter(this, void 0, void 0, function* () {
        // Process the form fields into an object with the field name as the key and the field value as the object's value.
        const keyValueFields = fields.reduce((result, field) => (Object.assign(Object.assign({}, result), { [field.name]: field.value })), {});
        const guestBookEntry = { name: keyValueFields["name"], comment: keyValueFields["comment"] };
        yield new GuestBookRepository_1.GuestBookRepository().submitGuestBookEntry(guestBookEntry);
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
//# sourceMappingURL=guestbook.js.map