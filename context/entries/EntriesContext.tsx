import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
  entries: Entry[];
  onAddEntry: (decription: string) => void;
  onUpdateEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext( {} as ContextProps);