import React,{useState,useEffect} from 'react'
import Featured from '../../components/featured/featured'
import Navbar from '../../components/navbar/Navbar'
import List from '../../components/list/List'
import axios from 'axios'
import './home.scss'
import { getSelectUtilityClasses } from '@mui/material'
function Home({type}) {

    const [lists,setLists] = useState([]);
    const [genre,setGenre] = useState(null);

    useEffect(()=>{
        const token = JSON.parse(window.localStorage.getItem("loggedUser")).token
        const getRandomLists = async ()=>{
            try{
                const res = await axios.get('http://localhost:4000/api/lists',
                    {
                     headers:{
                         token:`Bearer ${token}`,
                     }
                 });
                
                setLists(res.data);
            }
            
            catch(err){
                console.log(err)
            }
        }
        getRandomLists(); 
    },[])
    return (
        <div className='home'>
           <Navbar/>
          <Featured type={type}/>
          {lists.map((list)=>(
              <List key={list._id}list={list}/>  
          ))}
        </div>
    )
}

export default Home
