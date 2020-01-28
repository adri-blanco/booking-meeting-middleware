import RoomBusiness from '../business/RoomBusiness';

const RoomController = {
  async create(data) {
    return data;
  },
  async get({ id }) {
    return RoomBusiness.get(id);
  }
}

export default RoomController;