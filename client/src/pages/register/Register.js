import React,{useState,useRef,useContext,useEffect} from 'react';
import './register.scss';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {LoginContext} from '../../contexts/loginContext'


function Register() {

    const url = 'http://localhost:4000/api/auth/register'


    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

    
    const history = useHistory();


    const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const usernameRef = useRef(null);



  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
   
    
    const handleFinish = async (e)=>{
        e.preventDefault()
    try {
        const res = await axios.post(url,{ email,username, password });   

        history.push("/login");
        console.log(res)
      } catch (err) {
          console.log(err)
      }

    };

    
    return (
        <div className='register'>
            <div className='top'>
                <div className='wrapper'>
                    <img className='logo' src='https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png' alt=''/>
                  <button className='loginButton'>Sign In</button>
                </div>
            </div>
            
            <div className='container'>
                <h1>Unlimited movies, Tv shows and more.</h1>
                <h2>Watch anywhere. Cancel anytime</h2>
                <p>
                    Ready to watch? Enter your email to create your membership.
                </p>
                {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username"  onChange={ (event) => setUsername(event.target.value) } />
            <input type="password" placeholder="password"  onChange={ (event) => setPassword(event.target.value) } />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
            </div>
        </div>
    );
}

export default Register
