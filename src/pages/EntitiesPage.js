import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, debounce } from "lodash";
import { getEntities, countNbEntities } from "../slices/entity-slice";
import { updateRowCount } from "../slices/data-grid-slice";
import DataList from "../components/DataList/DataList";
import { entitiesColumn } from "../components/ListPages/entitiesColumn";
import usePagination from "../hooks/usePagination";

const EntitiesPage = () => {
  const dispatch = useDispatch();
  const { byId: entities } = useSelector((store) => store.entity);
  const { rowCount } = useSelector((store) => store.dataGrid);
  const { skip, step, setStep, handlePageChange } = usePagination();
  const [nameContains, setNameContains] = useState("");
  const { localLanguage } = useSelector((store) => store.language);
  const myEntitiesColum = entitiesColumn(localLanguage);

  const filterEntities = useCallback(
    (first, skip, nameContains, type) => {
      return dispatch(
        getEntities(
          {
            first,
            skip,
            nameContains,
          },
          [
            "id",
            "name",
            "defaultFields",
            "defaultActions",
            "labels { id language value }",
            "descriptions { id language value }",
            "childOrder",
          ],
          type
        )
      ).then((entities) => {
        return entities;
      });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(countNbEntities()).then((result) => {
      dispatch(updateRowCount(result));
    });

    filterEntities(step, skip, "", "push");
  }, [dispatch, skip, step, filterEntities]);

  const handlePageSizeChange = useCallback(
    (newPageSize) => {
      setStep(newPageSize);
    },
    [setStep]
  );

  const handleSearchChange = (event) => {
    setNameContains(event.target.value);
    const shearch = debounce(async (nameContains) => {
      await filterEntities(step, skip, nameContains, "get");
    }, 1000);
    shearch(event.target.value);
  };

  if (!isEmpty(entities)) {
    return (
      <>
        <DataList
          sx={{ height: "90vh" }}
          rows={Object.values(entities)}
          rowCount={nameContains === "" ? rowCount : 0}
          columns={myEntitiesColum}
          nameContains={nameContains}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSearchChange={handleSearchChange}
          step={step}
        />
      </>
    );
  }
  return null;
};

export default EntitiesPage;
