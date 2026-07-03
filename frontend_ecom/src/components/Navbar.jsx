import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { supabase } from "../database"; // Ensure path points to your database file
import AddProduct from "./AddProduct";

// Passed session as a prop to your navbar component
export function Navbar({ session }) {
  const navigate = useNavigate();

  // The actual authentication sign out handler
  async function handleLogout(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("Logged out successfully!");
      navigate('/'); // Redirects straight back to your Signup/entrance page
    }
  }

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Outfitly</div>

        <ul className="nav-links">
          {/* If logged out, Home leads to entrance. If logged in, leads to products dashboard */}
          <li><Link to={session ? "/home" : "/"}>Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/about">About</Link></li>
          
          {/* Sparkle AI Scanner Link */}
          <li className="scanner-icon-link">
            <Link to="/scanner" title="AI Fit Scanner">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                style={{ width: "18px", height: "18px", display: "block" }}
              >
                <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2zm6 13.5l1.2 2.4 2.6.4-1.9 1.8.4 2.6-2.3-1.2-2.3 1.2.4-2.6-1.9-1.8 2.6-.4 1.2-2.4z" />
              </svg>
            </Link>
          </li>

          <li className="more">
            More
            <div className="dropdown">
              <p><Link to="/wishlist">Wishlist</Link></p>
              <p><Link to="/contact">Contact</Link></p>
              
              {/* Dynamic Authentication Button based on session state */}
              {session ? (
                <p onClick={handleLogout} style={{ color: '#dc2626', fontWeight: 'bold' }}>
                  Logout
                </p>
              ) : (
                <p><Link to="/login" style={{ color: '#3b82f6', fontWeight: 'bold' }}>Login</Link></p>
              )}
              
              <Link to="/signup">
                <button>Add-Product</button>
              </Link>
            </div>
          </li>
        </ul>
      </nav>

      {/* Internal CSS kept completely identical */}
      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 32px;
          background: #111;
          color: #fff;
          font-family: Arial, sans-serif;
          border-bottom: 1px solid #333;
        }

        .logo {
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 1px;
          color: #fff;
        }

        .nav-links {
          list-style: none;
          display: flex;
          align-items: center; /* Added to keep icon vertically aligned with text links */
          gap: 22px;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          color: inherit;
          text-decoration: none;
        }

        .nav-links li {
          cursor: pointer;
          position: relative;
          font-size: 14px;
          transition: 0.2s;
        }

        .nav-links li:hover {
          color: #00d4ff;
        }

        /* Specific hover color glow for your sparkle icon link */
        .scanner-icon-link:hover {
          color: #22d3ee;
          filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.8));
        }

        /* dropdown */
        .dropdown {
          display: none;
          position: absolute;
          top: 25px;
          right: 0;
          background: #222; /* Changed color to dark grey so your white links are visible */   
          border: 1px solid #333;
          min-width: 140px;
          padding: 8px 0;
          z-index: 1000;
        }

        .dropdown p {
          margin: 0;
          padding: 8px 12px;
          font-size: 13px;
          cursor: pointer;
          color: #fff;
        }

        .dropdown p a {
          color: #fff;
          text-decoration: none;
          display: block;
        }

        .dropdown p:hover {
          background: #333;
        }

        /* show dropdown */
        .more:hover .dropdown {
          display: block;
        }
      `}</style>
    </div>
  );
}

export default Navbar;