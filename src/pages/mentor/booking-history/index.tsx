import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import useBookingService from "../../../services/useBookingService";

const TreeBookingDetail = ({ booking }) => {
  const generateTreeData = (booking) => {
    return [
      {
        title: `Booking ID: ${booking.id}`,
        key: booking.id,
        children: [
          {
            title: `Type: ${booking.type}`,
            key: `${booking.id}-type`,
          },
          {
            title: `Status: ${booking.status}`,
            key: `${booking.id}-status`,
          },
          {
            title: `Meeting Link: `,
            key: `${booking.id}-meeting`,
            children: [
              {
                title: (
                  <a
                    href={booking.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {booking.meetLink}
                  </a>
                ),
                key: `${booking.id}-meetLink`,
              },
            ],
          },
          {
            title: `Created At: ${new Date(
              booking.createdAt
            ).toLocaleString()}`,
            key: `${booking.id}-createdAt`,
          },
          {
            title: "Time Frame",
            key: `${booking.id}-timeFrame`,
            children: [
              {
                title: `From: ${new Date(
                  booking.timeFrame.timeFrameFrom
                ).toLocaleString()}`,
                key: `${booking.id}-timeFrameFrom`,
              },
              {
                title: `To: ${new Date(
                  booking.timeFrame.timeFrameTo
                ).toLocaleString()}`,
                key: `${booking.id}-timeFrameTo`,
              },
            ],
          },
          {
            title: "Student Info",
            key: `${booking.id}-student`,
            children: [
              {
                title: `Name: ${booking.student.fullName}`,
                key: `${booking.id}-studentName`,
              },
              {
                title: `Code: ${booking.student.studentCode}`,
                key: `${booking.id}-studentCode`,
              },
              {
                title: `Email: ${booking.student.email}`,
                key: `${booking.id}-studentEmail`,
              },
            ],
          },
          {
            title: "Mentor Info",
            key: `${booking.id}-mentor`,
            children: [
              {
                title: `Name: ${booking.mentor.fullName}`,
                key: `${booking.id}-mentorName`,
              },
              {
                title: `Code: ${booking.mentor.studentCode}`,
                key: `${booking.id}-mentorCode`,
              },
              {
                title: `Email: ${booking.mentor.email}`,
                key: `${booking.id}-mentorEmail`,
              },
            ],
          },
          {
            title: "Booking Histories",
            key: `${booking.id}-histories`,
            children: booking.bookingHistories.map((history) => ({
              title: `${history.type} on ${new Date(
                history.createdAt
              ).toLocaleString()}`,
              key: `${booking.id}-history-${history.id}`,
            })),
          },
          {
            title: "Semester Info",
            key: `${booking.id}-semester`,
            children: [
              {
                title: `Code: ${booking.semester.code}`,
                key: `${booking.id}-semesterCode`,
              },
              {
                title: `Name: ${booking.semester.name}`,
                key: `${booking.id}-semesterName`,
              },
              {
                title: `Status: ${booking.semester.status}`,
                key: `${booking.id}-semesterStatus`,
              },
            ],
          },
        ],
      },
    ];
  };

  const treeData = generateTreeData(booking);

  return <Tree treeData={treeData} defaultExpandAll />;
};

const BookingHistory = () => {
  const [data, setData] = useState([]);
  const { getBooking } = useBookingService();
  const fetch = async () => {
    try {
      const response = await getBooking();
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const bookingData = {
    statusCode: 200,
    message: "Get Booking Successfully",
    data: [
      {
        id: "2455bd08-349f-4514-85ec-cd56c180e5ac",
        type: "INDIVIDUAL",
        meetLink: "https://meet.google.com/bxf-vzqa-whc",
        status: "ACCEPTED",
        createdAt: "2024-11-04T01:21:47.780827",
        timeFrame: {
          id: "9c776705-f381-486f-b16e-3491305edb97",
          timeFrameFrom: "2024-11-04T15:10:00",
          timeFrameTo: "2024-11-04T15:20:00",
          timeFrameStatus: "BOOKED",
        },
        student: {
          id: "ddef62f0-011a-4d04-a657-d832e2c523fe",
          fullName: "Michael Green",
          studentCode: "STU127",
          email: "thinhnhse171708@fpt.edu.vn",
        },
        mentor: {
          id: "5101b6a3-3a5d-4c53-b4de-4ffaf78d678b",
          fullName: "Jane Smith",
          studentCode: "STU124",
          email: "hthinh359@gmail.com",
        },
        bookingHistories: [
          {
            id: "c65d37f3-67e0-4370-80c6-fd1b851728ac",
            type: "REQUESTED",
            createdAt: "2024-11-04T01:21:49.747848",
          },
          {
            id: "d43640ef-7e5d-4328-96fe-31e66c0ad99d",
            type: "ACCEPTED",
            createdAt: "2024-11-04T01:26:38.254194",
          },
        ],
        semester: {
          id: "fbd1ff7e-58c4-42c3-80d5-05222588ca32",
          code: "Fa24",
          name: "Fall2024",
          status: "ACTIVE",
        },
      },
    ],
  };

  return (
    <div>
      {data?.map((booking) => (
        <TreeBookingDetail key={booking?.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingHistory;
