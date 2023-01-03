import React, { useEffect, useState } from 'react';
import {
    Box, Typography,Grid,Divider,Stack,Avatar
} from '@mui/material';
import m1 from '../../img/m1.jpeg';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import CartItem from './CartItem';
import PriceDetails from '../../components/PriceDetails';



function CartPage({checkout}) {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  console.log("cart page checkout :",checkout);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    //console.log({_id, qty});
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  return (
    <Box>
        <Grid container>
            <Grid item lg={8}>
                  {checkout===undefined ? (
                       <Typography sx={{fontSize:"32px",marginTop:"1em",marginLeft:"1em"}}>
                            Cart
                       </Typography>
                  ):(
                      <Typography sx={{fontSize:"32px",marginTop:"1em",marginLeft:"1em"}}>
                            Order Summary
                      </Typography> 
                  )}
             <Divider />
            {Object.keys(cartItems)?.map((key,cart)=>(
                        <CartItem
                        key={cart}
                        cartItem={cartItems[key]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                      />
                         
            ))}
            </Grid>
            <PriceDetails
            checkout={checkout}
            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
              return qty + cart.cartItems[key].qty;
            }, 0)}
            totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
              const { price, qty } = cart.cartItems[key];
              return totalPrice + price * qty;
            }, 0)}
          />
        </Grid>
    </Box>
  )
}

export default CartPage;