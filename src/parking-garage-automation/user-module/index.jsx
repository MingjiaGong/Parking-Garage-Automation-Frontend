import React from "react";
import { UserModule } from "./UserModule";
//import { useSelector } from "react-redux";

export const UserModuleComponent = () => {
  let users = localStorage.getItem('userObject') != null? JSON.parse(localStorage.getItem('userObject')):[]
  //const { users } = useSelector((state) => state.users);

  return (
    <>
      {(users.role === 1 || users.role === 2) && (
        <div className="row mt-5 text-white">
          <h1>You Are Not A User!</h1>
        </div>
      )}

      {users.role === 3 && <UserModule />}

      {users.role !== 1 && users.role !== 2 && users.role !== 3 && (
        <div className="row mt-5 text-white">
          <h1>Please Log In!</h1>
        </div>
      )}
    </>
  );
};
export default UserModuleComponent;
