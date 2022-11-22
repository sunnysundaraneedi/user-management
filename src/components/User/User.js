import React from "react";
import { useSelector } from "react-redux";

const User = ({ data }) => {
  // console.log(data);
  const currentUser = useSelector((state) => state.users.currentUser);
  return (
    <tr>
      <td>{data.first_name}</td>
      <td>{data.last_name}</td>
      <td>{data.designation}</td>
      <td>{data.email}</td>
      <td>{data.experience}</td>
      <td>{data.branch}</td>
      {currentUser.designation.toLowerCase() === "manager" ||
        (currentUser.designation.toLowerCase() === "ceo" && (
          <td>{data.manager}</td>
        ))}
    </tr>
  );
};

export default User;
