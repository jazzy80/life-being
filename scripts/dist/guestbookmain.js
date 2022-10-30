(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaNumValidator = void 0;
var fieldvalidator_1 = require("../interfaces/fieldvalidator");
var AlphaNumValidator = /** @class */ (function (_super) {
    __extends(AlphaNumValidator, _super);
    function AlphaNumValidator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errorMsg = 'Enkel alfa-numerieke tekens en "!?.,()" zijn toegestaan.\n';
        return _this;
    }
    AlphaNumValidator.prototype.validate = function (field) {
        return /^[a-zA-Z0-9!?,.() ]*$/.test(field.value);
    };
    return AlphaNumValidator;
}(fieldvalidator_1.FieldValidator));
exports.AlphaNumValidator = AlphaNumValidator;

},{"../interfaces/fieldvalidator":5}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeValidator = void 0;
var fieldvalidator_1 = require("../interfaces/fieldvalidator");
var CompositeValidator = /** @class */ (function (_super) {
    __extends(CompositeValidator, _super);
    function CompositeValidator() {
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.errorMsg = '';
        _this.validators = validators;
        return _this;
    }
    CompositeValidator.prototype.validate = function (field) {
        return this.validators.every(function (v) { return v.validate(field); });
    };
    CompositeValidator.prototype.getError = function (field) {
        return this.validators.reduce(function (error, validator) { return ("".concat(error).concat(validator.getError(field))); }, '');
    };
    return CompositeValidator;
}(fieldvalidator_1.FieldValidator));
exports.CompositeValidator = CompositeValidator;

},{"../interfaces/fieldvalidator":5}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextLengthValidator = void 0;
var fieldvalidator_1 = require("../interfaces/fieldvalidator");
var TextLengthValidator = /** @class */ (function (_super) {
    __extends(TextLengthValidator, _super);
    function TextLengthValidator(maxLength) {
        var _this = _super.call(this) || this;
        _this.maxLength = maxLength;
        _this.errorMsg =
            "Ingevoerde tekst moet tussen de 0 en ".concat(_this.maxLength, " tekens bevatten.\n");
        return _this;
    }
    TextLengthValidator.prototype.validate = function (field) {
        return 0 < field.value.length && field.value.length <= this.maxLength;
    };
    return TextLengthValidator;
}(fieldvalidator_1.FieldValidator));
exports.TextLengthValidator = TextLengthValidator;

},{"../interfaces/fieldvalidator":5}],4:[function(require,module,exports){
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

},{"./classes/alphanumvalidator":1,"./classes/compositevalidator":2,"./classes/textlengthvalidator":3,"./utils/overlay":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValidator = void 0;
var FieldValidator = /** @class */ (function () {
    function FieldValidator() {
    }
    FieldValidator.prototype.getError = function (field) {
        return !this.validate(field) ? this.errorMsg : '';
    };
    return FieldValidator;
}());
exports.FieldValidator = FieldValidator;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOverlay = exports.addOverlay = void 0;
var OVERLAY_SELECTOR = '.overlay';
function addOverlay() {
    var overlay = document.querySelector(OVERLAY_SELECTOR)
        || document.createElement('div');
    overlay.classList.add('overlay');
    var body = document.body;
    body.style.overflowY = 'hidden';
    body.prepend(overlay);
}
exports.addOverlay = addOverlay;
function removeOverlay() {
    var overlay = document.querySelector(OVERLAY_SELECTOR);
    // Check if overlay is already active.
    if (overlay) {
        // Remove it
        overlay.remove();
        // Reenable the scroll bar.
        document.body.style.overflowY = 'auto';
    }
}
exports.removeOverlay = removeOverlay;

},{}]},{},[4]);
