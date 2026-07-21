import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/header.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header sticky-top">

      <div className="container d-flex align-items-center justify-content-between">

        {/* Logo */}

        <Link to="/" className="logo text-decoration-none">
          <h1>
            Led<span>.</span>
          </h1>
        </Link>

        {/* Navigation */}
        {menuOpen && (
        <div
          className="overlay"
          onClick={closeMenu}
        ></div>
      )}

        <nav className={`navmenu ${menuOpen ? "active" : ""}`}>

          <ul>

            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={closeMenu}
              >
                <i className="bi bi-house-door-fill me-2"></i>
                Accueil
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active" : ""}
                onClick={closeMenu}
              >
                <i className="bi bi-info-circle-fill me-2"></i>
                À propos
              </Link>
            </li>

            <li>
              <Link
                to="/menu"
                className={location.pathname === "/menu" ? "active" : ""}
                onClick={closeMenu}
              >
                <i className="bi bi-journal-richtext me-2"></i>
                Menu
              </Link>
            </li>

            <li>
              <Link
                to="/gallery"
                className={location.pathname === "/gallery" ? "active" : ""}
                onClick={closeMenu}
              >
                <i className="bi bi-images me-2"></i>
                Galerie
              </Link>
            </li>

            <li>
              <Link
                to="/reservation"
                className={location.pathname === "/reservation" ? "active" : ""}
                onClick={closeMenu}
              >
                <i className="bi bi-calendar-check-fill me-2"></i>
                Réservation
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
                onClick={closeMenu}
              >
                <i className="bi bi-envelope-fill me-2"></i>
                Contact
              </Link>
            </li>

          </ul>

        </nav>

        {/* Hamburger */}

        <button
          className="mobile-nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          <i
            className={`bi ${
              menuOpen ? "bi-x-lg" : "bi-list"
            }`}
          ></i>

        </button>

        {/* Bouton Réservation */}

        <Link
          to="/reservation"
          className="btn-getstarted"
        >

          <i className="bi bi-calendar-check-fill me-2"></i>

          Réserver une table

        </Link>

        

      </div>

    </header>
  );
}

export default Navbar;