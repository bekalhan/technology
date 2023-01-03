import React,{useEffect} from 'react';
import {
    Grid,Box,Avatar,Stack, Typography,Rating, Button
} from '@mui/material';
import m1 from '../../img/m1.jpeg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import { addToCart } from "../../actions";


function ProductDetails(props) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
  
    useEffect(() => {
      const { productId } = props.match.params;
      console.log(props);
      const payload = {
        params: {
          productId,
        },
      };
      dispatch(getProductDetailsById(payload));
    }, []);
  
    if (Object.keys(product.productDetails).length === 0) {
      return null;
    }


    console.log("detalmtksa :",product);
  return (
    <Box sx={{background:"#ffffff",marginTop:"0.2em"}}>
        <Grid container sx={{display:"flex",justifyContent:"center"}}>
            <Grid item lg={4} md={4} sm={12} xs={12} sx={{marginTop:{lg:"4rem",md:"4rem",sm:"3rem",xs:"3rem"}}}>
                <Stack direction="column">
                    <Avatar variant='square' src={product.productDetails.images[0].url} sx={{width:"100%",height:"100%"}} />
                <Grid container>
                    {product.productDetails.images?.map((thumb,index)=>(
                    <Grid item p={1} lg={4} md={4} sm={4} xs={4}>
                         <Avatar variant='square' src={thumb.url} sx={{width:"100%",height:"100%"}} />
                    </Grid>
                    ))}
                </Grid>
                </Stack>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <Stack direction="column">
                    <Typography  sx={{fontWeight:"bold",marginTop:{lg:"6rem",md:"5rem",sm:"4rem",xs:"3rem"},fontSize:{lg:"28px",md:"25px",sm:"32px",xs:"24px"},marginLeft:"2rem"}}>
                        {product.productDetails.name}
                    </Typography>
                    <Stack direction="row" sx={{marginTop:{lg:"2rem",md:"0.5rem",sm:"2rem",xs:"1rem"},marginLeft:"2rem"}}>
                    <Rating
                        name="simple-controlled"
                        value="4"
                    />
                    <Typography sx={{marginLeft:"0.3em",color:"gray"}}>
                        4 
                    </Typography>
                    <Typography sx={{marginLeft:"6rem",fontSize:{lg:"20px",md:"15px"}}}>
                            2474 reviews
                    </Typography>
                    </Stack>
                    <Stack direction="row" sx={{marginLeft:"2rem",marginTop:{lg:"3rem",md:"1rem",sm:"2rem",xs:"1rem"}}}>
                        <Box sx={{width:{lg:"230px",md:"200px"},height:{lg:"40px"},background:"#ffffff",borderRadius:"20px",display:"flex",justifyContent:"space-between"}}>
                            <Stack direction="row" sx={{width:{lg:"60px"},background:"#f5f6f7",margin:1,borderRadius:"15px"}}>
                                <VisibilityIcon sx={{marginLeft:"0.2em",fontSize:{lg:"24px",md:"20px"}}} />
                                <Typography sx={{fontSize:{lg:"15px",md:"12px"},marginLeft:"0.2em"}}>
                                    15
                                </Typography>
                            </Stack>
                            <Typography sx={{fontSize:{lg:"14px",md:"12px"},marginRight:"1em",marginTop:"0.5em"}}>
                            People are watching
                             </Typography>
                        </Box>
                        <Box sx={{width:{lg:"70px"},height:{lg:"40px"},background:"#ffffff",borderRadius:"20px",display:"flex",justifyContent:"space-between",marginLeft:"1em"}}>
                            <Stack direction="row" sx={{width:{lg:"60px"},background:"#f5f6f7",margin:1,borderRadius:"15px"}}>
                                <FavoriteBorderIcon sx={{marginLeft:"0.2em"}} />
                                <Typography sx={{fontSize:{lg:"15px"},marginLeft:"0.2em"}}>
                                    237
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    <Box sx={{marginLeft:"3rem",marginTop:{lg:"3rem",md:"1rem",sm:"2rem",xs:"1rem"}}}>
                        <Typography sx={{fontSize:{lg:"32px",md:"24px",sm:"32px",xs:"28px"}}}>
                            ${product.productDetails.price}
                        </Typography>
                    </Box>
                    <Button sx={{marginLeft:"3rem",marginTop:{lg:"3rem",md:"1rem",sm:"2rem",xs:"2rem"},background:"#375aff",width:{lg:"300px"},height:{lg:"40px"}}}>
                        <Stack direction="row"
                        onClick={() => {
                        const { _id, name, price } = product.productDetails;
                        const img = product.productDetails.images[0].url;
                        dispatch(addToCart({ _id, name, price, img }));
                        }}  
                        >
                            <ShoppingCartCheckoutIcon sx={{color:"white"}} />
                            <Typography sx={{color:"white",marginLeft:"1em"}}>
                                Add to Cart
                            </Typography>
                        </Stack>
                    </Button>
                </Stack>
            </Grid>

        </Grid>
    </Box>
  )
}

export default ProductDetails;