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
//# sourceMappingURL=CompositeValidator.js.map