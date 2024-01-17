import { Button, Card } from 'react-bootstrap';

import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

export type StoreItemsProps = {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
};

function StoreItems({ name, id, imgUrl, price }: StoreItemsProps) {
  const {
    decreaseItemQuantity,
    increaseItemQuantity,
    getItemQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        src={imgUrl}
        height='200px'
        style={{ objectFit: 'cover' }}
      ></Card.Img>
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-2'>{name}</span>
          <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
        </Card.Title>
        <div className='mt-auto'>
          {quantity === 0 ? (
            <Button
              className='w-100'
              onClick={() => {
                increaseItemQuantity(id);
              }}
            >
              + Add To cart
            </Button>
          ) : (
            <div
              className='d-flex align-items-center flex-column'
              style={{ gap: '1.5rem' }}
            >
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ gap: '1.5rem' }}
              >
                <Button
                  className='w-100'
                  onClick={() => {
                    decreaseItemQuantity(id);
                  }}
                >
                  -
                </Button>
                <div>
                  <span className='fs-3'>{quantity}</span> in cart
                </div>

                <Button
                  className='w-100'
                  onClick={() => {
                    increaseItemQuantity(id);
                  }}
                >
                  +
                </Button>
              </div>

              <Button
                variant='danger'
                size='sm'
                className='w-100'
                onClick={() => {
                  removeFromCart(id);
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StoreItems;
