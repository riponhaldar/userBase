import { configureStore } from "@reduxjs/toolkit";
import AdduserSlice from "../AdduserSlice";


export const store = configureStore({
  reducer: {
    users: AdduserSlice,
  },
});
