import {
  GET_ENTITY_SECTIONS,
  NB_ENTITIES,
} from "./database/query/entity.query";
import { UPDATE_DEFAULT_ELEMENTS } from "./database/mutation/entity.mutation";
import fetchGQL from "./database/fetchGQL";
import { stringifyQuery } from "../utils/stringifyQuery";
import { merge } from "lodash";

/**
 *
 * @param {*} input
 * @param {*} output
 * @returns
 */
export const getEntitiesFilter = (input, output) => {
  const query = stringifyQuery({
    type: "query",
    inputName: "filterEntity",
    outputName: "allEntities",
    inputParams: "($nameContains: String, $first: Int, $skip: Int)",
    outputParams: `(
      filter: {
        nameContains: $nameContains
      } 
      pagination: { 
        first: $first, 
        skip: $skip 
      })`,
    outputFields: output,
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.allEntities;
    return false;
  });
};

export const getNbEntities = () => {
  const params = {};
  return fetchGQL(NB_ENTITIES, "post", params).then((result) => {
    if (result) return result.stats.count;
    return false;
  });
};

export const getEntitySections = (input, output) => {
  const query = stringifyQuery({
    type: "query",
    inputName: "GetEntity",
    outputName: "entity",
    inputParams: "($id: ID!)",
    outputParams: "(id: $id)",
    outputFields: output,
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.entity;
    return false;
  });
};

export const getById = (input, output) => {
  const query = stringifyQuery({
    type: "query",
    inputName: "entity",
    outputName: "entity",
    inputParams: `($id: ID! )`,
    outputParams: `(id: $id)`,
    outputFields: output,
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.entity;
    return false;
  });
};

export const updateDefaultElements = (input, output) => {
  const query = stringifyQuery({
    type: "mutation",
    inputName: "toggleDefault",
    outputName: "entity:toggleDefault",
    inputParams: `(
        $entityId: ID! 
        $elementId: ID! 
        $elementType: SectionTypeEnum!
    )`,
    outputParams: `(
      input: { 
        attributes: { 
          entityId: $entityId 
          elementId: $elementId 
          elementType: $elementType 
        }
      })`,
    outputFields: output,
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.entity;
    return false;
  });
};

export const getStuctureTree = (input, output) => {
  const query = stringifyQuery({
    type: "query",
    inputName: "entity",
    outputName: "entity",
    inputParams: "($id: ID! )",
    outputParams: `(id: $id)`,
    outputFields: output,
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result)
      return {
        parent: result.entity,
        treeStructure: result.entity.children || result.entity.ancestors,
      };
    return false;
  });
};
