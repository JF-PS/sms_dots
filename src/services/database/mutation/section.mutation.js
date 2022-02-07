import { stringifyQuery } from "../../../utils/stringifyQuery";

export const CREATE_SECTION = stringifyQuery({
  type: "mutation",
  inputName: "CreateSection",
  outputName: "createOrUpdateSection",
  inputParams: "($entityId: ID! $elementType: SectionTypeEnum! $name: String)",
  outputParams: `( 
    input: { 
      attributes: { 
        name: $name 
        entityId: $entityId 
        elementType: $elementType 
      } 
    })`,
  outputFields: [
    "id",
    "name",
    "childOrder",
    "elementType",
    `entity {
        id
        name
        defaultFields
        defaultActions
        labels {
          id
          language
          value
        }
        descriptions {
          id
          language
          value
        }
        childOrder
    }`,
  ],
});

export const UPDATE_SECTION_NAME = stringifyQuery({
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
  outputFields: [
    "id",
    "name",
    "elements: childOrder",
    "elementType",
    `entity {
        id
        name
        defaultFields
        defaultActions
        labels {
          id
          language
          value
        }
        descriptions {
          id
          language
          value
        }
        childOrder
    }`,
  ],
});

export const DESTROY_SECTION = stringifyQuery({
  type: "mutation",
  inputName: "destroySection",
  outputName: "destroySection",
  inputParams: "($id: ID!)",
  outputParams: `(
      input: { 
        id: $id, 
        clientMutationId: "" 
      }
    )`,
  outputFields: [
    "elements: childOrder",
    "elementType",
    "id",
    "name",
    `entity {
    id
    name
    defaultFields
    defaultActions
    labels {
      id
      language
      value
    }
    descriptions {
      id
      language
      value
    }
    childOrder
}`,
  ],
});

export const UPDATE_CHILD_ORDER = stringifyQuery({
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
  outputFields: ["id", "childOrder"],
});
