import AxiosInstance from './axios';

const RoomServices = {
  async getMeetings(roomId) {
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)
  
    const params = {
      utcStart: startDate.toISOString(),
      profileId: 158,
      pollingInterval: 122000,
    }
    const result = await AxiosInstance.post('/GetBookings', { ...params, roomId });
    return result.Data1.map((booking) => ({
      bookingId: booking.BookingID,
      startTime: booking.UTCEventStartDateTime,
      endTime: booking.UTCEventEndDateTime,
      name: booking.EventName,
      owner: booking.GroupName,
    }));
  },
}

export default RoomServices;
