import { stringifyQuery } from "../../../utils/stringifyQuery";

export const GET_ENTITIES = stringifyQuery({
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
  outputFields: [
    "id",
    "name",
    "defaultFields",
    "defaultActions",
    "labels { id language value}",
    "descriptions { id language value}",
    "childOrder",
  ],
});

export const NB_ENTITIES = stringifyQuery({
  type: "query",
  inputName: "nbEntities",
  outputName: "stats",
  inputParams: "",
  outputParams: "",
  outputFields: ["count(model: entity)"],
});

export const GET_ENTITY_SECTIONS = stringifyQuery({
  type: "query",
  inputName: "GetEntity",
  outputName: "entity",
  inputParams: "($id: ID!)",
  outputParams: "(id: $id)",
  outputFields: [
    "id",
    "name",
    "defaultFields",
    "defaultActions",
    "labels { id language value}",
    "descriptions { id language value}",
    `sections { 
      id 
      elementType 
      name 
      childOrder 
      entity {
        id
      } 
    }`,
    "childOrder",
  ],
});
