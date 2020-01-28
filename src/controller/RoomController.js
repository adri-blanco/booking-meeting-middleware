import RoomBusiness from '../business/RoomBusiness';

const RoomController = {
  async get() {
    return RoomBusiness.get();
  }
}

export default RoomController;