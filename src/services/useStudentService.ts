/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { ADMIN_API, TEAM_API } from "../constants/endpoints";
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
      toast.error(e?.response?.message || "Có lỗi khi tạo team");
      console.error("Create Team Error: ", e);
    } finally {
      setIsLoading(false);
    }
  }, [callApi, user, dispatch, getUserTeam]);

  const searchTeamMembers = useCallback(
    async (searchTerm: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "get",
          `${ADMIN_API.ADMIN}?search=${searchTerm}&role=STUDENT`
        );
        return response?.data;
      } catch (e: any) {
        // toast.error(e?.response?.data || "Có lỗi khi tìm kiếm thành viên");
        console.error("Search Team Members Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  const inviteToGroup = useCallback(
    async (email: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "post",
          `http://103.200.20.149:8080/api/team/invite?email=${email}&teamCode=${user?.teamCode}`
        );
        toast.success("Mời thành công");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.message || "Có lỗi khi mời thành viên");
        console.error("Invite to Group Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  const acceptInvitation = useCallback(
    async (token: string, teamCode: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "put",
          `accept-invitation?token=${token}&teamCode=${teamCode}`
        );

        return response?.message;
      } catch (e: any) {
        toast.error(e?.response?.data || "Có lỗi khi chấp nhận");
        console.error("Invite to Group Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  return {
    loading,
    createTeam,
    getUserTeam,
    searchTeamMembers,
    inviteToGroup,
    acceptInvitation,
  };
};

export default useStudentService;
