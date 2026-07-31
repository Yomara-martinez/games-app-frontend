import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

function Navbar({search, setSearch}) {
const  [showInput, setShowInput] = useState(false)

  return (
    <nav className="site-navbar" aria-label="Main navigation">
      <div className="site-navbar_content">
        {/* <Link className="site-navbar__brand" to="/">
          Games Reviews
        </Link> */}

        <div className="site-navbar_links">
          <Link onClick={(e)=> setSearch("") || setShowInput(false)} to="/">Home    </Link>
          <Link to="/create">  Create Review</Link>
        </div>
        <div>

        <button onClick={() => setShowInput(!showInput)}> <CiSearch/> </button>

{showInput && (
       <input  className="search-navbar"
type="text"
placeholder="Search Game..."
value={search}
onChange={(e)=> setSearch(e.target.value)}
/> )}
      </div> 
      </div>
     
    </nav>
  );
}

export default Navbar