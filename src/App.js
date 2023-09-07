import { Route, Routes } from 'react-router-dom';
import './CSS/app.css'
import Homepage from "./screens/Homepage"
import Temp from './screens/temp'
import backgroundImage from './CSS/back1.jpg'
function App() {
  return (
    	
      <Routes>
       <Route path="/" element={<Homepage/>}/>
      </Routes>

    
  );
}

export default App;
