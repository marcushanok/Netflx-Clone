import React,{useState} from 'react'
import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Link} from 'react-router-dom'


function Navbar() {
    const [isScrolled,setIsScrolled] = useState(false);

    /******************************* */
    /******************************* */
    /******************************* */
    window.onscroll = ()=>{
        setIsScrolled(window.pageYOffset === 0 ? false:true)
        return ()=>(window.onscroll = null)
    }
   
    
    /******************************* */
    /******************************* */
    /******************************* */


    return (
        <div className={isScrolled ? 'navbar scrolled':'navbar'}>
            <div className='container'>
            <div className='left'>
            <img src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png" alt="" />

            <Link to='/' className='link'>
            <span>Homepage</span>
            </Link>
            <Link to='/series' className='link'>
            <span>Series</span>
            </Link>
            <Link to='/movies' className='link'>
            <span>Movies</span>
            </Link>
            <span>New and Popular</span>
            <span>Mylist</span>
             </div>
             <div className='right'>
              <SearchIcon className='icon'/>
              <span>KID</span>
                <NotificationsIcon className='icon'/>
                <img src="https://img.icons8.com/color/48/000000/image.png" alt=""/>
                <div className='profile'>
                <ArrowDropDownIcon className='icon'/>
                <div className='options'>
                    <span>Settings</span>
                    <span>Logout</span>
                </div>
                </div>
                
            </div>
           
            </div>
        </div>
    )
}

export default Navbar
