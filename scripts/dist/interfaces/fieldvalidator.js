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
