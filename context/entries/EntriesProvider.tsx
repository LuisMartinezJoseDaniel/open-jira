import { FC, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { entriesApi } from "../../apis";

import { Entry, EntryStatus } from "../../interfaces";
import { EntriesContext, entriesReducer, EntriesActionType } from "./";

// Manejar el state del reducer
export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: []
};

interface Props {
  children?: React.ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const onAddEntry = async ( description: string ) => {
    try {
      // Mandar la informacion al backend
      const {data} = await entriesApi.post<Entry>( '/entries', {
        description
      } );
  
      dispatch( {
        type: '[Entry] Add-Entry',
        payload: data
      });
      
    } catch (error) {
      
    }

  };

  const onUpdateEntry = async( {_id, description, status}: Entry ) => { 
    try {
      // Mandar la informacion al backend para actualizar
      // retorna la data de tipo Entry
      const { data } = await entriesApi.put<Entry>( `/entries/${_id}`, { description, status } );

      dispatch({
        type: "[Entry] Entry-Updated",
        payload: data,
      });
    } catch (error) {
      console.log(error)
    }

  }

  const refreshEntries = async () => { 
    const {data} = await entriesApi<Entry []>(`/entries`);
    dispatch( {
      type: '[Entry] Refresh-Data',
      payload: data
    } );
  }

  useEffect(() => {
    refreshEntries();
  }, [])
  

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        onAddEntry,
        onUpdateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
