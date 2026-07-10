import type { ReactNode } from "react";
import { useImmer } from "use-immer";
;

import { OrderContext } from "./OrderContext";
import type { Order } from "../Interface/Order";
import { addOrder } from "./OrderAction";

interface Props {
  children: ReactNode;
}

export function OrderProvider({ children }: Props) {
  const [orders, setOrders] = useImmer<Order[]>([]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder: (order: Order) =>
          setOrders((draft) => addOrder(draft, order)),
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}