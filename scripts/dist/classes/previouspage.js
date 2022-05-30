"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousPage = void 0;
var PreviousPage = /** @class */ (function () {
    function PreviousPage(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = function (pageNumber) { return pageNumber - 1; };
        this.nextPredicate = function (pageNumber) { return pageNumber > 0; };
    }
    return PreviousPage;
}());
exports.PreviousPage = PreviousPage;
