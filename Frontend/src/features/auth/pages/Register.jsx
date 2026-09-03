import React, { useState } from "react";
import { useNavigate, Link } from "react-router"
import { useAuth } from "../hooks/useAuth.jsx"

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { loading, handleRegister } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const res = await handleRegister({ username, email, password });  
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message || "Registration failed");
        }
    }

    if (loading) {
        return (<main><h1>Loading.......</h1></main>);
    }

    return (        
        <main>      
            <div className="form-container">
                <h1>Register</h1>
                {error && <p style={{ color: "#ff4d4f", fontSize: "0.95rem" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username"> Username </label>
                        <input 
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" id="username" placeholder=" enter username"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email"> Email </label>
                        <input 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" placeholder=" enter email address"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password"> Password </label>
                        <input 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" placeholder=" enter password" />
                    </div>
                    <button className="button primary-button" type="submit">Register</button>
                </form> 
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>   
    )
}

export default Register
