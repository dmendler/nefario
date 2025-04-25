import { Link } from "react-router-dom";
import { logoutUser } from "../Auth/AuthService";

/* Header and Navbar */
// Will add more CSS to create better navbar
/*
const Header = ({ isLoggedIn }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/add">Add to Database</Link>
          </li>
          {isLoggedIn && (
            <li>
              <button onClick={logoutUser}>Log Out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
*/
const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    logoutUser()
    setIsLoggedIn(false);
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">
        SwimApp
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Main
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add">
              Add to Database
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
