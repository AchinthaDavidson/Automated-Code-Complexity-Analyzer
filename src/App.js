import { Route, Routes } from 'react-router-dom';
import './CSS/app.css'
import Homepage from "./screens/Homepage"
import Temp from './screens/temp'
import ContactForm from './screens/Contact';
import About from './screens/About';
import PDF from './screens/GenPDF';

function App() {
  return (
    	
      <Routes>
       <Route path="/" element={<Homepage/>}/>
       <Route path="/contact" element={<ContactForm/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/pdf" element={<PDF/>}/>
      </Routes>

    
  );
}

export default App;
