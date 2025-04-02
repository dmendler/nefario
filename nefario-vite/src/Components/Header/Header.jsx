import { Link } from "react-router-dom";
import { logoutUser } from "../Auth/AuthService";

/* Header and Navbar */
// Will add more CSS to create better navbar
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
