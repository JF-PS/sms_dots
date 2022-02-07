import { isEmpty } from "lodash";

/*
 * The purpose of this function is to initialize
 * and update the droppableId of our section elements.
 */
export const format = (arraySectionsId, sections, elementType) => {
  let columnReFormat = {};
  arraySectionsId.map((idSection) => {
    if (sections && !isEmpty(sections)) {
      const myColumn = Object.values(sections).find(
        (section) =>
          parseInt(section.id) === parseInt(idSection) &&
          section.elementType === elementType
      );

      if (myColumn) {
        const list = myColumn.elements.map((element) => {
          element = { id: element, value: element };
          return element;
        });

        // Each column has to have a unique id
        columnReFormat[idSection] = {
          id: `${myColumn.id}`,
          list,
          elementType: myColumn.elementType,
        };
      }
    }

    return idSection;
  });

  return columnReFormat;
};
