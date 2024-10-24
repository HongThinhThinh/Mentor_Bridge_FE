import React, { useEffect, useRef, useState } from 'react';
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";

const VerticalScheduler = () => {
  const schedulerRef = useRef();

  const [config, setConfig] = useState({
    viewType: "Resources",
    scale: "Hour",
    cellHeight: 70,
    days: 1,
    startDate: "2024-01-01",
    
    onBeforeEventRender: args => {
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
        style: "border-radius: 50%; border: 2px solid #fff; font-size: 16px; text-align: center;",
      });
    }
  });

  useEffect(() => {

    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2024-01-01T00:00:00",
        end: "2024-01-01T10:00:00",
        resource: "2",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2024-01-01T13:00:00",
        end: "2024-01-01T21:30:00",
        resource: "4",
      },
      {
        id: 3,
        text: "Event 3",
        start: "2024-01-01T00:00:00",
        end: "2024-01-01T10:00:00",
        resource: "5",
      },
      {
        id: 4,
        text: "Event 3",
        start: "2024-01-01T00:00:00",
        end: "2024-01-01T10:00:00",
        resource: "6",
      }
    ];

    const columns = [
      {name: "Thứ hai", id: "2"},
      {name: "Thứ ba", id: "3"},
      {name: "Thứ tư", id: "4"},
      {name: "Thứ năm", id: "5"},
      {name: "Thứ 6", id: "6"},
      {name: "Thứ 7", id: "7"},
      {name: "Chủ nhật", id: "8"}
    ];

    setConfig(prevConfig => ({
      ...prevConfig,
      events,
      columns
    }));

  }, []);

  const getScheduler = () => schedulerRef.current?.control;

  return (
    <div>
      <DayPilotCalendar
        {...config}
        ref={schedulerRef}
      />
    </div>
  );
}
export default VerticalScheduler;