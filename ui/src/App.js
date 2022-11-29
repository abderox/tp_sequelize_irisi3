import logo from './logo.svg';
import './App.css';
import Bookery from './bookery'
import Navbar from './header'

function App() {
  return (
    <>
    <Navbar />
     <div className="container">
     <Bookery />
    </div>
    </>
   
  );
}

export default App;
