import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    sidebarToggled: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    mobileSidebarToggled: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    mobileSidebarClosed: (state) => {
      state.mobileSidebarOpen = false;
    },
  },
});

export const { sidebarToggled, mobileSidebarToggled, mobileSidebarClosed } =
  uiSlice.actions;
export default uiSlice.reducer;
