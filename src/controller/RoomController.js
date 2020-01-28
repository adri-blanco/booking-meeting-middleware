import RoomBusiness from '../business/UserBusiness';

const RoomController = {
  async get({ id }) {
    return RoomBusiness.get(id);
  }
}

export default RoomController;