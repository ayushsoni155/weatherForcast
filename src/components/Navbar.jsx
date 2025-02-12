import React from "react";
import PropTypes from "prop-types";
import "./Navbar.css";

export default function Navbar({ title }) {
  return (
    <>
      <nav id="nav_cont" className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-light fw-bold" href="#">
            {title}
          </a>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-light fw-bold" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light fw-bold" href="#">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Title",
};
