import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Advantages from './Components/Advantages/Advantages';
import Footer from './Components/Footer/Footer';
import Playnow from './Components/Playnow/Playnow';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Header />
        <Playnow />
        <Advantages />
        <Footer />
        <Routes>
          <Route path='/' exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
