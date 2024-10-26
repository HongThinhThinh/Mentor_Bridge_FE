import { createBrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TestApi from "../services/testApi";
import Login from "../pages/login/Login";
import ManageTopic from "../pages/admin/manage-topic";
import DashboardLayout from "../components/layouts/dashboard-layout";

import MentorHomePage from "../pages/mentor/home";
import AdminLayout from "../components/layouts/admin-layout";
import ManageUser from "../pages/admin/manage-user";
import ManageSemester from "../pages/admin/manage-semester";
import {
  ADMIN_ROUTES,
  MENTOR_ROUTES,
  STUDENT_ROUTES,
  USER_ROUTES,
} from "../constants/routes";
import MentorSchedule from "../pages/mentor/schedule";
import ManageConfig from "../pages/admin/manage-config";
import GroupSections from "../components/molecules/group-sections";
import StudentHomePage from "../pages/student/home";
import TeamInvitePage from "../pages/student/team-invite";
import BookingMentorPage from "../pages/student/booking";
import BookingRequestPage from "../pages/mentor/booking-request";
import EmptySchedulePage from "../pages/mentor/empty-schedule";
import ProtectedRoute from "../middleware/protected-route";

function TestAPi() {
  const { testApi } = TestApi();
  const [test, setTest] = useState([[]]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const response = await testApi();
    setTest(response);
  };
  console.log(test);

  return (
    <div>
      <h1>Testing API Call</h1>
      {/* <UpdateScheduler /> */}
      <GroupSections />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={USER_ROUTES.LOGIN} />,
  },
  {
    path: "/test",
    element: <TestAPi />,
  },

  {
    path: USER_ROUTES.TEAM_INVITE,
    element: <TeamInvitePage />,
  },

  {
    path: MENTOR_ROUTES.MENTOR,
    element: <DashboardLayout />,
    children: [
      {
        path: MENTOR_ROUTES.MENTOR_PAGE,
        element: <MentorHomePage />,
      },
      {
        path: MENTOR_ROUTES.SCHEDULE,
        element: (
          <ProtectedRoute>
            <MentorSchedule />
          </ProtectedRoute>
        ),
      },
      {
        path: MENTOR_ROUTES.BOOKING_REQUEST,
        element: <BookingRequestPage />,
      },
      {
        path: MENTOR_ROUTES.EMPTY_SCHEDULE,
        element: <EmptySchedulePage />,
      },
    ],
  },
  {
    path: STUDENT_ROUTES.STUDENT,
    element: <DashboardLayout />,
    children: [
      {
        path: STUDENT_ROUTES.STUDENT_PAGE,
        element: <StudentHomePage />,
      },
      {
        path: STUDENT_ROUTES.SCHEDULE,
        element: <></>,
      },
      {
        path: STUDENT_ROUTES.BOOKING,
        element: <BookingMentorPage />,
      },
    ],
  },

  {
    path: ADMIN_ROUTES.ADMIN,
    element: <AdminLayout />,
    children: [
      {
        path: ADMIN_ROUTES.TOPIC,
        element: <ManageTopic />,
      },
      {
        path: ADMIN_ROUTES.USER,
        element: <ManageUser />,
      },
      {
        path: ADMIN_ROUTES.CONFIG,
        element: <ManageConfig />,
      },
      {
        path: ADMIN_ROUTES.SEMESTER,
        element: <ManageSemester />,
      },
    ],
  },

  {
    path: USER_ROUTES.LOGIN,
    element: <Login />,
  },
]);
