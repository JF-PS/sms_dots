import { stringifyQuery } from "../../../utils/stringifyQuery";

export const UPDATE_DEFAULT_ELEMENTS = stringifyQuery({
  type: "mutation",
  inputName: "UpdateDefaultElement",
  outputName: "toggleDefault",
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
  outputFields: ["id"],
});
