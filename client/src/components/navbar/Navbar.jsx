import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Gerenciador de tarefas
        </Link>

        <Link className="btn btn-sm btn-primary" to="/create">
          Create task
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
