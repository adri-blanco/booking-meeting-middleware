import AxiosInstance from './axios';

const UserServices = {
  async getUserInfo(id) {
    const result = await AxiosInstance.post('/AuthenticateGroup', {
      "roomId": 118427,
      "profileId": 158,
      "authId": id,
      "authPassword": "",
      "isSecondaryAuth": false,
      "connectionName": ""
    });

    if(result.message === 'Success') {
      return {
        id,
        name: result.group.groupName,
        groupId: result.group.groupID,
      }
    }
    return null;
  }
}

export default UserServices;
