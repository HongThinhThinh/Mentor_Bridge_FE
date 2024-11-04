import { createBrowserRouter, Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
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
import ManageConfig from "../pages/admin/manage-config";
import GroupSections from "../components/molecules/group-sections";
import StudentHomePage from "../pages/student/home";
import TeamInvitePage from "../pages/student/team-invite";
import BookingMentorPage from "../pages/student/booking";
import BookingRequestPage from "../pages/mentor/booking-request";
import EmptySchedulePage from "../pages/mentor/empty-schedule";
import ProtectedRoute from "../middleware/protected-route";
import SchedulePage from "../pages/schedule";
import RoomChat from "../pages/roomChat";
import ChatDetail from "../components/molecules/chatDetail";
import { toast } from "react-toastify";
import { useCurrentUser } from "../utils/getcurrentUser";
import ManageOverview from "../pages/admin/manage-overview";
import BookingHistory from "../pages/mentor/booking-history";
import ConfirmReschedule from "../components/organisms/confirmReschedule";

interface ProtectedRouteByRoleProps {
  children: ReactNode;
  allowedRoles: Array<"ADMIN" | "STUDENT" | "MENTOR">; // Các vai trò cho phép
}

interface ProtectedRouteAuthProps {
  children: ReactNode;
}

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

  return (
    <div>
      <h1>Testing API Call</h1>
      {/* <UpdateScheduler /> */}
      <GroupSections />
    </div>
  );
}

const ProtectedRouteAuth: React.FC<ProtectedRouteAuthProps> = ({
  children,
}) => {
  const user = useCurrentUser();

  if (!user) {
    toast.error("You need to login first!!");
    return <Navigate to="/" replace />;
  }

  return children;
};

const ProtectedRouteByRole: React.FC<ProtectedRouteByRoleProps> = ({
  children,
  allowedRoles,
}) => {
  const user = useCurrentUser();

  if (!user || !allowedRoles.includes(user.role)) {
    toast.error("You do not have permissions to access");
    return <Navigate to="/" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={USER_ROUTES.LOGIN} />,
  },
  {
    path: "/test",
    element: <ConfirmReschedule/>,
  },

  {
    path: USER_ROUTES.TEAM_INVITE,
    element: (
      <ProtectedRouteAuth>
        <TeamInvitePage />
      </ProtectedRouteAuth>
    ),
  },

  {
    path: MENTOR_ROUTES.MENTOR,
    element: (
      <ProtectedRouteByRole allowedRoles={["MENTOR"]}>
        <DashboardLayout />
      </ProtectedRouteByRole>
    ),
    children: [
      {
        path: MENTOR_ROUTES.MENTOR_PAGE,
        element: <MentorHomePage />,
      },
      {
        path: MENTOR_ROUTES.SCHEDULE,
        element: (
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        ),
      },
      {
        path: MENTOR_ROUTES.BOOKING_REQUEST,
        element: (
          <ProtectedRoute>
            <BookingRequestPage />
          </ProtectedRoute>
        ),
      },
      {
        path: MENTOR_ROUTES.EMPTY_SCHEDULE,
        element: <EmptySchedulePage />,
      },
      {
        path: USER_ROUTES.BOOKING_HISTORY,
        element: (
          <ProtectedRoute>
            <BookingHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: USER_ROUTES.MESSAGE,
        element: (
          <ProtectedRoute>
            <RoomChat />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ":id",
            element: <ChatDetail />,
          },
        ],
      },
    ],
  },
  {
    path: STUDENT_ROUTES.STUDENT,
    element: (
      <ProtectedRouteByRole allowedRoles={["STUDENT"]}>
        <DashboardLayout />
      </ProtectedRouteByRole>
    ),
    children: [
      {
        path: STUDENT_ROUTES.STUDENT_PAGE,
        element: <StudentHomePage />,
      },
      {
        path: STUDENT_ROUTES.SCHEDULE,
        element: (
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        ),
      },
      {
        path: STUDENT_ROUTES.BOOKING,
        element: (
          <ProtectedRoute>
            <BookingMentorPage />
          </ProtectedRoute>
        ),
      },
      {
        path: USER_ROUTES.MESSAGE,
        element: (
          <ProtectedRoute>
            <RoomChat />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ":id", // Route con chỉ nên bao gồm `:id`
            element: <ChatDetail />,
          },
        ],
      },
      {
        path: USER_ROUTES.BOOKING_HISTORY,
        element: (
          <ProtectedRoute>
            <BookingHistory />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: ADMIN_ROUTES.ADMIN,
    element: (
      <ProtectedRouteByRole allowedRoles={["ADMIN"]}>
        <AdminLayout />
      </ProtectedRouteByRole>
    ),
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
      {
        path: ADMIN_ROUTES.OVERVIEW,
        element: <ManageOverview />,
      },
    ],
  },

  {
    path: USER_ROUTES.LOGIN,
    element: <Login />,
  },
]);
