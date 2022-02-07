import fetchGQL from "./database/fetchGQL";
import { stringifyQuery } from "../utils/stringifyQuery";

/**
 *
 * @param {*} input
 * @param {*} output
 * @returns
 */
export const getField = (input, output) => {
  const query = stringifyQuery({
    type: "query",
    inputName: "field",
    outputName: "field",
    inputParams: "($id: ID!)",
    outputParams: `(id: $id)`,
    outputFields: output,
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.field;
    return false;
  });
};
