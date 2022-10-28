import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

// Manejar el state del reducer
export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

interface Props {
  children?: React.ReactNode;
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [ state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  //Abrir y cerrar Sidebar
  const openSideMenu = () => dispatch({ type: "[UI] - OpenSidebar" });
  const closeSideMenu = () => dispatch({ type: "[UI] - CloseSidebar" });
  //Agregar una nueva tarea
  const setIsAddingEntry = ( isAddingEntry: boolean ) => { 
    dispatch({ type: "[UI] - setIsAddingEntry", payload: isAddingEntry });
  };

  const startDragging = () => { 
    dispatch( {type: '[UI] - StartDragging'} );
  }
  const endDragging = () => { 
    dispatch( {type: '[UI] - EndDragging'} );
  }
  return (
    <UIContext.Provider
      value={{
        ...state, //exparcir todo el estado que regresa el reducer
        //Methods
        closeSideMenu,
        openSideMenu,
        
        setIsAddingEntry,

        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
