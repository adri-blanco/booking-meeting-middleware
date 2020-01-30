import RoomServices from "../services/RoomServices";
import ROOMS from '../utils/rooms-constants';
import BookingStates from "../utils/booking-states-constants";

function getBookingState({ startTime, endTime }) {
  const startTimeDate = new Date(startTime);
  const endTimeDate = new Date(endTime);
  const now = new Date();

  if(now < startTimeDate) {
    return BookingStates.PAST;
  }

  if(now < endTimeDate) {
    return BookingStates.NOW;
  }
  return BookingStates.FUTURE;
}

function getRoomAvailability(bookings) {
  for(let i in bookings) {
    if(getBookingState(bookings[i]) === BookingStates.NOW) {
      return false;
    }
  }
  return true;
}

const UserBusiness = {
  async get() {
    const promises = ROOMS.map(async (room) => {
      const meetings = await RoomServices.getMeetings(room.id);
      return {
        ...room,
        availability: getRoomAvailability(meetings),
        meetings,
      }
    });
    return Promise.all(promises);
  },
};

export default UserBusiness;
