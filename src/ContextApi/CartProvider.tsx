import type { ReactNode } from "react";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";

import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./CartActions";
import type { CartItem } from "../Interface/CartItem";
import { CartContext } from "./CartContext";



interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useImmer<CartItem[]>([]);

  return (
    <CartContext.Provider
      value={{
        cart,

        addToCart: (product) => {
          setCart((draft) => addToCart(draft, product));
          toast.success(`🛒 Added ${product.description || product.name} to cart!`);
        },

        removeFromCart: (id) => {
          const item = cart.find((x) => x.id === id);
          const itemName = item ? item.description || item.name : "item";
          setCart((draft) => removeFromCart(draft, id));
          toast.info(`🗑️ Removed ${itemName} from cart`);
        },

        increaseQuantity: (id) =>
          setCart((draft) => increaseQuantity(draft, id)),

        decreaseQuantity: (id) =>
          setCart((draft) => decreaseQuantity(draft, id)),

        clearCart: () => setCart((draft) => clearCart(draft)),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}