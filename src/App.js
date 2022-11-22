import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Register";
import Users from "./components/Users/Users";
import { fetchUsersHandler } from "./Store/fetchUsers";

const App = () => {
  const users = useSelector((state) => state.users.users);
  const searchInput = useSelector((state) => state.users.searchQuery);
  const dispatch = useDispatch();

  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(users);
  }, [users]);

  useEffect(() => {
    dispatch(fetchUsersHandler());
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    let first_name = user.first_name.toLocaleLowerCase();
    let last_name = user.last_name.toLocaleLowerCase();
    return (
      first_name.includes(searchInput.toLocaleLowerCase()) ||
      last_name.includes(searchInput.toLocaleLowerCase())
    );
  });

  useEffect(() => {
    setFilteredList(filteredUsers);
  }, [searchInput, filteredUsers]);

  console.log(users);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <NavBar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<Users data={filteredList} />} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

// <Route
//         path="/home"
//         element={
//           <ProtectedRoute>
//             <NavBar />
//             <Home />
//           </ProtectedRoute>
//         }
//       />
//       //
//       <Route
//         path="/users"
//         element={
//           <ProtectedRoute>
//             <NavBar />
//             <Users />
//           </ProtectedRoute>
//         }
//       />
