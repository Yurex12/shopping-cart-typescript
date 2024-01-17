import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import NavBar from './components/NavBar';
import { ShoppinngCartProvider } from './context/ShoppingCartContext';

function App() {
  return (
    <ShoppinngCartProvider>
      <NavBar />
      <Container className='mb-4'>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/store' element={<Store />} />
        </Routes>
      </Container>
    </ShoppinngCartProvider>
  );
}

export default App;
