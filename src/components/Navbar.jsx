import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="site-navbar" aria-label="Main navigation">
      <div className="site-navbar_content">
        {/* <Link className="site-navbar__brand" to="/">
          Games Reviews
        </Link> */}

        <div className="site-navbar_links">
          <Link to="/">Home    </Link>
          <Link to="/create">  Create Review</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar