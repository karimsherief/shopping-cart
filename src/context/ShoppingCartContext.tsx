import { createContext, useContext, useState } from "react";
import { Cart } from "../components";
import useLocalStorage from "../hooks/useLocalStorage";
interface CartItems {
  id: number;
  quantity: number;
}
interface ShoppingCart {
  closeCart: () => void;
  openCart: () => void;
  addToCart: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  getItemQuantity: (id: number) => number;
  cartItems: CartItems[];
  cartQuantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCart);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export default function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItems[]>(
    "shopping-cart",
    []
  );
  const cartQuantity = cartItems.reduce((acc, curr) => curr.quantity + acc, 0);
  function closeCart() {
    setIsOpen(false);
  }
  function openCart() {
    setIsOpen(true);
  }
  function addToCart(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id: id, quantity: 1 }];
      }
      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      }
      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        closeCart,
        openCart,
        addToCart,
        cartItems,
        decreaseCartQuantity,
        getItemQuantity,
        removeFromCart,
        cartQuantity,
      }}
    >
      {children}
      <Cart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
