"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValidator = void 0;
class FieldValidator {
    getError(field) {
        return !this.validate(field) ? this.errorMsg : '';
    }
}
exports.FieldValidator = FieldValidator;
//# sourceMappingURL=fieldvalidator.js.map