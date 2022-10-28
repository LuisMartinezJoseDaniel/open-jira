import { FC, useContext, useMemo, DragEvent } from "react";
import { Paper, List } from "@mui/material";
import { EntryCard } from "./EntryCard";
import { EntryStatus } from "../../interfaces";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
  children?: React.ReactNode;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, onUpdateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  //* Permitir el evento de drop(dejar caer un elemento)
  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  //* DropEvent, solo disponible en div, no en MUI
  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    //Recuperar el id del <EntryCard />
    const id = e.dataTransfer.getData("text");
    // console.log( id );
    const entryUpdated = entries.find((entry) => entry._id === id)!;
    entryUpdated.status = status; //cambiar el status del drag
    onUpdateEntry( entryUpdated ); //actualizar en los entries el elemento
    endDragging(); //cambiar los estilos de la lista
  };

  return (
    // TODO: aqui haremos drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 150px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "1px 10px",
        }}
      >
        {/* Todo: cambiara dependiendo si estoy haciendo drag o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all, .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
