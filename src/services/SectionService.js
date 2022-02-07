import { GET_SECTIONS_ELEMENTS } from "./database/query/section.query";
import {
  CREATE_SECTION,
  DESTROY_SECTION,
  UPDATE_SECTION_NAME,
  UPDATE_CHILD_ORDER,
} from "./database/mutation/section.mutation";
import fetchGQL from "./database/fetchGQL";
import { stringifyQuery } from "../utils/stringifyQuery";

export const getSectionsElements = (sectionId) => {
  const params = { id: sectionId };
  return fetchGQL(GET_SECTIONS_ELEMENTS, "post", params).then((result) => {
    if (result) return result.section;
    return false;
  });
};

export const createSection = (input, output) => {
  const query = stringifyQuery({
    type: "mutation",
    inputName: "CreateSection",
    outputName: "createOrUpdateSection",
    inputParams:
      "($entityId: ID! $elementType: SectionTypeEnum! $name: String)",
    outputParams: `( 
      input: { 
        attributes: { 
          name: $name 
          entityId: $entityId 
          elementType: $elementType 
        } 
      })`,
    outputFields: output,
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.createOrUpdateSection;
    return false;
  });
};

export const updateSectionName = (input, output) => {
  const query = stringifyQuery({
    type: "mutation",
    inputName: "updateSectionName",
    outputName: "createOrUpdateSection",
    inputParams: "($id: ID! $name: String)",
    outputParams: `( 
      input: { 
        id: $id
        attributes: { 
          name: $name 
        } 
      })`,
    outputFields: output,
  });
  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.createOrUpdateSection;
    return false;
  });
};

export const getEntityRootSection = (input) => {
  const query = stringifyQuery({
    type: "query",
    inputName: "allSections",
    outputName: "allSections",
    inputParams: "($entityId: ID!, $elementType: SectionTypeEnum )",
    outputParams: `(filter: {entityId: $entityId, elementType: $elementType}, pagination: {first: 1, skip: 0})`,
    outputFields: ["id", "name", "elements: childOrder", "elementType"],
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.allSections;
    return false;
  });
};

// export const updateSectionChildOrder = (id, childOrder) => {
//   const params = { id, childOrder };
//   return fetchGQL(UPDATE_CHILD_ORDER, "post", params).then((result) => {
//     if (result) return result.createOrUpdateSection;
//     return false;
//   });
// };

export const updateSectionChildOrder = (input) => {
  const query = stringifyQuery({
    type: "mutation",
    inputName: "updateChildOrder",
    outputName: "createOrUpdateSection",
    inputParams: "($id: ID!, $childOrder: [ID!])",
    outputParams: `(
        input: { 
          id: $id, 
          attributes: {
            childOrder: $childOrder
          }
        }
      )`,
    outputFields: [
      "id",
      "elementType",
      "name",
      "elements: childOrder",
      `entity {
        id
      }`,
    ],
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.createOrUpdateSection;
    return false;
  });
};

export const destroySection = (sectionId) => {
  const params = { id: sectionId };
  return fetchGQL(DESTROY_SECTION, "post", params).then((result) => {
    if (result) return result.destroySection;
    return false;
  });
};
