import { type ReactNode, createContext, useContext, useState } from 'react';

import storeItems from '../data/items.json';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppinngCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  totalItemsInCart: number;
  cartItems: CartItem[];
  isOpen: boolean;
  totalPrice: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppinngCartProvider({
  children,
}: ShoppinngCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const totalItemsInCart = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce((sum, curItem) => {
    const item = storeItems.find((i) => i.id === curItem.id);

    return sum + (item?.price || 0) * curItem.quantity;
  }, 0);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return setCartItems([...cartItems, { id, quantity: 1 }]);

    const newCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    return setCartItems(newCartItems);
  }

  function decreaseItemQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);

    if (item!.quantity === 1) {
      const newCartItems = cartItems.filter((item) => item.id !== id);
      return setCartItems(newCartItems);
    }

    const newCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );

    return setCartItems(newCartItems);
  }

  function removeFromCart(id: number) {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    return setCartItems(newCartItems);
  }

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        totalItemsInCart,
        closeCart,
        openCart,
        cartItems,
        isOpen,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined)
    throw new Error('Shopping cart context was used outside its provider');

  return context;
}
