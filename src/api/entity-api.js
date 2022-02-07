import fetchGQL from "../services/database/fetchGQL";
import { stringifyQuery } from "../utils/stringifyQuery";

export const entityApi = {
  get: (input, output) => {
    // code
  },
  getMultiple: async (input, output) => {
    return fetchGQL(
      stringifyQuery({
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
      }),
      "post",
      input
    ).then((result) => {
      if (result) return result.allEntities;
      return false;
    });
  },
  create: (input, output) => {
    // code
  },
  createMultiple: (input, output) => {
    // code
  },
  update: (input, output) => {
    // code
  },
  updateMultiple: (input, output) => {
    // code
  },
  delete: (input, output) => {
    // code
  },
  deleteMultiple: (input, output) => {
    // code
  },
  count: async () => {
    return fetchGQL(
      stringifyQuery({
        type: "query",
        inputName: "nbEntities",
        outputName: "stats",
        inputParams: "",
        outputParams: "",
        outputFields: ["count(model: entity)"],
      }),
      "post",
      {}
    ).then((result) => {
      if (result) return result.stats.count;
      return false;
    });
  },
};
