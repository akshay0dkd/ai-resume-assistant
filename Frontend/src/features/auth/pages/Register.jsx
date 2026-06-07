import React,{useState} from "react";
import {useNavigate,Link} from "react-router"
import {useAuth} from "../hooks/useAuth.jsx"
const Register = () => {
   
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loading,handleRegister} = useAuth();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister({ username, email, password });  
        navigate('/')
    }

    return (        
            <main>      
            <div className="form-container">
            <h1>Register</h1>
            <form OnSubmit={handleSubmit}>

                 <div className="input-group">
                    <label htmlFor="username"> Username   </label>
                    <input 
                      onChange={(e) => setUsername(e.target.value)}
                    type="text" id="username" placeholder=" enter username"/>
                </div>
                <div className="input-group">
                    <label htmlFor="email"> Email   </label>
                    <input 
                      onChange={(e) => setEmail(e.target.value)}
                      type="email" id="email" placeholder=" enter email address"/>
                </div>
                <div className="input-group">
                    <label htmlFor="password"> Password   </label>
                    <input 
                      onChange={(e) => setPassword(e.target.value)}
                      type="password" id="password" placeholder="  enter password" />
                </div>
                <button className="button primary-button">Register</button>
            </form> 
            <p>Already have an account? <Link to="/login">Login</Link></p>

             </div>
            </main>   
         )
}

export default Register
