export const stringifyQuery = (query) => {
  const {
    type = "query",
    inputName = "",
    inputParams = "",
    outputName = "",
    outputParams = "",
    outputFields = [],
  } = query;

  return `${type} ${inputName}${inputParams}{
        ${outputName}${outputParams} {
          ${outputFields?.join(" ")}
        }
      }`;
};
