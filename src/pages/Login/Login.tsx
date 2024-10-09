// LoginForm.js
import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { getItems, postItem } from "../../utils/crud";
import { IUser } from "../../types/IUser";

type IInfoLoggedUser = Partial<IUser>;
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [infoLoggedUser, setInfoLoggedUser] = useState<IInfoLoggedUser>({
    name: "",
    role: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validazione semplice e veloce solo per rendere l'idea :)
    if (!email || !password) {
      setError("Tutti i campi sono obbligatori.");
      return;
    }
    try {
      await postItem(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      })
        .then(async (postResult) => {
          await getItems(`${process.env.REACT_APP_API_URL}/auth/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${postResult.token}`,
            },
          })
            .then((result: { data: IUser }) => {
              if (result)
                setInfoLoggedUser({
                  name: result.data.name,
                  role: result.data.role,
                });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <Container component="main" maxWidth="xs">
      {infoLoggedUser.name && infoLoggedUser.name?.length > 0 && (
        <p>
          Ciao, {infoLoggedUser.name} hai il ruolo di {infoLoggedUser.role}
        </p>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Accedi
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Accedi
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
