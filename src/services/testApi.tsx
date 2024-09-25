import useApi from "../hooks/useApi";

function TestApi() {
  const { callApi, loading } = useApi();

  const testApi = async () => {
    return await callApi("get", "pet", null, "Successfully Call API");
  };

  const AddnewAPI = async () => {
    return await callApi(
      "post",
      "/abc",
      {
        title: "abc",
        age: 18,
      },
      "Add new success fully",
      "/"
    );
  };

  return { testApi, loading, AddnewAPI };
}

export default TestApi;
