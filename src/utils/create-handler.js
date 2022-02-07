import { arrayToObj } from "../utils/formatObjArray";

export default function createHandler({ actions }, api) {
  return {
    setIsLoading: (value) => (dispatch) => {
      dispatch(actions.setValue({ key: "isLoading", value }));
    },
    setValue: (key, value) => (dispatch) => {
      dispatch(actions.setValue({ key, value }));
    },
    reset: () => (dispatch) => {
      dispatch(actions.reset());
    },
    get:
      (input, output, type = "get") =>
      async (dispatch) => {
        // const entry = await api.get(input, output);
        // if (entry) {
        //   dispatch(actions[type === "push" ? "push" : "get"](entry));
        //   return entry;
        // }
      },
    // option: <multiple | rows>
    getMultiple:
      (input, output, type = "getMultiple") =>
      async (dispatch) => {
        const entries = await api.getMultiple(input, output);
        if (entries) {
          dispatch(actions["getMultiple"](arrayToObj(entries)));
          return entries;
        }
      },
    // option: <'' | row>
    create:
      (input, output, type = "push") =>
      async (dispatch) => {
        // const entry = await api.create(input, output);
        // if (entry) {
        //   dispatch(actions[`${type}${capitalizeFirstLetter(option)}`](entry));
        // }
        // return entry;
      },
    // option: <multiple | rows>
    createMultiple:
      (input, output, type = "pushMultiple") =>
      async (dispatch) => {
        // const response = await api.createMultiple(input, output);
        // if (response) {
        //   dispatch(
        //     actions[`${type}${capitalizeFirstLetter(option)}`](
        //       response.data || []
        //     )
        //   );
        // }
        // return response;
      },
    update:
      ({ id, ...other }, output, type = "update") =>
      async (dispatch) => {
        // const entry = await api.update(
        //   { id, attributes: { ...other } },
        //   output
        // );
        // if (entry) {
        //   dispatch(
        //     actions[`${type}${capitalizeFirstLetter(option)}`]({ id, ...other })
        //   );
        // }
        // return entry;
      },
    updateMultiple:
      ({ ids, attributes }, output, type = "updateMultiple") =>
      async (dispatch) => {
        // const res = await api.updateMultiple({ ids, attributes }, output);
        // if (res && "status" in res && res.status === 200) {
        //   const inputs = ids.map((id) => ({ id, ...attributes }));
        //   dispatch(actions[`${type}${capitalizeFirstLetter(option)}`](inputs));
        // }
        // return res;
      },
    delete: (id) => async (dispatch) => {
      //   const entry = await api.deleteOne(id, ["id"]);
      //   if (entry) {
      //     dispatch(actions.delete(entry.id));
      //   }
      //   return entry;
    },
    deleteMultiple: (ids) => async (dispatch) => {
      //   const entries = await api.deleteMultiple(ids);
      //   if (entries) {
      //     dispatch(actions.deleteMultiple(ids));
      //   }
      //   return entries;
    },
  };
}
