import './featured.scss'
import image from './ironman.jpg'
import React,{useState,useEffect} from 'react'
import title from './title.png'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios'

function Featured({type}) {
    const [content,setContent] = useState({})

    useEffect(()=>{
        const getRandomContent = async ()=>{
            try {
                const res = await axios.get(`/movies/random?type=${type}` ,{
                    headers: {
                        token:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hbnUiLCJpZCI6IjYxNzU4YWM1NTA1YTFjNzA3OTMyOWU1MiIsImlhdCI6MTYzNTc1NjcwNX0.5iiqf-rAZ8PCmOh_dcv1V2fIq4FpqUX0aJ4NDakXQkw'
                    },
                })
                setContent(res.data[0])
            } catch (error) {
                console.log(error)
            }
        } 
        getRandomContent();
    },[type])

    return (
        <>
        <div className='featured'>
            {type && (
                <div className='category'>
                    <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
                    <select name='genre' id='genre'>
                        <option>Genre</option>
                        <option value='adventure'>Adventure</option>
                        <option value='comedy'>Comedy</option>
                        <option value='crime'>Crime</option>
                        <option value='fantasy'>Fantasy</option>
                        <option value='historical'>Historical</option>
                        <option value='horror'>Horror</option>
                        <option value='romance'>Romance</option>
                        <option value='sci-fi'>Sci-fi</option>
                        <option value='thriller'>Thriller</option>
                    </select>
                </div>
            )}
            <img width='100%' src={content.img} alt=''/>
        <div className='info'>
           <img src={content.imgTitle} alt=""/>
           <span className='desc'>
               {content.desc}
               </span>
               <div className='buttons'>
                   <button className='play'>
                     <PlayArrowIcon/>
                     <span>Play</span>
                   </button>
                   <button className='more'>
                         <InfoOutlinedIcon/>
                         <span>Info</span>
                   </button>
               </div>
        </div>
        </div>
        </>
    )
}

export default Featured
