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
