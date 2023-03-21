import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  id: number[];
  username: string;
}

const initialState: InitialState = {
  id: [],
  username: ''
}

const dataSlice = createSlice({
  name: "idSlice",
  initialState,
  reducers: {
    increment: (state, action: { payload: number; type: string }) => {
      state.id = [...state.id, action.payload];
    },
    getuser: (state, action: { payload: string}) => {
      state.username = action.payload;
    }
  },
})

export const { increment, getuser } = dataSlice.actions;
export const DataReducer = dataSlice.reducer
