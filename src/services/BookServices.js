import axiosInstance from './axios';
import ApiError from '../utils/ApiError';

const ERROR_CODES = {
  ROOM_ID_NOT_VALID: 80,
  ROOM_NOT_AVAILABLE: 40,
}

function getMessageCode(response) {
  return response.messageCode;
}

const BookServices = {
  async create({ startTime, endTime, room, name, groupId, userName }) {
    const response = await axiosInstance.post('/AddBooking', {
      isoStartOfWeek: 0,
      eventStart: startTime,
      eventEnd: endTime,
      roomId: room,
      profileId: 158, // TODO: ??? Magic number
      groupId,
      contactId: 0,
      groupName: userName,
      eventName: name,
      attendance: 1,
      exchangeEnabled: 0,
    });

    if(getMessageCode(response) === ERROR_CODES.ROOM_ID_NOT_VALID) {
      throw new ApiError('Room id does not exist', 400, { original: response.Data });
    }

    if(getMessageCode(response) === ERROR_CODES.ROOM_NOT_AVAILABLE) {
      throw new ApiError('Bookin conflict. Room not available', 400, { original: response.Data });
    }

    if(getMessageCode(response) !== 0) {
      throw new ApiError('Unhandled Error in booking', 400, { original: response.Data });
    }
    return response.addBookingResults.BookingID;
  },
  async update({ startTime, endTime, room, bookingId }) {
    const response = await axiosInstance.post('/UpdateBooking', {
      utcStart: startTime,
      utcEnd: endTime,
      roomId: room,
      profileId: 158,
      bookingId,
      connectionName: '',
    });

    if(getMessageCode(response) === 40) {
      throw new ApiError('Room not available', 400, { original: response.Data });
    }

    if(getMessageCode(response) !== 0) {
      throw new ApiError('Unhandled error in booking', 400, { original: response.Data });
    }
    return true;
  },
  async checkIn(bookingId, roomId) {
    const response = await axiosInstance.post('/CheckInGroup', {
      roomId,
      bookingId,
      profileId: 158,
      connectionName: '',
    });

    if(getMessageCode(response) === 0) {
      return true;
    } else {
      return false
    }
  },
}

export default BookServices;
