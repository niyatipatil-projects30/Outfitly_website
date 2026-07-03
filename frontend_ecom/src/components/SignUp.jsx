import { supabase } from '../database.js'; // Ensure this matches your working path
import { useState } from "react";
import './SignUp.css';
import { Link } from 'react-router-dom';
export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState("");   // State for error message

  async function handleSignUp(e) {
    e.preventDefault();
    setSuccessMessage(""); // Clear old messages
    setErrorMessage("");
    
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      setErrorMessage(error.message);
    } else {
      console.log("Account created successfully:", data);
      setSuccessMessage("Hurry!, you are SignUp!!"); // In-line success message
      setEmail(""); // Optional: Clear inputs after success
      setPassword("");
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSignUp} className="auth-form">
        <h3>Sign Up</h3>
        
        <div className="input-group">
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn"><Link to="/AddProduct">Sign Up</Link></button>

        {/* Dynamic status messages rendered below the button */}
        {successMessage && <p className="status-success">{successMessage}</p>}
        {errorMessage && <p className="status-error">{errorMessage}</p>}
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
  Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: '600' }}>Login here</Link>
</p>
      </form>
    </div>
  );
}
