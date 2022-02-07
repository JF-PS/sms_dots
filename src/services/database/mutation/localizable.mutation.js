import { stringifyQuery } from "../../../utils/stringifyQuery";

export const UPDATE_LOCALIZABLE = stringifyQuery({
  type: "mutation",
  inputName: "updateLocalizable",
  outputName: "createOrUpdateLocalizable",
  inputParams: `(
    $id: ID,
    $value: String
  )`,
  outputParams: `(
    input: { 
      attributes: {
       value: $value
      }
      id: $id
  })`,
  outputFields: ["id", "value"],
});
