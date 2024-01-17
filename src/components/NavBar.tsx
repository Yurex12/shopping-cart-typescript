import { Container, Button, Nav, Navbar as NavBarBs } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import logo from '../assets/shopping-cart-outline-svgrepo-com.svg';
import { useShoppingCart } from '../context/ShoppingCartContext';
import ShoppingCart from './ShoppingCart';

function NavBar() {
  const { totalItemsInCart, openCart } = useShoppingCart();
  return (
    <>
      <NavBarBs sticky='top'>
        <Container className='bg-white shadow-sm mb-3 py-2'>
          <Nav className='me-auto'>
            <Nav.Link to='/' as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to='/store' as={NavLink}>
              Store
            </Nav.Link>
            <Nav.Link to='/about' as={NavLink}>
              About
            </Nav.Link>
          </Nav>

          {totalItemsInCart > 0 && (
            <Button
              variant='outline-secondary'
              className='rounded-circle p-2'
              style={{ position: 'relative' }}
              onClick={openCart}
            >
              <img src={logo} style={{ width: '2rem', height: '2rem' }} />
              <div
                style={{
                  position: 'absolute',
                  width: '1rem',
                  height: '1rem',
                  bottom: 0,
                  right: 0,
                  transform: 'translate(25%, -25%)',
                  padding: '10px',
                }}
                className='rounded-circle bg-danger d-flex justify-content-center align-items-center text-white '
              >
                {totalItemsInCart}
              </div>
            </Button>
          )}
        </Container>
      </NavBarBs>

      <ShoppingCart />
    </>
  );
}

export default NavBar;
