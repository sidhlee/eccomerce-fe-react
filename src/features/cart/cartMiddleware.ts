import { Middleware } from "@reduxjs/toolkit";
import { addCartItem, removeCartItem } from "./cartSlice";

// https://stackoverflow.com/a/68421466
const cartMiddleware: Middleware = (store) => (next) => (action) => {
    // Call next here to update the state with action before saving cart to the localStorage
    const result = next(action);

    const isCartAction = addCartItem.match(action) || removeCartItem.match(action)
    if (isCartAction) {
        // Now we can access the latest state updated with the action payload 
        const cartItems = store.getState().cart.cartItems;        
        localStorage.setItem('cartItems', JSON.stringify(cartItems))

    }

    return result;
}

export default cartMiddleware