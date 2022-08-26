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
exports.__esModule = true;
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
