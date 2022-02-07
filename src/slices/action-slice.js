import { createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

const initialState = {
  allIds: [],
  byId: {},
};

const slice = createSlice({
  name: "actionItem",
  initialState,
  reducers: {
    get(state, action) {
      const actions = action.payload;
      state.byId = actions;
    },

    push(state, action) {
      const actions = action.payload;
      merge(state.byId, actions);
    },

    update(state, action) {
      const actionItem = action.payload;
      const { id } = actionItem;
      state.byId[id] = actionItem;
    },
  },
});

export const addActions =
  (input, output = [], type = "get") =>
  (dispatch) => {
    const { actions } = input;
    dispatch(
      slice.actions[type](
        actions.reduce((acc, field) => {
          const { id, name = "", labels = [], descriptions = [] } = field;
          acc[id] = {
            id,
            name,
            labels,
            descriptions,
          };
          return acc;
        }, {})
      )
    );
  };

const { reducer } = slice;
export { reducer };
