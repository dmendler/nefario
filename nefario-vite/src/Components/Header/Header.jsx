import { NavLink } from "react-router-dom";
import { logoutUser } from "../Auth/AuthService";
import "../../styles.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
  };
  
  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-primary px-3">
      <NavLink className="navbar-brand" to="/">
        SwimApp
      </NavLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li class="nav-item">
              <NavLink className="nav-link" to="/auth">
                Sign In
              </NavLink>
          </li>
            )}
          {isLoggedIn && (
            <>
              <li class="nav-item">
                <NavLink className="nav-link" to="/add">
                  Add to Database
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/score">
                  Score Calculator
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/optimal-lineup">
                  Optimal Lineup
                </NavLink>
              </li>
              <li class="nav-item">
                <button
                  class="btn btn-danger btn-sm ms-2"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
