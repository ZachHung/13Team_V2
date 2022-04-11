import React from "react";
import './Admin.scss';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/sidebar/Sidebar';
import TopNav from '../components/topnav/TopNav';

const Admin = () => {
  return (
    <>
        <Sidebar />
        <div className="main">
            <div className="main__content">
                <TopNav />
                <Outlet />
            </div>
        </div>
    </>
)
};

export default Admin;
