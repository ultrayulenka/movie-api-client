import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import axios from "axios";

export type AuthFormType = "log-in" | "create-account";

interface AuthState {
  userData: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userData: null,
  isLoading: false,
  error: "",
};

const submitForm = createAsyncThunk(
  "auth/submitForm",
  async (
    {
      type,
      username,
      email,
      password,
    }: {
      type: AuthFormType;
      username: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const payload =
      type === "log-in"
        ? { email, password }
        : {
            username,
            email,
            password,
          };

    try {
      const res = await axios.post<{ email: string }>(`/api/${type}`, payload);
      return { username, email };
    } catch (error: any) {
      return rejectWithValue(error?.response?.statusText || "Unknown error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authentificate(state, action: PayloadAction<User | null>) {
      state.userData = action.payload;
      state.isLoading = false;
    },
    logOut(state) {
      state.userData = null;
      state.isLoading = false;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const { authentificate, logOut, setError } = authSlice.actions;
export default authSlice.reducer;
export { authentificate, logOut, submitForm, setError };
