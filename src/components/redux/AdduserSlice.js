import { createSlice, current } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  userList: localStorage.getItem("userList")
    ? JSON.parse(localStorage.getItem("userList"))
    : [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.userList = [...state.userList, { ...payload, id: v4() }];

      localStorage.setItem("userList", JSON.stringify(state.userList));
      toast.success("add users", {
        position: "top-right",
      });
      return state;
    },
    updateUser: (state, { payload }) => {
      const index = state.userList.findIndex((user) => user.id === payload.id);
      if (index !== -1) {
        state.userList[index] = payload;
        localStorage.setItem("userList", JSON.stringify(state.userList));
        return state;
      }
    },
    removeUser(state, { payload }) {
      const removeItem = state.userList.filter((items) => items.id !== payload);
      state.userList = removeItem;
      localStorage.setItem("userList", JSON.stringify(state.userList));
      toast.warning("delete users", {
        position: "top-right",
      });
    },
  },
});

export const { addUser, updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
