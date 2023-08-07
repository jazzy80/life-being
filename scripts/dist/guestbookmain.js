(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaNumValidator = void 0;
const fieldvalidator_1 = require("../interfaces/fieldvalidator");
class AlphaNumValidator extends fieldvalidator_1.FieldValidator {
    constructor() {
        super(...arguments);
        this.errorMsg = 'Enkel alfa-numerieke tekens en "!?.,()" zijn toegestaan.\n';
    }
    validate(field) {
        return /^[a-zA-Z0-9!?,.()'\n\r ]*$/.test(field.value);
    }
}
exports.AlphaNumValidator = AlphaNumValidator;

},{"../interfaces/fieldvalidator":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeValidator = void 0;
const fieldvalidator_1 = require("../interfaces/fieldvalidator");
class CompositeValidator extends fieldvalidator_1.FieldValidator {
    constructor(...validators) {
        super();
        this.errorMsg = '';
        this.validators = validators;
    }
    validate(field) {
        return this.validators.every(v => v.validate(field));
    }
    getError(field) {
        return this.validators.reduce((error, validator) => (`${error}${validator.getError(field)}`), '');
    }
}
exports.CompositeValidator = CompositeValidator;

},{"../interfaces/fieldvalidator":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextLengthValidator = void 0;
const fieldvalidator_1 = require("../interfaces/fieldvalidator");
class TextLengthValidator extends fieldvalidator_1.FieldValidator {
    constructor(maxLength) {
        super();
        this.maxLength = maxLength;
        this.errorMsg =
            `Ingevoerde tekst moet tussen de 0 en ${this.maxLength} tekens bevatten.\n`;
    }
    validate(field) {
        return 0 < field.value.length && field.value.length <= this.maxLength;
    }
}
exports.TextLengthValidator = TextLengthValidator;

},{"../interfaces/fieldvalidator":5}],4:[function(require,module,exports){
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

},{"./classes/alphanumvalidator":1,"./classes/compositevalidator":2,"./classes/textlengthvalidator":3,"./utils/overlay":7}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValidator = void 0;
class FieldValidator {
    getError(field) {
        return !this.validate(field) ? this.errorMsg : '';
    }
}
exports.FieldValidator = FieldValidator;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOverlay = exports.addOverlay = void 0;
const OVERLAY_SELECTOR = '.overlay';
function addOverlay() {
    const overlay = document.querySelector(OVERLAY_SELECTOR)
        || document.createElement('div');
    overlay.classList.add('overlay');
    const body = document.body;
    body.style.overflowY = 'hidden';
    body.prepend(overlay);
}
exports.addOverlay = addOverlay;
function removeOverlay() {
    const overlay = document.querySelector(OVERLAY_SELECTOR);
    // Check if overlay is already active.
    if (overlay) {
        // Remove it
        overlay.remove();
        // Reenable the scroll bar.
        document.body.style.overflowY = 'auto';
    }
}
exports.removeOverlay = removeOverlay;

},{}]},{},[4,5,1,2,3,6,7]);
