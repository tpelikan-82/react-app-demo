import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
		<nav>
			<NavLink to="/">Home</NavLink>&nbsp;|&nbsp;
			<NavLink to="/clients">Clients</NavLink>&nbsp;|&nbsp;
			<NavLink to="/about">About</NavLink>
		</nav>
    )
}