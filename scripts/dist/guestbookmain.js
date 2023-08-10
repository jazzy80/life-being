(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
exports.Api = void 0;
const baseUrl = "/wp-json/api/";
exports.Api = {
    GET(url, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlParams = queryParams ? `?${new URLSearchParams(queryParams)}` : "";
            return yield fetch(`${baseUrl}${url}${urlParams}`);
        });
    },
    POST(url, dataBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${baseUrl}${url}`, { method: "POST", body: dataBody });
        });
    }
};

},{}],2:[function(require,module,exports){
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
exports.GuestBookRepository = void 0;
const Api_1 = require("../Api");
class GuestBookRepository {
    submitGuestBookEntry(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Api_1.Api.POST("guestbook/", JSON.stringify({ name: entry.name, comment: entry.comment }));
            return Promise.resolve();
        });
    }
}
exports.GuestBookRepository = GuestBookRepository;

},{"../Api":1}],3:[function(require,module,exports){
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

},{"./api/repositories/GuestBookRepository":2,"./utils/overlay":4,"./validators/AlphanumericValidator":5,"./validators/CompositeValidator":6,"./validators/TextLengthValidator":8}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphanumericValidator = void 0;
const FieldValidator_1 = require("./FieldValidator");
class AlphanumericValidator extends FieldValidator_1.FieldValidator {
    constructor() {
        super(...arguments);
        this.errorMsg = 'Enkel alfa-numerieke tekens en "!?.,()" zijn toegestaan.\n';
    }
    validate(field) {
        return /^[a-zA-Z0-9!?,.()'\n\r ]*$/.test(field.value);
    }
}
exports.AlphanumericValidator = AlphanumericValidator;

},{"./FieldValidator":7}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeValidator = void 0;
const FieldValidator_1 = require("./FieldValidator");
class CompositeValidator extends FieldValidator_1.FieldValidator {
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

},{"./FieldValidator":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValidator = void 0;
class FieldValidator {
    getError(field) {
        return !this.validate(field) ? this.errorMsg : '';
    }
}
exports.FieldValidator = FieldValidator;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextLengthValidator = void 0;
const FieldValidator_1 = require("./FieldValidator");
class TextLengthValidator extends FieldValidator_1.FieldValidator {
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

},{"./FieldValidator":7}]},{},[3]);
