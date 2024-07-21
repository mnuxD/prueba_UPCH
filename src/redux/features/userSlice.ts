import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    nat: "",
    gender: ""
  },
  searchText: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    }
  }
});

export const { setSearchText, setFilters } = userSlice.actions;

export default userSlice.reducer;
