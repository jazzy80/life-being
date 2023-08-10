"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphanumericValidator = void 0;
const FieldValidator_1 = require("./FieldValidator");
class AlphanumericValidator extends FieldValidator_1.FieldValidator {
    constructor() {
        super(...arguments);
        this.errorMsg = 'Enkel alfa-numerieke tekens en "!?.,()" zijn toegestaan.\n';
    }
    validate(field) {
        return /^[a-zA-Z0-9!?,.()'\n\r ]*$/.test(field.value);
    }
}
exports.AlphanumericValidator = AlphanumericValidator;
//# sourceMappingURL=AlphanumericValidator.js.map