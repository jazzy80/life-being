export interface IPage {
  pageNumber: number,
  totalPages: number,
  nextPredicate: (pageNumber: number) => boolean,
  nextPage: (pageNumber: number) => number 
}
