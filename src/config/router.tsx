import { createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import TestApi from "../services/testApi";

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
      {test &&
        test?.map((item) => (
          <div key={item.id}>
            <h1>
              {" "}
              {item?.id} {item.name}
            </h1>
          </div>
        ))}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/test",
    element: <TestAPi />,
  },
]);