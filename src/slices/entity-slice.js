import { createSlice } from "@reduxjs/toolkit";
import {
  getEntitiesFilter,
  getNbEntities,
  getStuctureTree,
  updateDefaultElements,
  getById,
} from "../services/EntityService";
import { updateLocalizableValue } from "../services/LocalizableService";
import { merge } from "lodash";

const initialState = {
  allIds: [],
  byId: {},
};

const slice = createSlice({
  name: "entity",
  initialState,
  reducers: {
    get(state, action) {
      const entities = action.payload;
      state.byId = entities;
    },

    push(state, action) {
      const entities = action.payload;
      merge(state.byId, entities);
    },

    update(state, action) {
      const entity = action.payload;
      const { id } = entity;
      state.byId[id] = entity;
    },
  },
});

export const updateDefaultValues =
  (input, output, type = "get") =>
  async (dispatch) => {
    const entity = await updateDefaultElements(input, output);
    dispatch(slice.actions[type](entity));
  };

export const updateEntity =
  (input, output, type = "get") =>
  async (dispatch) => {
    dispatch(slice.actions[type](input));
  };

export const updateEntitiesInfo =
  (input, output, type = "get") =>
  async (dispatch) => {
    const response = await updateLocalizableValue(input, output);
    dispatch(slice.actions[type](response.entity));
  };

export const getEntities =
  (input, output, type = "get") =>
  async (dispatch) => {
    const entities = await getEntitiesFilter(input, output);
    if (entities) {
      const entries = entities.reduce((acc, entity) => {
        const {
          id,
          name = "",
          labels = [],
          descriptions = [],
          childOrder = [],
          defaultFields = [],
          defaultActions = [],
        } = entity;

        acc[id] = {
          id,
          name,
          labels,
          descriptions,
          childOrder,
          defaultFields,
          defaultActions,
        };

        return acc;
      }, {});

      console.log(entries);

      dispatch(slice.actions[type](entries));
    }
    return entities;
  };

export const getEntity =
  (input, output, type = "get") =>
  async (dispatch) => {
    const entity = await getById(input, output);
    dispatch(slice.actions[type](entity));
    return entity;
  };

export const getTreeStucture =
  (input, output, type = "get") =>
  async () => {
    const { parent = {}, treeStructure = [] } = await getStuctureTree(
      input,
      output
    );
    return { parent, treeStructure };
  };

export const updateWithTreeStructure =
  (input, output, type = "get") =>
  async (dispatch) => {
    const entries = input.reduce((acc, entity) => {
      const {
        id,
        name = "",
        labels = [],
        descriptions = [],
        childOrder = [],
        defaultFields = [],
        defaultActions = [],
      } = entity;

      acc[id] = {
        id,
        name,
        labels,
        descriptions,
        childOrder,
        defaultFields,
        defaultActions,
      };

      return acc;
    }, {});

    dispatch(slice.actions[type](entries));
  };

export const countNbEntities = () => async (dispatch) => {
  return await getNbEntities();
};

const { reducer } = slice;
export { reducer };
