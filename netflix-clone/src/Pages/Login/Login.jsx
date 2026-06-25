import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NetflixLogo from "../../assets/images/NetflixLogo.png";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth_page">
      <div className="auth_overlay" />
      <header className="auth_header">
        <img src={NetflixLogo} alt="Netflix" className="auth_logo" />
      </header>

      <div className="auth_card">
        <h1>Sign In</h1>
        {error && <p className="auth_error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth_submit">
            Sign In
          </button>
        </form>
        <p className="auth_switch">
          New to Netflix? <Link to="/signup">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
