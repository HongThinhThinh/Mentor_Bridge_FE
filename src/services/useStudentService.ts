/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { TEAM_API } from "../constants/endpoints";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "../utils/getcurrentUser";
import { loginRedux } from "../redux/features/userSlice";

const useStudentService = () => {
  const { callApi, loading, setIsLoading } = useApiService();
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const getUserTeam = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi(
        "get",
        `${TEAM_API.TEAM}?teamCode=${user?.teamCode}`
      );
      return response?.data;
    } catch (e: any) {
      console.error("Fetch User Team Error: ", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, user?.teamCode, setIsLoading]);
  const createTeam = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("post", TEAM_API.TEAM);
      const newUser = { ...user, teamCode: response.data.code };
      dispatch(loginRedux(newUser));
      toast.success("Tạo team thành công");
      await getUserTeam();

      return response?.data;
    } catch (e: any) {
      toast.error(e?.response?.data || "Có lỗi khi tạo team");
      console.error("Create Team Error: ", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, user, dispatch, getUserTeam]);

  return { loading, createTeam, getUserTeam };
};

export default useStudentService;
