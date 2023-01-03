import React from 'react';
import {
    Grid,Stack, Typography,Divider,Box, Button
} from '@mui/material';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems, removeCartItem } from "../../actions";



function PriceDetails(props) {
    const authenticate = useSelector(state=>state.auth);
    const cart = useSelector((state) => state.cart);
    const auth = authenticate.authenticate;
    let link;

    if(auth){
        link = `/checkout`;
    }
    else{
        link = `/login`;
    }

  return (
    <Grid item p={5} lg={3} md={12} sm={12} xs={12} >
        <Stack direction="column" sx={{marginTop:"0.3rem"}}>
            <Typography sx={{fontSize:"24px"}}>
                Price Details
            </Typography>
            <Divider/> 
            <Box sx={{marginTop:"1.5rem",display:"flex",justifyContent:"space-between"}}>
                <Typography>
                    Price ({props.totalItem} items)
                </Typography>
                <Typography>
                    {props.totalPrice}
                </Typography>
            </Box>
            <Box sx={{marginTop:"1.5rem",display:"flex",justifyContent:"space-between"}}>
                <Typography>
                    Delivery Charges
                </Typography>
                <Typography>
                    Free
                </Typography>
            </Box>
            <Box sx={{marginTop:"1.5rem",display:"flex",justifyContent:"space-between"}}>
                <Typography>
                    Total Amount
                </Typography>
                <Typography>
                    {props.totalPrice}
                </Typography>
            </Box>
            <Link to={link} style={{textDecoration:"none"}}>
                <Box sx={{marginTop:"1.5rem"}}>
                        {props.checkout===undefined ? (
                              <Button variant='contained' sx={{background:"orange",width:"100%"}}>
                                     Place Order
                              </Button>
                        ):null}
                </Box>
            </Link>
        </Stack>
    </Grid>
  )
}

export default PriceDetails;