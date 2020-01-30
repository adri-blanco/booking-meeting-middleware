import BookServices from "../services/BookServices";
import UserServices from "../services/UserServices";
import ApiError from "../utils/ApiError";

const BookBusiness = {
  async create(data) {
    if(data.startTime > data.endTime) {
      throw new ApiError('Start time should be before end time', 400);
    }

    const user = await UserServices.getUserInfo(data.user);
    if(!user) {
      throw new ApiError('User not valid', 400);
    }

    const booking = await BookServices.create({ ...data, groupId: user.groupId, userName: user.name });
    return {
      ...data,
      ...user,
    };
  }
}

export default BookBusiness;
