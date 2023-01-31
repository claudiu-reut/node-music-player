
import './App.css';

function App() {
  return (
   <div>
     <img src="http://localhost:4000/image"/>
    <audio controls>
        
        <source src="http://localhost:4000/audio" type="audio/mpeg"/>
      Your browser does not support the audio element.
      </audio>
   </div>
  );
}

export default App;
