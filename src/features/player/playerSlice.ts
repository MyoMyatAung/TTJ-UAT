import { createSlice } from '@reduxjs/toolkit';

interface PlayerState {
  selectedGroup: string;
  skipIntro?: number;
  skipOutro?: number;
  showSetSkipDialog: boolean;
}

const initialState: PlayerState = {
  selectedGroup: '1-50 集',
  skipIntro: 0,
  skipOutro: 0,
  showSetSkipDialog: false,
};

export const playerSlice = createSlice({
  name: 'episode',
  initialState,
  reducers: {
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    setSkipIntro: (state, action) => {
      state.skipIntro = action.payload;
    },
    setSkipOutro: (state, action) => {
      state.skipOutro = action.payload;
    },
    setSkip: (state, action) => {
      state.skipIntro = action.payload.intro;
      state.skipOutro = action.payload.outro;
    },
    setShowSetSkipDialog: (state, action) => {
      state.showSetSkipDialog = action.payload;
    },
  },
});

export const { setSelectedGroup, setSkipIntro, setSkipOutro, setShowSetSkipDialog, setSkip } = playerSlice.actions;

export default playerSlice.reducer;
