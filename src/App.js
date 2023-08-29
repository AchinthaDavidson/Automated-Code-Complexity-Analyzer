import { Route, Routes } from 'react-router-dom';
import './CSS/app.css'
import Homepage from "./screens/Homepage"
import Temp from './screens/temp'
function App() {
  return (
    <div style={{backgroundImage: 'linear-gradient(to bottom right,#080F17, #134136)'}}>
  
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path='/temp' element={<Temp/>}/>
     </Routes>
   
    
    </div>
  );
}

export default App;
