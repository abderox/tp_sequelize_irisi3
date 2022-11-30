import logo from './logo.svg';
import './App.css';
import Bookery from './bookery'
import Navbar from './header'
import Footer from './footer';

function App() {
  return (
    <>
    <Navbar />
     <div className="container">
     <Bookery />
    </div>
    <Footer/>
    </>
   
  );
}

export default App;
