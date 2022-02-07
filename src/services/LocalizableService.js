import fetchGQL from "./database/fetchGQL";
import { stringifyQuery } from "../utils/stringifyQuery";

export const updateLocalizableValue = (
  input,
  output = ["id, value, language"]
) => {
  const query = stringifyQuery({
    type: "mutation",
    inputName: "createOrUpdateLocalizables",
    outputName: "createOrUpdateLocalizables",
    inputParams: `(
      $elements: [LocalizablesInput!]!
    )`,
    outputParams: `(
      input: {elements: $elements})`,
    outputFields: output,
  });

  return fetchGQL(query, "post", input).then((result) => {
    if (result) return result.createOrUpdateLocalizable;
    return false;
  });
};
