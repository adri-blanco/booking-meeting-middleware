import BookBusiness from '../business/BookBusiness';

const BookController = {
  async create(data) {
    return BookBusiness.create(data);
  },
  async update(data) {
    return BookBusiness.update(data);
  }
}

export default BookController;