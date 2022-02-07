import { createSlice } from "@reduxjs/toolkit";
import { updateLocalizableValue } from "../services/LocalizableService";
import toast from "react-hot-toast";

import { merge, isEmpty } from "lodash";

const initialState = {
  allIds: [],
  byId: {},
};

const slice = createSlice({
  name: "localizable",
  initialState,
  reducers: {
    get(state, action) {
      const localizables = action.payload;
      state.byId = localizables;
    },

    push(state, action) {
      const localizables = action.payload;
      merge(state.byId, localizables);
    },

    update(state, action) {
      const localizable = action.payload;
      const { id } = localizable;
      state.byId[id] = localizable;
    },
  },
});

export const getLocalizable = (localizableData) => async (dispatch) => {
  const { labels, descriptions } = localizableData;
  const entries = [...labels, ...descriptions].reduce((acc, localizable) => {
    const { id, language = "en", value = "" } = localizable;
    acc[id] = { id, language, value };
    return acc;
  }, {});

  dispatch(slice.actions.get(entries));
};

export const updateLocalizables = (localizablesChange) => async (dispatch) => {
  if (!isEmpty(localizablesChange)) {
    dispatch(slice.actions.push(localizablesChange));
    const entries = Object.values(localizablesChange).reduce(
      (acc, localizable, index) => {
        const { id, language = "en", value = "" } = localizable;
        acc[index] = { id, language, value };
        return acc;
      },
      []
    );
    updateLocalizableValue({ elements: entries }).then(() => {
      toast.success("Les modifications ont été effectuées avec succès");
    });
  }
};

const { reducer } = slice;
export { reducer };
