import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { userActions } from "./userSlice";

export const fetchUsersHandler = () => {
  return (dispatch) => {
    const fetchUsers = () => {
      const usersDocRef = query(collection(db, "users"));
      onSnapshot(usersDocRef, (snapShot) => {
        dispatch(
          userActions.setUsers(
            snapShot.docs.map((doc) => ({
              data: doc.data(),
            }))
          )
        );
      });
    };
    fetchUsers();
  };
};
