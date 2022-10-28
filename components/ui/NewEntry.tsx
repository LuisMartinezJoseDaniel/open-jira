import { useState, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState( false );
  
  const { onAddEntry } = useContext( EntriesContext );
  const { isAddingEntry, setIsAddingEntry } = useContext( UIContext );
  
  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.trim()) return;

    setInputValue(value);
  };

  const onSave = () => { 
    if ( inputValue.length === 0 ) return;
    onAddEntry(inputValue);
    setInputValue( "" );
    setIsAddingEntry( false );
    setTouched( false );
  }

  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 1,
      }}
    >
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginY: 2 }}
            autoFocus
            multiline
            label="Nueva entrada"
            placeholder="Nueva entrada"
            error={inputValue.length <= 0 && touched}
            helperText={
              inputValue.length <= 0 && touched ? "Ingrese un valor" : ""
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTouched(true)} //cuando se pierde el foco
          />

          <Box display={"flex"} justifyContent={"space-between"}>
            <Button onClick={() => {
              setIsAddingEntry( false );
              setTouched( false );
            }} variant="text">
              Cancelar
            </Button>
            <Button
              onClick={onSave}
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
