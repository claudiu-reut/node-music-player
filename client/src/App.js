
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
function App() {
  
  const [image,setImage]=useState();
  const [artist,setArtist]=useState('');
  const [name,setName]=useState('')
  const [year,setYear]=useState('');
  const [audio,setAudio]=useState('');
 const get_song=async ()=>{
  try{
 
    const response=await axios.get('http://localhost:4000/audio');
  
    
    const metadata=response.data
    
    setArtist(metadata.tags.artist);
    setName(metadata.tags.title);
    setYear(metadata.tags.recordingTime);
    setAudio(metadata.audio)
  
    if (metadata.image) setImage(`data:image/jpeg;base64,${metadata.image}`)
    else setImage('https://cdn-icons-png.flaticon.com/512/27/27223.png')
    
  }catch(err){
    console.log(err);
  }
 }
 useEffect(() => {
 get_song();
},[])
  return (
    
   
   <div className="component">
    <div className='inside'>
      <h2>Playing Now</h2>
      <img
        className="musicCover"
      src={image}
      />
      <div>
        <h3 className="title">{artist}</h3>
        <p className="subTitle">{name}</p>
        <p className="subTitle">{year}</p>
      </div>
      <div>
      
    <audio controls src={`data:audio/mpeg;base64,${audio}`}/>
        
        
      
     
      </div>
      </div>
      
    </div>
   


  );
}

export default App;
