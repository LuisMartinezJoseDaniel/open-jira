import { FC, DragEvent, useContext } from "react";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import { Entry } from "../../interfaces";

import { UIContext } from "../../context/ui";


interface Props {
  children?: React.ReactNode;
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging, isDragging } = useContext(UIContext);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    // Agregar el ID, del elemento que se esta haciendo drag
    e.dataTransfer.setData("text", entry._id);
    
    startDragging(); //Cambiar el estado a true en un drag
  };

  const onDragEnd = () => {

    endDragging();
  };

  return (
    <Card
      sx={{
        marginBottom: 1,
        width: '100%'
      }}
      // Eventos
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="body2">hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
