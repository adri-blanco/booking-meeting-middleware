import BookBusiness from '../business/BookBusiness';

const BookController = {
  async create(data) {
    return BookBusiness.create(data);
  }
}

export default BookController;