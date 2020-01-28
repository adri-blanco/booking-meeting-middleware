import UserBusiness from '../business/UserBusiness';

const UserController = {
  async get({ id }) {
    return UserBusiness.get(id);
  }
}

export default UserController;