import React, { useEffect, useRef, useState } from "react";
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";

const VerticalScheduler = ({ scheduleData }) => {
  const schedulerRef = useRef();

  const [config, setConfig] = useState({
    viewType: "Resources",
    scale: "CellDuration",
    cellDuration: 15,
    timeHeaders: [{ groupBy: "Hour" }, { groupBy: "Cell", format: "mm" }],
    cellHeight: 30,
    days: 1,
    startDate: "2024-01-01",
    businessBeginsHour: 0,
    businessEndsHour: 24,
    heightSpec: "BusinessHours",

    onBeforeEventRender: (args) => {
      if (!args.data.barColor) {
        args.data.barColor = "#F37022";
      }

      args.data.areas = [];
      args.data.areas.push({
        bottom: 5,
        right: 10,
        width: 28,
        height: 28,
        action: "None",
        backColor: args.data.barColor,
        fontColor: "#fff",
        padding: 1,
        text: args.data.owner,
        style:
          "border-radius: 50%; border: 2px solid #fff; font-size: 16px; text-align: center;",
      });
    },
  });

  useEffect(() => {
    const daysMap = {
      monday: "2",
      tuesday: "3",
      wednesday: "4",
      thursday: "5",
      friday: "6",
      saturday: "7",
      sunday: "8",
    };

    const events = [];

    // Iterate over the schedule data to create events
    Object.keys(scheduleData).forEach((day) => {
      if (daysMap[day]) {
        const dayResourceId = daysMap[day];
        scheduleData[day].forEach((time) => {
          events.push({
            start: `2024-01-01T${time.startTime}`, // Adjust the date to match startDate if needed
            end: `2024-01-01T${time.endTime}`,
            resource: dayResourceId,
            text: `Lịch trống của thứ ${dayResourceId}`,
          });
        });
      }
    });

    const columns = [
      { name: "Thứ hai", id: "2" },
      { name: "Thứ ba", id: "3" },
      { name: "Thứ tư", id: "4" },
      { name: "Thứ năm", id: "5" },
      { name: "Thứ 6", id: "6" },
      { name: "Thứ 7", id: "7" },
      { name: "Chủ nhật", id: "8" },
    ];

    setConfig((prevConfig) => ({
      ...prevConfig,
      events,
      columns,
    }));
  }, [scheduleData]);

  const getScheduler = () => schedulerRef.current?.control;

  return (
    <div>
      <DayPilotCalendar {...config} ref={schedulerRef} />
    </div>
  );
};

export default VerticalScheduler;
