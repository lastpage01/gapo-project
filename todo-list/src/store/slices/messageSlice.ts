import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MessageState {
  message: string
}

const initialState: MessageState = {
  message: '',
}

export const messageSlider = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    clearMessage(state) {
      state.message = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessage, clearMessage } = messageSlider.actions;

export default messageSlider.reducer;
