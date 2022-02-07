import { createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { getField } from "../services/FieldService";
import { updateLocalizableValue } from "../services/LocalizableService";

const initialState = {
  allIds: [],
  byId: {},
};

const slice = createSlice({
  name: "field",
  initialState,
  reducers: {
    get(state, action) {
      const fields = action.payload;
      state.byId = fields;
    },

    push(state, action) {
      const fields = action.payload;
      merge(state.byId, fields);
    },

    update(state, action) {
      const field = action.payload;
      const { id } = field;
      state.byId[id] = field;
    },
  },
});

export const addFields =
  (input, output = [], type = "get") =>
  (dispatch) => {
    const { fields } = input;
    dispatch(
      slice.actions[type](
        fields.reduce((acc, field) => {
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

export const getFieldById =
  (input, output, type = "get") =>
  async (dispatch) => {
    const field = await getField(input, output);
    dispatch(slice.actions[type](field));
    return field;
  };

export const updateFieldInfo =
  (input, output, type = "get") =>
  async (dispatch) => {
    const { field } = await updateLocalizableValue(input, output);
    dispatch(slice.actions[type](field));
  };

const { reducer } = slice;
export { reducer };
