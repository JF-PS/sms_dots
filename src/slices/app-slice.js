import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navBarDrawerOpen: false,
  navBarDrawerAnchor: "right",
  navHistoryIds: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setValue(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    push(state, action) {
      const { id } = action.payload;
      state.navHistoryIds.push(id);
    },
    delete(state, action) {
      const { id } = action.payload;
      const breadcrumb = state.navHistoryIds;
      const indexToDelete = breadcrumb.indexOf(breadcrumb[id]);
      breadcrumb.splice(indexToDelete, 1);
    },
  },
});

export const setValue = (key, value) => (dispatch) => {
  dispatch(slice.actions.setValue({ key, value }));
};

export const pushNavHistory = (id) => (dispatch) => {
  dispatch(slice.actions.push({ id }));
};

export const deleteNavHistory = (id) => (dispatch) => {
  dispatch(slice.actions.delete({ id }));
};

const { reducer } = slice;
export { reducer };
