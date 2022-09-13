import React,{useState,useEffect} from 'react'
import './app.scss'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import Home from './pages/home/Home'
import Watch from './pages/watch/Watch'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import {LoginContext} from './contexts/loginContext'


function App() {

  const [user,setUser] = useState(false);
   
   useEffect(()=>{
       const loggedUserJson = window.localStorage.getItem('loggedUser')
       
       if(loggedUserJson){
        const user = JSON.parse(loggedUserJson)
         setUser(true)
       }
   },[])



    return (
      <LoginContext.Provider value={{setUser}}>
        <Router>
        <Switch>
          <Route exact path="/">
           {user ? <Home /> : <Redirect to='/register'/>}
          </Route>
          <Route exact path="/register">
            {!user ? <Register /> : <Redirect to='/'/>}
          </Route>
          <Route exact path="/login">
          {!user ? <Login /> : <Redirect to='/'/>}
          </Route>
          {user && (
              <>
          <Route path="/movies">
            <Home type='movies'/>
          </Route>
          <Route path="/series">
            <Home type='series'/>
          </Route>
          <Route path="/watch">
            <Watch/>
          </Route>
          </>
          )}
        </Switch>
        </Router>
        </LoginContext.Provider>
    )
}

export default App
