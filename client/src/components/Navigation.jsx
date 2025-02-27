import React from "react";
import { NavLink } from "react-router-dom";
import { RouteTaskList } from "../helper/RouteName";

const Navigation = () => {
    const buttonClass =
        "py-3 px-6 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all";

    return (
        <div className="w-full flex justify-center bg-gray-100 p-4 shadow-md">
            <NavLink to={RouteTaskList} className={buttonClass}>
                Task Management
            </NavLink>
        </div>
    );
};

export default Navigation;
