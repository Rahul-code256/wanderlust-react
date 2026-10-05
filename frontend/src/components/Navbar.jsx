import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          Wanderlust
        </Link>

        <div className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/listings">
            Explore Listings
          </Link>

          <Link to="/listings/new">
            Create Listing
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/signup">
            Signup
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;