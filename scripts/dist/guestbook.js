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
var ADDCOMMENT = '.add-comment';
var CANCELCOMMENT = '.cancel-comment';
var SUBMITCOMMENT = '.submit-comment';
var OVERLAY = '.overlay';
var GUESTBOOKFORM = '.guestbook-form';
var GUESTBOOK_POST_URL = '/wp-json/api/guestbook/';
var TEXTMAXLENGTH = 200;
function init() {
    var form = getCommentForm();
    var nameField = document.querySelector('.input-name');
    var commentField = document.querySelector('.comment-text');
    var formFields = [nameField, commentField];
    var addCommentBtn = document.querySelector(ADDCOMMENT);
    addCommentBtn === null || addCommentBtn === void 0 ? void 0 : addCommentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showCommentModal(form, formFields);
    });
    var cancelCommentBtn = document.querySelector(CANCELCOMMENT);
    cancelCommentBtn === null || cancelCommentBtn === void 0 ? void 0 : cancelCommentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        removeCommentModal(form, formFields);
    });
    var submitCommentBtn = document.querySelector(SUBMITCOMMENT);
    submitCommentBtn === null || submitCommentBtn === void 0 ? void 0 : submitCommentBtn.addEventListener('click', function (e) {
        removeErrors();
        e.preventDefault();
        validateFormFields(formFields);
        removeCommentModal(form, formFields);
    });
}
function getCommentForm() {
    return document.querySelector(GUESTBOOKFORM);
}
function showCommentModal(form, fields) {
    addOverlay();
    showForm(form);
    resetForm(fields);
}
function removeCommentModal(form, fields) {
    hideForm(form);
    removeOverlay();
    resetForm(fields);
}
function addOverlay() {
    var overlay = document.querySelector(OVERLAY)
        || document.createElement('div');
    overlay.classList.add('overlay');
    var body = document.body;
    body.style.overflowY = 'hidden';
    body.prepend(overlay);
}
function removeOverlay() {
    var overlay = document.querySelector(OVERLAY);
    if (overlay) {
        overlay.remove();
        document.body.style.overflowY = 'auto';
    }
}
function showForm(form) {
    form.style.display = 'flex';
}
function hideForm(form) {
    form.style.display = 'none';
}
function validateFormFields(fields) {
    var guestBookValidator = createGuestBookValidator();
    var invalidFields = fields.filter(function (field) { return !guestBookValidator.validate(field); });
    if (invalidFields.length === 0)
        return submitComment(fields);
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
function submitComment(fields) {
    var body = fields.reduce(function (acc, field) {
        var _a;
        return (__assign((_a = {}, _a[field.name] = field.value, _a), acc));
    }, {});
    fetch(GUESTBOOK_POST_URL, { method: 'POST', body: JSON.stringify(body) });
    location.reload();
}
function displayError(field, errorMsg) {
    field.style.borderColor = 'red';
    var errorField = createErrorText(errorMsg);
    field.after(errorField);
}
function createErrorText(errorMsg) {
    var pElement = document.createElement('p');
    pElement.classList.add('error');
    pElement.innerText = errorMsg;
    return pElement;
}
function resetForm(fields) {
    fields.forEach(function (field) {
        field.value = '';
        field.style.borderColor = 'black';
    });
    removeErrors();
}
function removeErrors() {
    var errorFields = document.getElementsByClassName('error');
    Array.prototype.slice.call(errorFields).forEach(function (field) { return field.remove(); });
}
init();
