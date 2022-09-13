import React,{useState,useContext} from 'react';
import './login.scss';
import axios from 'axios'
import { LoginContext } from '../../contexts/loginContext';


function Login() {
      
    const url = 'http://localhost:4000/api/auth/login'

    const {setUser} = useContext(LoginContext) 
      const [email,setEmail] = useState('')
      const [password,setPassword] = useState('')

      const handleSubmit = async (e)=>{
              e.preventDefault();
              try {
                  const res = await axios.post(url,{
                      email,password
                  })
                  const user = res.data
                  console.log(user)
                  setUser(true)
                  window.localStorage.setItem('loggedUser', JSON.stringify(user))
              } catch (error) {
                  console.log(error)
              }
      }


    return (
        <div className='login'>
            <div className='top'>
                <div className='wrapper'>
                    <img className='logo' src='https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png' alt=''/>
                 
                </div>
            </div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <input type='email' placeholder='Email or phone number' onChange={e => setEmail(e.target.value)}></input>
                    <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                    <button className='loginButton'>Sign In</button>
                    <span>New to Netflix? <b>Sign Up now.</b></span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a 
                        bot.<b>Learn more</b>.
                    </small>
                </form>
             </div>
        </div>
    );
}

export default Login
