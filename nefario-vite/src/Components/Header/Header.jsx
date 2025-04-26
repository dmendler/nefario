import { Link } from "react-router-dom";
import { logoutUser } from "../Auth/AuthService";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
  };
  
  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-primary px-3">
      <Link class="navbar-brand" to="/">
        SwimApp
      </Link>
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
            <Link class="nav-link" to="/">
              Main
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/about">
              About
            </Link>
          </li>
          {!isLoggedIn && (
            <li class="nav-item">
              <Link class="nav-link" to="/auth">
                Sign In
              </Link>
          </li>
            )}
          {isLoggedIn && (
            <>
              <li class="nav-item">
                <Link class="nav-link" to="/add">
                  Add to Database
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/score">
                  Score Calculator
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/optimal-lineup">
                  Optimal Lineup
                </Link>
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
