"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var textlengthvalidator_1 = require("./classes/textlengthvalidator");
var alphanumvalidator_1 = require("./classes/alphanumvalidator");
var compositevalidator_1 = require("./classes/compositevalidator");
var overlay_1 = require("./utils/overlay");
var ADDCOMMENT_SELECTOR = '.add-comment';
var CANCELCOMMENT_SELECTOR = '.cancel-comment';
var SUBMITCOMMENT_SELECTOR = '.submit-comment';
var GUESTBOOKFORM_SELECTOR = '.guestbook-form';
var ERROR = 'error';
var ERROR_COLOR = 'red';
var NEUTRAL_COLOR = 'black';
var GUESTBOOK_POST_URL = '/wp-json/api/guestbook/';
var TEXTMAXLENGTH = 200;
function init() {
    var form = getCommentForm();
    var nameField = document.querySelector('.input-name');
    var commentField = document.querySelector('.comment-text');
    var formFields = [nameField, commentField];
    var addCommentBtn = document.querySelector(ADDCOMMENT_SELECTOR);
    addCommentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showCommentModal(form, formFields);
    });
    var cancelCommentBtn = document.querySelector(CANCELCOMMENT_SELECTOR);
    cancelCommentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        removeCommentModal(form, formFields);
    });
    var submitCommentBtn = document.querySelector(SUBMITCOMMENT_SELECTOR);
    submitCommentBtn.addEventListener('click', function (e) {
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
    form.style.display = 'flex';
}
function hideForm(form) {
    form.style.display = 'none';
}
function validateFormFields(form, fields) {
    var guestBookValidator = createGuestBookValidator();
    var invalidFields = fields.filter(function (field) { return !guestBookValidator.validate(field); });
    if (invalidFields.length === 0)
        return submitComment(form, fields);
    generateErrors(guestBookValidator, invalidFields);
}
function generateErrors(validator, fields) {
    fields.forEach(function (field) {
        displayError(field, validator.getError(field));
    });
}
function createGuestBookValidator() {
    return new compositevalidator_1.CompositeValidator(new textlengthvalidator_1.TextLengthValidator(TEXTMAXLENGTH), new alphanumvalidator_1.AlphaNumValidator);
}
function submitComment(form, fields) {
    var body = fields.reduce(function (acc, field) {
        var _a;
        return (__assign((_a = {}, _a[field.name] = field.value, _a), acc));
    }, {});
    fetch(GUESTBOOK_POST_URL, { method: 'POST', body: JSON.stringify(body) }).then(function (_) {
        removeCommentModal(form, fields);
        location.reload();
    });
}
function displayError(field, errorMsg) {
    field.style.borderColor = ERROR_COLOR;
    var errorField = createErrorText(errorMsg);
    field.after(errorField);
}
function createErrorText(errorMsg) {
    var pElement = document.createElement('p');
    pElement.classList.add(ERROR);
    pElement.innerText = errorMsg;
    return pElement;
}
function resetForm(fields) {
    fields.forEach(function (field) {
        field.value = '';
        field.style.borderColor = NEUTRAL_COLOR;
    });
    removeErrors();
}
function removeErrors() {
    var errorFields = document.getElementsByClassName(ERROR);
    Array.prototype.slice.call(errorFields).forEach(function (field) { return field.remove(); });
}
init();
