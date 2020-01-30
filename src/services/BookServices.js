import AxiosInstance from './axios';
import axiosInstance from './axios';
import ApiError from '../utils/ApiError';

const ERROR_CODES = {
  ROOM_ID_NOT_VALID: 80,
  ROOM_NOT_AVAILABLE: 40,
}

const BookServices = {
  async create({ startTime, endTime, room, name, groupId, userName }) {
    const response = await axiosInstance.post('/AddBooking', {
      utcStart: startTime,
      utcEnd: endTime,
      roomId: room,
      profileId: 158, // TODO: ??? Magic number
      groupId,
      contactId: 0,
      groupName: userName,
      eventName: name,
      attendance: 1,
    });

    console.log(response);
    if(response.Data[0].MessageCode === ERROR_CODES.ROOM_ID_NOT_VALID) {
      throw new ApiError('Room id does not exist', 400, { original: response.Data });
    }

    if(response.Data[0].MessageCode === ERROR_CODES.ROOM_NOT_AVAILABLE) {
      throw new ApiError('Bookin conflict. Room not available', 400, { original: response.Data });
    }

    if(response.Data[0].MessageCode !== 0) {
      throw new ApiError('Unhandled Error in booking', 400, { original: response.Data });
    }
    return response.Data1[0].BookingID;
  },
  async checkIn(bookingId, roomId) {
    const response = await axiosInstance.post('/CheckInGroup', {
      roomId,
      bookingId,
      profileId: 158,
      connectionName: '',
    });

    if(response.Data[0].MessageCode === 0) {
      return true;
    } else {
      return false
    }
  },
}

export default BookServices;
