import React from 'react';
import AudioPlayer from './Components/AudioPlayer';
import { playlist } from "./playlist";



function App() {
  return (
    <div className="App">
      
      <AudioPlayer
      playlist ={playlist}/>
    </div>
  );
}

export default App;
