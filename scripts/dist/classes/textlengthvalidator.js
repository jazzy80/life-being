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
