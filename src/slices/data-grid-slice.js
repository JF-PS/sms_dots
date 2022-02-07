import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rowCount: 0,
};

const slice = createSlice({
  name: "dataGrid",
  initialState,
  reducers: {
    get(state, action) {
      state.rowCount = action.payload;
    },

    push(state, action) {
      state.rowCount = action.payload;
    },

    update(state, action) {
      state.rowCount = action.payload;
    },
  },
});

export const updateRowCount = (newRowCount) => (dispatch) => {
  dispatch(slice.actions["update"](newRowCount));
};

const { reducer } = slice;
export { reducer };
