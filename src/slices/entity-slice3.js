import { createSlice } from "@reduxjs/toolkit";
import createHandler from "../utils/create-handler";
import { arrayToObj } from "../utils/formatObjArray";
import { updateLocalizableValue } from "../services/LocalizableService";
import { entityApi } from "../api/entity-api";
import {
  getNbEntities,
  getStuctureTree,
  updateDefaultElements,
  getById,
} from "../services/EntityService";

import createReducer from "../utils/create-reducer";

const name = "entity";

const initialState = {
  allIds: [],
  byId: {},
};

const slice = createSlice({
  name,
  initialState,
  reducers: createReducer(name, initialState, {}),
});

export const {
  // setValue,
  // reset,
  // get: getEntity,
  getMultiple: getEntities,
  // create: createEntity,
  // createMultiple: createEntities,
  // update: updateEntity,
  // updateMultiple: updateEntities,
  // delete: deleteEntity,
  // deleteMultiple: deleteEntities,
  countNbEntities = () => async () => {
    return await entityApi.count();
  },
} = createHandler(slice, entityApi);

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
    dispatch(slice.actions[type](arrayToObj(input)));
  };

const { reducer } = slice;
export { reducer };
