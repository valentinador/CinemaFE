import { Label } from "@mui/icons-material";
import {
  Box,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AddFilmForm = () => {
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Aggiungi un film
        </Typography>
        <FormControl defaultValue="" required>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Titolo"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="year"
            label="Anno di produzione"
            name="year"
            autoFocus
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </FormControl>
      </Box>
    </Container>
  );
};

export default AddFilmForm;
