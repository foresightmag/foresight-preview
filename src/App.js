import './App.css';
import Card from "./components/Card"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import About from "./components/About"

function App() {
  
  return (
    <div className="App">
      <Nav/>
      <Hero/>    
      <About/>
      <Marquee/>  
    </div>
  );
}

export default App;
