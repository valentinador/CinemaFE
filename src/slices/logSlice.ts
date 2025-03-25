import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getItems } from "../utils/crud";
import { IStateUserLoggedIn } from "../types/ILogin";

// First, create the thunk
export const loginInfo = createAsyncThunk(
  `${process.env.REACT_APP_API_URL}/auth/me`,
  async (token: string) => {
    const response = await getItems(
      `${process.env.REACT_APP_API_URL}/auth/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
// Define the initial state using that type
const initialState:IStateUserLoggedIn = {
  data: {
    name: "",
    surname: "",
    email: "",
    role: "",
    password: "",
    createdAt:null,
  },
};

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
        // Reset dello stato di login
        state.data = { name: "", surname: "", email: "", role: "", password: "", createdAt:null };
        // Rimuovi i dati dal localStorage
        localStorage.removeItem("loginState");
      },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginInfo.fulfilled, (state, action) => {
      // Add user to the state array
      state.data={
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
        role: action.payload.role,
        password: action.payload.password,
        createdAt: action.payload.createdAt
      };
       // Save the login state to localStorage
       localStorage.setItem("loginState", JSON.stringify(state.data));
    });
  },
});

// Esporta l'azione logout
export const { logout } = loginSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
