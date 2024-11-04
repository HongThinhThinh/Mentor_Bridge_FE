import api from "../config/api";
import { USER_API } from "../constants/endpoints";
import { loginRedux } from "../redux/features/userSlice";
import { store } from "../redux/store"; // Import the store directly

export const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem("token");
  if (refreshToken) {
    const response = await api.post(USER_API.REFRESH, {
      token: refreshToken,
    });
    const newAccessToken = response.data.token;
    const newRefreshToken = response.data.refreshToken;

    // Update tokens in local storage
    localStorage.setItem("token", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    // Dispatch loginRedux action to update the Redux state
    store.dispatch(loginRedux(response.data));

    return newAccessToken;
  }
  throw new Error("Refresh token not available");
};
