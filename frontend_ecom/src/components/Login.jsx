import { supabase } from '../database.js'; 
import './SignUp.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      setErrorMessage(error.message);
    } else {
      console.log("Logged in successfully:", data);
      setSuccessMessage("Hurry!! you are Signed in!!"); // Custom success message
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h3>Login</h3>
        
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

        <button type="submit" className="auth-btn"><Link to="/home">Login</Link></button>

        {successMessage && <p className="status-success">{successMessage}</p>}
        {errorMessage && <p className="status-error">{errorMessage}</p>}
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
  New to our store? <Link to="/signup" style={{ color: '#3b82f6', fontWeight: '600' }}>Sign up here</Link>
</p>
      </form>
    </div>
  );
}
