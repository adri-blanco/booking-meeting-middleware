import BookBusiness from '../business/BookBusiness';

const BookController = {
  async create(data) {
    return BookBusiness.create(data);
  },
  async extend(data) {
    return BookBusiness.extend(data);
  }
}

export default BookController;