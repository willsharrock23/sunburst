import Logo from "./Logo.jsx";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header
        className="container-fluid mt-0 mb-0 bg-light"
        style={{borderBottom: "2px solid grey"}}
      >
        <div className="d-flex justify-content-between">
          <div className="pt-2 mt-2 ml-2 d-flex justify-content-start">
            <a href="https://www.catalyzeconsulting.com">
              <Logo />
            </a>
            <p className="px-3 fs-5 pt-6 mt-6 text-dark">
              Cap Audit Test Environment
            </p>
          </div>

          <div className="pt-3 ml-3">
            <ul className="nav nav-tabs" id="navTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active text-dark text-decoration-none"
                  id="overview-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#overview"
                  role="tab"
                  aria-controls="overview"
                  aria-selected="true"
                >
                  <Link to="/" style={{color: "black", textDecoration:"none"}}>
                    Table View
                  </Link>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link text-dark text-decoration-none"
                  id="edit-scenario-tab1"
                  data-bs-toggle="tab"
                  data-bs-target="#edit-scenario1"
                  role="tab"
                  aria-controls="edit-scenario1"
                  aria-selected="false"
                >
                  <Link to="/singlegraph" style={{color: "black", textDecoration:"none"}}>
                    Single Graph
                  </Link>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link text-dark text-decoration-none"
                  id="edit-scenario-tab2"
                  data-bs-toggle="tab"
                  data-bs-target="#edit-scenario2"
                  role="tab"
                  aria-controls="edit-scenario2"
                  aria-selected="false"
                >
                  <Link to="/deepdive" style={{color: "black", textDecoration:"none"}}>
                    Deep Dive
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
}

export default Navbar;
