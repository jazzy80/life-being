"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaNumValidator = void 0;
const fieldvalidator_1 = require("../interfaces/fieldvalidator");
class AlphaNumValidator extends fieldvalidator_1.FieldValidator {
    constructor() {
        super(...arguments);
        this.errorMsg = 'Enkel alfa-numerieke tekens en "!?.,()" zijn toegestaan.\n';
    }
    validate(field) {
        return /^[a-zA-Z0-9!?,.()'\n\r ]*$/.test(field.value);
    }
}
exports.AlphaNumValidator = AlphaNumValidator;
