import React,{useEffect} from 'react';
import {
    Box,
    Grid,
    Typography,
    Card,
    CardHeader,
    CardMedia,CardContent,
    Avatar,
    Stack
} from '@mui/material';
import Categories from '../../components/Categories/Categories';
import m1 from '../../img/m1.jpeg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../actions";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions";



function Home() {
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const allProducts = product.allProducts;

    useEffect(()=>{
        dispatch(getAllProduct());
      },[dispatch])
    

    console.log("all product :",allProducts);

  return (
    <Box p={2}>
     <Grid container sx={{marginTop:"0.2em"}}>
            <Grid item sx={{background:"#ffffff",display:{lg:"block",md:"block",sm:"none",xs:"none"}}} lg={2} md={2}>
                <Categories />
            </Grid>  
            <Grid item lg={10} md={10} sm={12} xs={12}>
                <Typography variant="h5">
                        All Products
                </Typography>
                <Grid container sx={{marginTop:"3em"}}>
                    {allProducts?.map((product)=>(
                   <Grid item p={2} lg={4} md={4} sm={6} xs={12}>
                        <Card sx={{borderRadius:"20px"}}>
                            <Link
                            className="caImgContainer"
                            to={`/${product.slug}/${product._id}/p`}
                            style={{textDecoration:"none",color:"black"}}
                            >
                                <CardMedia
                                component="img"
                                height="250"
                                image={product.images[0].url}
                                alt="Paella dish"
                                >
                                </CardMedia>
                            </Link>
                            <CardContent sx={{display:"flex",justifyContent:"center"}}>
                                <Stack direction="column">
                                <Link
                                    className="caImgContainer"
                                    to={`/${product.slug}/${product._id}/p`}
                                    style={{textDecoration:"none",color:"black"}}
                                    >
                                        <Typography>
                                            Apple MacBook Air M1 Çip 8GB 256GB SSD macOS 13
                                        </Typography>
                                    </Link>
                                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                                            <Box sx={{marginTop:"1em"}}>
                                                <Stack direction="column">
                                                    <Typography sx={{color:"gray",fontWeight:"100"}}>
                                                            Price:
                                                    </Typography>
                                                    <Typography sx={{fontWeight:"bold"}}>
                                                        ${product.price}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                            <Box sx={{borderRadius:"8px",background:"#2b00d4",width:{lg:"50px",md:"40px",sm:"50px",xs:"50px"},height:{lg:"50px",md:"40px",sm:"50px",xs:"50px"},marginTop:"1em",display:"flex",justifyContent:"center",cursor:"pointer"}}>
                                                    <ShoppingCartIcon sx={{color:"white",marginTop:"0.5em",fontSize:{lg:"26px",md:"20px"}}}
                                                            onClick={() => {
                                                            const { _id, name, price } = product;
                                                            const img = product.images[0].url;
                                                            dispatch(addToCart({ _id, name, price, img }));
                                                        }}  
                                                    />
                                            </Box>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Grid>
 
      </Grid>
    </Box>
  )
}

export default Home