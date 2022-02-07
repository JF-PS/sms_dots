import { combineReducers } from "redux";

import { reducer as entitySlice } from "../slices/entity-slice";
import { reducer as sectionSlice } from "../slices/section-slice";
import { reducer as fieldSlice } from "../slices/field-slice";
import { reducer as actionSlice } from "../slices/action-slice";
import { reducer as dataGridSlice } from "../slices/data-grid-slice";
import { reducer as languageSlice } from "../slices/language-slice";
import { reducer as appSlice } from "../slices/app-slice";
import { reducer as localizableSlice } from "../slices/localizable-slice";

const rootReducer = combineReducers({
  entity: entitySlice,
  section: sectionSlice,
  field: fieldSlice,
  action: actionSlice,
  dataGrid: dataGridSlice,
  language: languageSlice,
  app: appSlice,
  localizable: localizableSlice,
});

export default rootReducer;
