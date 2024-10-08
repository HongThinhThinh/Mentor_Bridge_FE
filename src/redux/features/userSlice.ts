import { createSlice } from "@reduxjs/toolkit";
const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState, //initialState : initialState, : viết tắt khi tên field và tên biến trùng nhau
  reducers: {
    loginRedux: (state, action) => {
      return action.payload; // Trả về trạng thái mới
    },
    logout: () => initialState,
  },
});
export const { loginRedux, logout } = userSlice.actions;
export default userSlice.reducer;
