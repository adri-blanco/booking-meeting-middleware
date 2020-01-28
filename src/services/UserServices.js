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

    if(result.Data1) {
      return {
        id,
        name: result.Data1[0].GroupName,
        groupId: result.Data1[0].GroupID,
      }
    }
    return null;
  }
}

export default UserServices;
