import { useEffect } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCartItem } from "./cartSlice";

type CartPageProps = {
    
};

interface LocationState {
    search: string
}

const CartPage:React.FC<CartPageProps> = () => {
    const { params } = useRouteMatch<{id: string}>();
    const { search } = useLocation<LocationState>();
    
    const variantId = params.id
    const qty = search ? search.split("=")[1] : 1

    const dispatch = useAppDispatch();

    const {cartItems} = useAppSelector(state => state.cart)
    
    
    useEffect(() => {
        dispatch(addCartItem({
            variant: +variantId,
            qty: +qty 
        }))
    }, [dispatch, variantId, qty])
    
    return (
        <div>
            <h1>Cart</h1>
            <p>{JSON.stringify(cartItems,null, 4)}</p>
            
        </div>
    )
}

export default CartPage;