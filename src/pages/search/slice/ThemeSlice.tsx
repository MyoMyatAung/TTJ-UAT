import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  data: boolean;
}

const initialState: ThemeState = {
  data:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches,
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state, action) => {
      state.data = !state.data;
    },
  },
});

// Actions generated from the slice
export const { switchTheme } = ThemeSlice.actions;

// A selector to get the navbar data from the state
export const selectTheme = (state: any) => state.theme.data;

// The reducer
export default ThemeSlice.reducer;
