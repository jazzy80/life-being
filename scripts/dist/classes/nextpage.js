"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextPage = void 0;
class NextPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber + 1;
        this.nextPredicate = (pageNumber) => pageNumber < totalPages - 1;
    }
}
exports.NextPage = NextPage;
//# sourceMappingURL=nextpage.js.map