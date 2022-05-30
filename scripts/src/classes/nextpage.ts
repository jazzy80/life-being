import { IPage } from '../interfaces/ipage';

export class NextPage implements IPage {
  nextPredicate: (pageNumber: number) => boolean;
  nextPage: (pageNumber: number) => number;

  constructor(public pageNumber: number, public totalPages: number) {
    this.nextPage = (pageNumber: number) => pageNumber + 1;
    this.nextPredicate = (pageNumber: number) => pageNumber < totalPages - 1;
  }
}
