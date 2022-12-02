import Navbar from './components/header'
import Footer from './components/footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar />
     <div className="container">
     <Outlet/>
    </div>
    <Footer/>
    </>
   
  );
}

export default App;
