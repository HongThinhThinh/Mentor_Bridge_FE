import { BookingRecordData } from "../components/organisms/booking-acceptance";
import { BookingHistory } from "../pages/mentor/booking-history";


export const bookingMentorDummyData: BookingRecordData[] = [
    {
      id: "1",
      topic: "Introduction to TypeScript",
      groupName: "FPT Group 1",
      date: "2024-10-23",
    },
    {
      id: "2",
      topic: "Advanced React Patterns",
      groupName: "React Experts",
      date: "2024-10-25",
    },
    {
      id: "3",
      topic: "Machine Learning Basics",
      groupName: "AI Enthusiasts",
      date: "2024-10-30",
    },
    {
      id: "4",
      topic: "UI/UX Design Principles",
      groupName: "Design Masters",
      date: "2024-11-01",
    },
    {
      id: "5",
      topic: "Cloud Computing with Azure",
      groupName: "Cloud Gurus",
      date: "2024-11-05",
    },
  ];


  export const bookingHistoryDummyData = [
    {
      id: "BKG001",
      type: "Online Meeting",
      meetLink: "https://example.com/meeting1",
      mentor: {
        fullName: "Nguyễn Văn A",
        studentCode: "GV123",
        email: "nguyenvana@example.com"
      },
      student: {
        fullName: "Trần Thị B",
        studentCode: "STU001",
        email: "tranthib@example.com",
        phone: "0123456789",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2"
      },
      team: null,
      semester: {
        code: "SEM001",
        name: "Kỳ Học 2023",
        status: "Đang diễn ra"
      },
      status: "ACCEPTED",
      createdAt: "2024-01-15T10:00:00Z",
      timeFrame: {
        timeFrameFrom: "2024-01-16T08:00:00Z",
        timeFrameTo: "2024-01-16T09:00:00Z",
        timeFrameStatus: "SCHEDULED"
      },
      bookingHistories: [
        { id: "HIST001", type: "REQUESTED", createdAt: "2024-01-10T08:00:00Z" },
        { id: "HIST002", type: "ACCEPTED", createdAt: "2024-01-11T12:00:00Z" }
      ]
    },
    {
      id: "BKG002",
      type: "Offline Meeting",
      meetLink: "N/A",
      mentor: null,
      student: {
        fullName: "Lê Văn C",
        studentCode: "STU002",
        email: "levanc@example.com",
        phone: "0987654321",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3"
      },
      team: {
        code: "TEAM123",
        userTeams: [
          { role: "LEADER", studentCode: "STU004", fullName: "Nguyễn Văn D" },
          { role: "MEMBER", studentCode: "STU005", fullName: "Phạm Thị E" }
        ]
      },
      semester: {
        code: "SEM002",
        name: "Kỳ Học 2024",
        status: "Sắp bắt đầu"
      },
      status: "PENDING_RESCHEDULE",
      createdAt: "2024-02-10T10:00:00Z",
      timeFrame: {
        timeFrameFrom: "2024-02-15T08:00:00Z",
        timeFrameTo: "2024-02-15T09:00:00Z",
        timeFrameStatus: "PENDING"
      },
      bookingHistories: [
        { id: "HIST003", type: "REQUESTED", createdAt: "2024-02-01T08:00:00Z" },
        { id: "HIST004", type: "PENDING_RESCHEDULE", createdAt: "2024-02-12T12:00:00Z" }
      ]
    }
  ];