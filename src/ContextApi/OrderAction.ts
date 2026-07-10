import type { Order } from "../Interface/Order";


export const addOrder = (draft: Order[], order: Order) => {

    draft.unshift(order);

};
