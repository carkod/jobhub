import produce from "immer";
import { REMOVE_FILE_SUCCESSFUL, UPLOAD_SUCCESS } from "../actions/files";

export const filesReducer = produce((draft, action) => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return {
        ...draft,
        ...action.payload
      }
  }
}, {})
