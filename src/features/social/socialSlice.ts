import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  activeTab: number;
}

const initialState: CounterState = {
  activeTab: 2,
};

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    }
  },
});

export const { setActiveTab } = socialSlice.actions;

export default socialSlice.reducer;
