import { stringifyQuery } from "../../../utils/stringifyQuery";

export const GET_SECTIONS_ELEMENTS = stringifyQuery({
  type: "query",
  inputName: "GetEntity",
  outputName: "section",
  inputParams: "($id: ID!)",
  outputParams: "(id: $id)",
  outputFields: [
    "id",
    "elementType",
    "name",
    "childOrder",
    `elements { 
        ... on Action { 
            id 
            name 
            descriptions { 
                language 
                value 
            } 
            labels { 
                language value 
            }
        } 
        ... on Field { 
            id 
            name 
            descriptions { 
                language 
                value 
            } 
            labels { 
                language 
                value 
            }
        } 
    }`,
  ],
});
