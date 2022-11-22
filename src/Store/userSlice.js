import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isAuthenticated: false,
    currentUser: {},
    classes: {
      home: "link active",
      users: "link",
    },
    searchQuery: "",
  },
  reducers: {
    setUsers: (state, action) => {
      const data = action.payload.map((user) => user.data);
      state.users = [...data];
    },
    logUserIn: (state, action) => {
      const { loginUser, loginPassword } = action.payload;
      const result = state.users.find(
        (user) => user.email.trim() === loginPassword.trim()
      );
      if (result) {
        if (result.first_name === loginUser) {
          state.isAuthenticated = true;
          state.currentUser = result;
          console.log("correct Password");
        } else {
          alert("Incorrect Password");
        }
      } else {
        alert("No Account Found");
      }
    },
    logUserOut: (state) => {
      state.currentUser = {};
      state.isAuthenticated = false;
    },
    // Nav classes
    homeClass: (state) => {
      state.classes = { home: "link active", users: "link" };
    },
    usersClass: (state) => {
      state.classes = { home: "link", users: "link active" };
    },
    // Search
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
