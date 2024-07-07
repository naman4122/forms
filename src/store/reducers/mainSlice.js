import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "Form Slice",
  initialState: {
    formTypesArr: [],
    submitData: {
      message: "Submitted data will be visible here!",
    },
  },
  reducers: {
    addFormObj(state, action) {
      state.formTypesArr.push(action.payload);
    },

    removeElement(state, action) {
      state.formTypesArr = action.payload;
    },

    addSubmittedData(state, action) {
      state.submitData = action.payload;
    },
  },
});
const formHandleActions = counterSlice.actions;
const formReducers = counterSlice.reducer;

export { formHandleActions, formReducers };
export default counterSlice;
