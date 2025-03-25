// LoginForm.js
import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { postItem } from "../../utils/crud";
import { useDispatch, useSelector } from "react-redux";
import { loginInfo, selectLogin } from "../../slices/logSlice";
import { IToken } from "../../types/ILogin";
import { AppDispatch } from "../../store";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector(selectLogin);

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
        .then(async (pippo:IToken) => {
          dispatch(loginInfo(pippo.token))

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
          {loginState.data?.name && loginState.data?.name.length > 0 && (
        <p>
          Ciao, {loginState.data.name} ti sei loggato, dovresti vedere un cookie con il token. Hai il ruolo di {loginState.data.role}
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
