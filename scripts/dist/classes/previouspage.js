"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousPage = void 0;
class PreviousPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber - 1;
        this.nextPredicate = (pageNumber) => pageNumber > 0;
    }
}
exports.PreviousPage = PreviousPage;
