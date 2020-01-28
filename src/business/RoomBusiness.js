import RoomServices from "../services/room-services";
import ApiError from "../utils/ApiError";

const RoomBusiness = {
  async get(id) {
    const result = await RoomServices.getUserInfo(id);
    if(!result) {
      throw new ApiError('User not found', 404);
    }
    return result;
  }
}

export default RoomBusiness;
