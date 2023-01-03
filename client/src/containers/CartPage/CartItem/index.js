import React,{useState} from 'react';
import {
    Box, Typography,Grid,Divider,Stack,Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { removeCartItem } from "../../../actions";


function CartItem(props) {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(props.cartItem.qty);

    const { _id, name, price, img } = props.cartItem;
  
    const onQuantityIncrement = () => {
      setQty(qty + 1);
      props.onQuantityInc(_id, qty + 1);
    };
  
    const onQuantityDecrement = () => {
      if (qty <= 1) return;
      setQty(qty - 1);
      props.onQuantityDec(_id, qty - 1);
    };

    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
      };

  return (
    <Stack direction="column" sx={{marginTop:{lg:"none",md:"none",sm:"none",xs:"2rem"}}}>
    <Grid container>
      <Grid item lg={3} md={3} sm={2} xs={12} sx={{padding:2,display:{lg:"block",md:"block",sm:"block",xs:"flex"},justifyContent:"center"}}>
        <Avatar variant="square" src={img} sx={{width:{lg:"200px",md:"200px",sm:"100px",xs:"450px"},height:{lg:"200px", md:"200px",sm:"150px",xs:"300px"}}} />
      </Grid>
      <Grid lg={7} md={7} sm={8} xs={12} sx={{padding:2}}>
        <Stack direction="column">
            <Typography sx={{marginTop:{lg:"4rem",md:"3rem",sm:"2rem"},color:"gray",fontWeight:"100"}}>
              {name}
            </Typography>
            <Stack direction="row" sx={{marginLeft:{lg:"0",md:"0",sm:"0",xs:"8rem"}}}>
              <Box sx={{border:"1px solid #bcbcbc",borderRadius:"8px",marginTop:{lg:"1rem",md:"1rem",sm:"1rem",xs:"1.5rem"},width:{lg:"100px",md:"100px",sm:"100px"},height:{lg:"30px",md:"30px",sm:"30px"}}}>
                <Stack direction="row" sx={{display:"flex",justifyContent:"center",marginTop:"0.2em"}}>
                  <AddIcon onClick={onQuantityIncrement} />
                  <Typography sx={{marginLeft:"0.5em",marginRight:"0.5em"}}>
                    {qty}
                  </Typography>
                  <RemoveIcon onClick={onQuantityDecrement} />
                </Stack>
              </Box>
              <Box sx={{border:"1px solid #bcbcbc",borderRadius:"8px",marginTop:{lg:"1rem",md:"1rem",sm:"1rem",xs:"1.5rem"},width:{lg:"100px",md:"100px",sm:"100px",xs:"100px"},height:{lg:"30px",md:"30px",sm:"30px"},display:"flex",justifyContent:"center",marginLeft:"1em",cursor:"pointer"}}
              onClick={() => onRemoveCartItem(_id)}
              >
                  <Typography sx={{marginTop:"0.2em"}}>
                    Remove
                  </Typography>
              </Box>
              <Box sx={{marginLeft:"2em",marginTop:{lg:"1.2em",md:"1.2em",sm:"1.2em",xs:"1.6em"}}}>
                <Typography sx={{color:"green",fontWeight:"bold"}}>
                  In stock
                </Typography>
              </Box>
            </Stack>
         </Stack>
      </Grid>
      <Grid lg={2} md={2} sm={2} xs={12}>
        <Box sx={{display:"flex",justifyContent:"center"}}>
            <Typography sx={{marginTop:{lg:"5rem",md:"5rem",sm:"5rem",xs:"1rem"},fontWeight:"bold",fontSize:"24px"}}>
                ${price}
            </Typography>
        </Box>
      </Grid>
    </Grid>
  </Stack>
  )
}

export default CartItem;