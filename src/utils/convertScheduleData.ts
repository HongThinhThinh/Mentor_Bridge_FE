import moment from "moment";

export const convertScheduleData = (values: any, timeDuration: number) => {
  const dayMap: Record<string, string> = {
    "time_Thứ 2": "monday",
    "time_Thứ 3": "tuesday",
    "time_Thứ 4": "wednesday",
    "time_Thứ 5": "thursday",
    "time_Thứ 6": "friday",
    "time_Thứ 7": "saturday",
    "time_Chủ Nhật": "sunday",
  };

  const newData: any = {
    slotDuration: `PT${timeDuration}M`, // Correctly setting slot duration
  };

  for (const dayKey in values) {
    const newDayKey = dayMap[dayKey];
    if (!newDayKey) continue;

    const dayTimes = values[dayKey];

    if (Array.isArray(dayTimes)) {
      const times = dayTimes.map((time: any) => {
        // Extract dates using $d
        const fromHour = moment(time.fromHour.$d);
        const fromMinute = moment(time.fromMinute.$d);
        const toHour = moment(time.toHour.$d);
        const toMinute = moment(time.toMinute.$d);

        // Combine hours and minutes into the correct format using Moment.js
        const startTime = moment(fromHour)
          .set({
            hour: fromHour.hour(),
            minute: fromMinute.minute(),
          })
          .format("HH:mm");

        const endTime = moment(toHour)
          .set({
            hour: toHour.hour(),
            minute: toMinute.minute(),
          })
          .format("HH:mm");

        // Debugging values to ensure correct times
        // console.log(`Start Time: ${startTime}, End Time: ${endTime}`);

        return { startTime, endTime };
      });

      newData[newDayKey] = times;
    } else {
      console.error(`No valid time data for ${dayKey}`);
      newData[newDayKey] = [];
    }
  }

  return newData;
};
