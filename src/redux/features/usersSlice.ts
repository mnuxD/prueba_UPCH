import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apis/interceptor.global";
import { UserList, UserType } from "../apis/userApi/types";
import { buildQueryParams, dynamicResultsCount } from "../../helpers/helpers";

export const getUsers = createAsyncThunk<
  UserType[],
  { filter?: { [key: string]: any } }
>("users/getUsers", async (params) => {
  const { filter } = params;
  const nat = filter?.nat || "";
  const gender = filter?.gender || "";

  const response = await apiClient.get<UserList>(
    `/?${buildQueryParams({
      exc: "login,dob,registered",
      results: dynamicResultsCount(nat, gender), // generate dynamic result count depending on filters to simulate different counts
      seed: "UPCH",
      nat,
      gender
    })}&noinfo`
  );

  const customData: UserType[] =
    response.data?.results.map((user) => {
      return {
        name: `${user.name.first} ${user.name.last}` || "",
        photo: user.picture.thumbnail || "",
        gender: user.gender || "",
        address:
          `${user.location.street.name} ${user.location.street.number}` || "",
        phone: user.phone || "",
        email: user.email || "",
        country: user.location.country || "",
        nat: user.nat || "",
        lat: parseFloat(user.location.coordinates.latitude) || 0,
        lng: parseFloat(user.location.coordinates.longitude) || 0
      };
    }) || [];

  return customData;
});

export const getUserById = createAsyncThunk<UserType, { id: string }>(
  "users/getUserById",
  async ({ id }) => {
    const response = await apiClient.get<UserList>(`/`);
    const user = response.data.results[0];

    // forced error
    if (id === "ana.gallardo@example.com") {
      throw new Error();
    }

    const customUser = {
      name: `${user.name.first} ${user.name.last}` || "",
      photo: user.picture.thumbnail || "",
      gender: user.gender || "",
      address:
        `${user.location.street.name} ${user.location.street.number}` || "",
      phone: user.phone || "",
      email: user.email || "",
      country: user.location.country || "",
      nat: user.nat || "",
      lat: parseFloat(user.location.coordinates.latitude) || 0,
      lng: parseFloat(user.location.coordinates.longitude) || 0
    };

    return customUser;
  }
);

export const createUser = createAsyncThunk<UserType, { user: UserType }>(
  "users/createUser",
  async ({ user }) => {
    // fake api to simulate
    await apiClient.get<UserList>(
      `/?${buildQueryParams({
        results: 200,
        seed: "UPCH"
      })}&noinfo`
    );

    // forced error
    if (user.email === "manuelbaellavidal@gmail.com") {
      throw new Error();
    }

    return user;
  }
);

export const updateUser = createAsyncThunk<UserType, { user: UserType }>(
  "users/updateUser",
  async ({ user }) => {
    // fake api to simulate
    await apiClient.get<UserList>(
      `/?${buildQueryParams({
        results: 200,
        seed: "UPCH"
      })}&noinfo`
    );

    // forced error
    if (user.email === "ana.gallardo@example.com") {
      throw new Error();
    }

    return user;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (data: { id: string }) => {
    // fake api to simulate
    await apiClient.get<UserList>(
      `/?${buildQueryParams({
        results: 200,
        seed: "UPCH"
      })}&noinfo`
    );

    // forced error
    if (data.id === "ana.gallardo@example.com") {
      throw new Error();
    }

    return data.id;
  }
);

interface UsersState {
  users: UserType[];
  user: UserType | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
  updateLoading: boolean;
  updateError: string | null;
  deleteLoading: boolean;
  deleteError: string | null;
  filters: {
    [key: string]: any;
  };
}

const initialState: UsersState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
  filters: {
    nat: "",
    gender: ""
  }
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    cleanUserData: (state, action) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get users";
      })
      // Get User by Id
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get user by id";
      })
      // Create User
      .addCase(createUser.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.error.message || "Failed to create user";
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.error.message || "Failed to update user";
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.error.message || "Failed to delete user";
      });
  }
});

export const { setFilters, cleanUserData } = usersSlice.actions;

export default usersSlice.reducer;
