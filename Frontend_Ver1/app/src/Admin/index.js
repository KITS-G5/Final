import React from 'react';
import Sidebar from "./Layout/SideBar";
import HeaderAdmin from "./Layout/Header";
import "./styles.css";

const Admin = () => {
    return (
        <div className='container-fluid' style={{padding:'unset'}} >
            <HeaderAdmin/>
            <Sidebar/>
        </div>
    );
};

export default Admin;