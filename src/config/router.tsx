import { createBrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TestApi from "../services/testApi";
import Login from "../pages/login/Login";
import ManageTopic from "../pages/admin/manage-topic";
import DashboardLayout from "../components/layouts/dashboard-layout";

import MentorHomePage from "../pages/mentor/home";
import UpdateScheduler from "../components/organisms/update-schedule";
import AdminLayout from "../components/layouts/admin-layout";
import ManageUser from "../pages/admin/manage-user";
import ManageSemester from "../pages/admin/manage-semester";
import {
  ADMIN_ROUTES,
  DASHBOARD_ROUTES,
  USER_ROUTES,
} from "../constants/routes";
import MentorSchedule from "../pages/mentor/schedule";
import ManageConfig from "../pages/admin/manage-config";

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
      <UpdateScheduler />
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
    path: DASHBOARD_ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      {
        path: DASHBOARD_ROUTES.MENTOR_PAGE,
        element: <MentorHomePage />,
      },
      {
        path: DASHBOARD_ROUTES.SCHEDULE,
        element: <MentorSchedule />,
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
