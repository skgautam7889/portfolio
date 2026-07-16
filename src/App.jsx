import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/common/ScrollToTop';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

// Bootstrap Grid CSS only
import 'bootstrap/dist/css/bootstrap-grid.min.css';
// Global CSS
import './assets/css/style.css';
import ThemeProvider from './context/ThemeProvider';
import CodeRainLoader from './components/CodeRainLoader';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <CodeRainLoader />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;