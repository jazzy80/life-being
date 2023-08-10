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
//# sourceMappingURL=TextLengthValidator.js.map