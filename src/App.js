import { Route, Routes } from 'react-router-dom';
import './CSS/app.css'
import Homepage from "./screens/Homepage"
import Temp from './screens/temp'
import ContactForm from './screens/Contact';
import About from './screens/About';

function App() {
  return (
    	
      <Routes>
       <Route path="/" element={<Homepage/>}/>
       <Route path="/contact" element={<ContactForm/>}/>
       <Route path="/about" element={<About/>}/>
      </Routes>

    
  );
}

export default App;
