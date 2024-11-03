/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { loginRedux } from "../redux/features/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, ggProvider } from "../config/firebase";
import { USER_API } from "../constants/endpoints";
import { useNavigateByRole } from "../utils/navigate";

const useAuthService = () => {
  const { callApi, loading, setIsLoading } = useApiService();
  const router = useNavigate();
  const dispatch = useDispatch();
  const navigateByRole = useNavigateByRole();
  const register = useCallback(
    async (values: any) => {
      try {
        const response = await callApi("post", USER_API.REGISTER, {
          ...values,
          avt: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
        });
        toast.success("Sign Up Successfully, Please Check Your Mail");

        return response;
      } catch (e: any) {
        toast.error(e?.response?.data || "Registration failed");
      }
    },
    [callApi]
  );

  const login = useCallback(
    async (values: any) => {
      try {
        const response = await callApi("post", USER_API.LOGIN, values);
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userId", response?.data?.id);
        dispatch(loginRedux(response?.data));
        navigateByRole(response.data.role);
        toast.success("Login Successfully");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Login failed");
      }
    },
    [callApi]
  );

  const loginGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, ggProvider);
      const token = await result.user?.getIdToken();
      if (token) {
        const res = await callApi("post", USER_API.LOGIN_GOOGLE, { token });
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("userId", res?.data?.id);
        dispatch(loginRedux(res?.data));
        navigateByRole(res?.data?.role);
      }
    } catch (e: any) {
      toast.error(e.response.data);
      console.error("Error during Google sign-in or API request:", e);
    }
  }, [callApi, dispatch, router]);

  return { register, login, loginGoogle, loading, setIsLoading };
};

export default useAuthService;
