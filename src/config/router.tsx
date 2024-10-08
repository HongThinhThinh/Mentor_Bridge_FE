import { createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import TestApi from "../services/testApi";
import Login from "../pages/login/Login";
import ManageTopic from "../pages/admin/manage-topic";
import DashboardLayout from "../components/layouts/dashboard-layout";
import {
  ADMIN,
  ADMIN_SEMESTER,
  ADMIN_TOPIC,
  ADMIN_USER,
  HOME,
} from "../constants/routes";
import MentorHomePage from "../pages/mentor/home";
import UpdateScheduler from "../components/organisms/update-schedule";
import AdminLayout from "../components/layouts/admin-layout";
import ManageUser from "../pages/admin/manage-user";
import ManageSemester from "../pages/admin/manage-semester";


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
      {/* {test &&
        test?.map((item: any) => (
          <div key={item?.id}>
            <h1>
              {" "}
              {item?.id} {item.name}
            </h1>
          </div>
        ))} */}
      <UpdateScheduler />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/test",
    element: <TestAPi />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "topic",
        element: <ManageTopic />,
      },
      {
        path: HOME,
        element: <MentorHomePage />,
      },
    ],
  },
  {
    path: HOME,
    element: <DashboardLayout />,
  },

  {
    path: ADMIN,
    element: <AdminLayout />,
    children: [
      {
        path: ADMIN_TOPIC,
        element: <ManageTopic />,
      },
      {
        path: ADMIN_USER,
        element: <ManageUser />,
      },
      {
        path: ADMIN_SEMESTER,
        element: <ManageSemester />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
