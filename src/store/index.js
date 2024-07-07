import { configureStore } from "@reduxjs/toolkit";
import { formReducers } from "./reducers/mainSlice";

export const store = configureStore({
  
  reducer: formReducers,
});
