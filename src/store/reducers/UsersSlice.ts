import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import { AppThunk } from "../store";
import { AxiosInstance } from "axios";

interface UsersState {
  users: Array<User>;
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Array<User>>) {
      state.users = action.payload;
      state.isLoading = false;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const fetchUsers =
  (api: AxiosInstance): AppThunk =>
  async (dispatch) => {
    dispatch(usersSlice.actions.setIsLoading(true));

    try {
      const users = (await api.get<Array<User>>("/users")).data;

      dispatch(usersSlice.actions.setUsers(users));
    } catch (error) {
      dispatch(usersSlice.actions.setError(error?.response?.status || "500"));
    }
  };

export default usersSlice.reducer;
export { usersSlice };
