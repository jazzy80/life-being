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
