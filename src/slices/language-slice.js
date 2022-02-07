import { createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";
import flagFr from "../assets/images/Flags/rectangular/fr.png";
import flagEn from "../assets/images/Flags/rectangular/en.png";
import flagDe from "../assets/images/Flags/rectangular/de.png";
import flagEs from "../assets/images/Flags/rectangular/es.png";

const initialState = {
  allIds: ["fr", "en", "es", "de"],
  byId: {
    fr: flagFr,
    en: flagEn,
    de: flagDe,
    es: flagEs,
  },
  localLanguage: "en",
};

const slice = createSlice({
  name: "language",
  initialState,
  reducers: {
    get(state, action) {
      state.localLanguage = action.payload;
    },

    push(state, action) {
      state.localLanguage = action.payload;
    },

    update(state, action) {
      state.localLanguage = action.payload;
    },
  },
});

export const changeLocalLanguage =
  (input, output, type = "get") =>
  async (dispatch) => {
    dispatch(slice.actions[type](input));
  };

const { reducer } = slice;
export { reducer };
