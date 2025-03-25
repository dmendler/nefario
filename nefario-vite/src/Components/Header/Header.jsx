import { Link } from "react-router-dom";

/* Header and Navbar */
// Will add more CSS to create better navbar
const Header = () => {
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
            <Link to="/auth">Add to Database</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
