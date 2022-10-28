import { Entry } from "../../interfaces";
import { EntriesState } from "./";

export type EntriesActionType =
  |{ type: "[Entry] Add-Entry"; payload: Entry }
  |{ type: "[Entry] Entry-Updated"; payload: Entry }
  |{ type: "[Entry] Refresh-Data"; payload: Entry[] }

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] Add-Entry":
      return { ...state, entries: [...state.entries, action.payload] };
    case '[Entry] Entry-Updated':
      return {
        ...state,
        entries: state.entries.map( entry => {
          if ( entry._id === action.payload._id ) {
            // Al momento del drop, se toma el entry del payload
            // y se remplaza unicamente los elementos que cambiaron
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        })
      }
    case '[Entry] Refresh-Data':
      return {...state, entries: [...action.payload]}
    
    default:
      return state;
  }
};
