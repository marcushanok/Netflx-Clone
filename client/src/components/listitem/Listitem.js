import React,{useEffect, useState} from 'react'
import './listitem.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Listitem({index,item}) {
 
    const [isHovered,setIsHovered] = useState(false);

    const [movie,setMovie] = useState({});

    useEffect(()=>{
        const token = JSON.parse(window.localStorage.getItem("loggedUser")).token
        const getMovie = async ()=>{
            try {
                const res = await axios.get("http://localhost:4000/api/movies/find/" + item,{
                    headers: {
                        token:`Bearer ${token}`
                    },
                })
               
                setMovie(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getMovie();
    },[item])
 
    return (
    <Link to={{ pathname:'/watch',movie: movie }}>
        <div className='listitem' 
        style={{left:isHovered && index * 225-50 + index*2.5}}
        onMouseEnter={()=>setIsHovered(true)} 
        onMouseLeave={()=>setIsHovered(false)}
        >
            <img src={movie.img} alt=""/>
            {isHovered && (
                <>
                <video src={movie.trailer} autoPlay={true} loop />
            <div className='itemInfo'>
                <div className='icons'>
                 <PlayArrowIcon  className='icon'/>
                 <AddIcon className='icon'/>
                 <ThumbUpOutlinedIcon className='icon'/>
                 <ThumbDownAltOutlinedIcon className='icon'/>
                </div>
                <div className='itemInfoTop'>
                    <span>{movie.title}</span>
                    <span className='limit'>{movie.limit}</span>
                    <span>{movie.year}</span>
                </div>
                <div className='desc'>
                    {movie.desc}
                </div>
                <div className='genre'>
                    {movie.genre}
                </div>
            </div>
            </>
            )}
        </div>
    </Link>
    )
}

export default Listitem
