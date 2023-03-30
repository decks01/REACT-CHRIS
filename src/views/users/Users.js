import React from 'react';
import NavBar from '../../components/globals/NavBar';
import TableAsociacion from '../../components/Table/TableAsociacion';
import UserTable from '../../components/Table/Users/UsersTable';

const Users = () => {
    return (
        <div className="container-info">
       <NavBar titule='Usuarios' />
      <div id="" className="">
        {/* <h1>USERS</h1> */}
        <UserTable />
      </div>
    </div>
    );
};

export default Users;