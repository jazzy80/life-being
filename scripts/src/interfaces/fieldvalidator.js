"use strict";
exports.__esModule = true;
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
