
import './App.css';

import { useState, useEffect } from 'react';
function App() {
  const [image,setImage]=useState();
  const [artist,setArtist]=useState('');
  const [name,setName]=useState('')
  const [year,setyear]=useState('');
 

  return (
    
   
   <div className="component">
    <div className='inside'>
      <h2>Playing Now</h2>
      <img
        className="musicCover"
        src="https://picsum.photos/200/200"
      />
      <div>
        <h3 className="title">{artist}</h3>
        <p className="subTitle">{name}</p>
        <p className="subTitle">{year}</p>
      </div>
      <div>
      <img src="http://localhost:4000/image" alt='https://picsum.photos/200/200'/>
    <audio controls>
        
        <source src="http://localhost:4000/audio" type="audio/mpeg"/>
      Your browser does not support the audio element.
      </audio>
      </div>
      </div>
    </div>



  );
}

export default App;
