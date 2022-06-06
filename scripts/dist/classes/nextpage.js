"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextPage = void 0;
var NextPage = /** @class */ (function () {
    function NextPage(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = function (pageNumber) { return pageNumber + 1; };
        this.nextPredicate = function (pageNumber) { return pageNumber < totalPages - 1; };
    }
    return NextPage;
}());
exports.NextPage = NextPage;
