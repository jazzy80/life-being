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
exports.AlphaNumValidator = void 0;
var fieldvalidator_1 = require("../interfaces/fieldvalidator");
var AlphaNumValidator = /** @class */ (function (_super) {
    __extends(AlphaNumValidator, _super);
    function AlphaNumValidator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errorMsg = 'Enkel alfa-numerieke tekens en "!?.,()" zijn toegestaan.\n';
        return _this;
    }
    AlphaNumValidator.prototype.validate = function (field) {
        return /^[a-zA-Z0-9!?,.() ]*$/.test(field.value);
    };
    return AlphaNumValidator;
}(fieldvalidator_1.FieldValidator));
exports.AlphaNumValidator = AlphaNumValidator;
