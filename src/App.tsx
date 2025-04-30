import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MarketPlace from './pages/MarketPlace';
import Home from './pages/Home';
import About from './pages/About';
import Roadmap from './pages/Roadmap';
import Whitepaper from './pages/Whitepaper';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext'; // Import FilterProvider

const App = () => {
  return (
    <ThemeProvider>
      <FilterProvider> 
        <BrowserRouter>
          <Navbar />
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/marketplace" element={<MarketPlace />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/whitepaper" element={<Whitepaper />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </FilterProvider>
    </ThemeProvider>
  );
};

export default App;
