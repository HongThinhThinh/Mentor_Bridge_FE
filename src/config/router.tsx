import { createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import TestApi from "../services/testApi";
import Login from "../pages/login/Login";
import ManageTopic from "../pages/admin/manage-topic";
import DashboardLayout from "../components/layouts/dashboard-layout";
import { HOME } from "../constants/routes";
import MentorHomePage from "../pages/mentor/home";
import UpdateScheduler from "../components/organisms/update-schedule";
import { MultipleTime } from "../components/molecules/mutiple-time/MultipleTime";
import { Button } from "../components/atoms/button/Button";
import { AiOutlineSend } from "react-icons/ai";

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
    path: "/login",
    element: <Login />,
  },
]);
