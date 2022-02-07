import { createSlice } from "@reduxjs/toolkit";
import { getEntitySections } from "../services/EntityService";
import {
  getSectionsElements,
  createSection,
  updateSectionName,
  updateSectionChildOrder,
  getEntityRootSection,
  destroySection,
} from "../services/SectionService";
import { merge } from "lodash";

const initialState = {
  allIds: [],
  byId: {},
};

const slice = createSlice({
  name: "section",
  initialState,
  reducers: {
    get(state, action) {
      const sections = action.payload;
      state.byId = sections;
    },

    push(state, action) {
      const sections = action.payload;
      merge(state.byId, sections);
    },

    update(state, action) {
      const section = action.payload;
      const { id } = section;
      state.byId[id] = section;
    },

    delete(state, action) {
      const sectionId = action.payload;
      delete state.byId[sectionId];
    },
  },
});

const reformatSection = (sections, entityId) => {
  return sections.reduce((acc, section) => {
    const { id, name = "", childOrder = [], elementType = "field" } = section;
    acc[id] = {
      id,
      name,
      elements: childOrder,
      elementType: elementType,
      entityId,
    };
    return acc;
  }, {});
};

export const getEntitySection =
  (input, output, type = "get") =>
  async (dispatch) => {
    const { id } = input;
    const entity = await getEntitySections(input, output);
    const sections = reformatSection(entity.sections, id);
    dispatch(slice.actions[type](sections));
    return entity;
  };

export const getItemSection = (sectionId) => async (dispatch) => {
  const section = await getSectionsElements(sectionId);
  return {
    elementType: section.elementType,
    elements: section.elements,
  };
};

export const updateElements =
  (sectionId, elements, oldSectionId = null, oldElements = null) =>
  async (dispatch) => {
    const reformatElements = (elements) => {
      return elements.reduce((acc, element, index) => {
        acc[index] = element.value;
        return acc;
      }, []);
    };

    // End Section :
    const updateEndSection = await updateSectionChildOrder({
      id: sectionId,
      childOrder: reformatElements(elements),
    });

    updateEndSection["entityId"] = updateEndSection.entity.id;
    dispatch(slice.actions["update"](updateEndSection));

    if (oldSectionId && oldElements) {
      // Start Section :
      const updateStartSection = await updateSectionChildOrder({
        id: oldSectionId,
        childOrder: reformatElements(oldElements),
      });
      updateStartSection["entityId"] = updateStartSection.entity.id;
      dispatch(slice.actions["update"](updateStartSection));
    }
  };

export const createNewSection =
  (input, output, type = "get") =>
  async (dispatch) => {
    const newSection = await createSection(input, output);
    newSection.entity.childOrder.push(newSection.id);
    newSection["entityId"] = newSection.entity.id;
    dispatch(slice.actions[type](newSection));
    return newSection.entity;
  };

export const deleteSection = (sectionId) => async (dispatch) => {
  const { id, entity, elements, elementType } = await destroySection(sectionId);

  dispatch(slice.actions["delete"](id));

  const firstSection = await getEntityRootSection({
    entityId: entity.id,
    elementType,
  });

  const childOrder = [...firstSection[0].elements, ...elements];

  const rootSection = await updateSectionChildOrder({
    id: firstSection[0].id,
    childOrder,
  });
  rootSection["entityId"] = rootSection.entity.id;

  dispatch(slice.actions["update"](rootSection));

  return entity;
};

export const updateName =
  (input, output, type = "get") =>
  async (dispatch) => {
    const section = await updateSectionName(input, output);
    dispatch(slice.actions["update"](section));
  };

const { reducer } = slice;
export { reducer };
