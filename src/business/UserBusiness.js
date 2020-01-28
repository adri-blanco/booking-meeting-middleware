import UserServices from "../services/UserServices";
import ApiError from "../utils/ApiError";

const UserBusiness = {
  async get(id) {
    const result = await UserServices.getUserInfo(id);
    if(!result) {
      throw new ApiError('User not found', 404);
    }
    return result;
  }
}

export default UserBusiness;
