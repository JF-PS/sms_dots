import { difference, isEmpty, merge } from "lodash";

export default function createReducer(initialState, customMethods = {}) {
  const output = {
    setValue(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },

    reset() {
      return { ...initialState };
    },

    get(state, action) {
      const { byId, allIds } = state;
      const entry = action.payload;
      byId[entry.id] = entry;
      state.allIds = [...allIds, entry.id];
    },
    getMultiple(state, action) {
      const { byId } = state;
      const entries = action.payload;
      state.byId = entries;
      state.allIds = Object.keys(byId);
    },

    push(state, action) {
      const { byId, allIds } = state;
      const entry = action.payload;
      byId[entry.id] = entry;
      allIds.push(entry.id);
    },

    pushMultiple(state, action) {
      const { byId, allIds } = state;
      const entries = action.payload;
      merge(byId, entries);
      merge(allIds, Object.keys(byId));
    },

    update(state, action) {
      const { byId } = state;
      const entry = action.payload;
      const { id } = entry;
      byId[id] = merge(byId[id], entry);
    },
    updateMultiple(state, action) {
      const { byId } = state;
      const entries = action.payload;
      merge(byId, entries);
    },

    delete(state, action) {
      const { byId, allIds } = state;
      const entryId = action.payload;
      delete byId[entryId];
      state.allIds = allIds.filter((_entryId) => _entryId !== entryId);
    },
    deleteMultiple(state, action) {
      const { byId, allIds } = state;
      const entryIds = action.payload;
      entryIds.forEach((id) => {
        delete byId[id];
      });
      state.allIds = difference(allIds, entryIds);
    },
  };

  if (!isEmpty(customMethods)) return { ...output, ...customMethods };
  return output;
}
