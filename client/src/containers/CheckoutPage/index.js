import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import PriceDetails from "../../components/PriceDetails";
import CartPage from "../CartPage";
import AddressForm from "./AddressForm";
import {Link, Redirect} from 'react-router-dom';
import {
  Box,Grid, Typography,Stack,Button,FormControlLabel,Radio,FormControl,FormLabel,RadioGroup
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const [value2,setValue2] = React.useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [step,setStep] = useState(2);
  const allAddresses = user.address;

  const notify = () => toast("Wow so easy!");



  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleRadioChange2 = (event) => {
    setValue2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(3);
  };

  const IncrementStep = () => {
    setStep(4);
  }

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));

    const payload = {
      addressId:value,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };

    dispatch(addOrder(payload));
    setConfirmOrder(true);
  }

  if(confirmOrder){
    notify();
    return <Redirect to={`/`} />
  }

  return (
    <Box sx={{height:"100vh",background:"#f8fbfc"}}>
      <Grid container sx={{marginTop:"3rem",display:"flex",justifyContent:""}}>
        <Grid item lg={12} sx={{display:"flex",justifyContent:"left"}}>
          <Stack direction="row">
            <Stack direction="row" sx={{display:{lg:"flex",md:"flex",sm:"flex",xs:"block"}}}>
              <Typography sx={{fontSize:{lg:"18px",md:"16px",sm:"14px",xs:"14px"},marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"2rem"}}}>Login</Typography>
              {step !==1 ? (<CheckIcon sx={{color:"green",marginLeft:{lg:"0.3em",md:"0.3em",sm:"0.2em",xs:"1.5em"},marginTop:{lg:"0",md:"0",sm:"0",xs:"0.2em"},fontSize:{lg:"24px",md:"21px",sm:"18px"}}} />) : (<CheckIcon sx={{color:"red",marginLeft:{lg:"0.3em",md:"0.3em",sm:"0.2em",xs:"1.5em"},marginTop:{lg:"0",md:"0",sm:"0",xs:"0.2em"},fontSize:{lg:"24px",md:"21px",sm:"18px"}}} />)}
            </Stack>
            <Stack direction="row" sx={{display:{lg:"flex",md:"flex",sm:"flex",xs:"block"}}}>
            <Typography sx={{fontSize:{lg:"18px",md:"16px",sm:"14px",xs:"14px"},marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"1rem"}}}>Delivery Address</Typography>
             {step !==1 && step !==2 ? (<CheckIcon sx={{color:"green",marginLeft:{lg:"0.3em",md:"0.3em",sm:"0.2em",xs:"2.1em"},marginTop:{lg:"0",md:"0",sm:"0",xs:"0.2em"},fontSize:{lg:"24px",md:"21px",sm:"18px"}}} />) : (<CheckIcon sx={{color:"red",marginTop:{lg:"0",md:"0",sm:"0",xs:"0.2em"},marginLeft:{lg:"0.3em",md:"0.3em",sm:"0.2em",xs:"2.1em"},fontSize:{lg:"24px",md:"21px",sm:"18px"}}} />)}
            </Stack>
            <Stack direction="row" sx={{display:{lg:"flex",md:"flex",sm:"flex",xs:"block"}}}>
            <Typography sx={{fontSize:{lg:"18px",md:"16px",sm:"14px"},marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"1rem"}}}>Order Summary</Typography>
             {step !==1 && step !==2 && step !==3 ? (<CheckIcon sx={{color:"green",marginLeft:{lg:"0.3em",md:"0.3em",sm:"0.2em",xs:"2.1em"},marginTop:{lg:"0",md:"0",sm:"0",xs:"0.2em"},fontSize:{lg:"24px",md:"21px",sm:"18px"}}} />) : (<CheckIcon sx={{color:"red",marginTop:{lg:"0",md:"0",sm:"0",xs:"0.2em"},marginLeft:{lg:"0.3em",md:"0.3em",sm:"0.2em",xs:"2.1em"},fontSize:{lg:"24px",md:"21px",sm:"18px"}}} />)}
            </Stack>
            <Stack direction="row"sx={{display:{lg:"flex",md:"flex",sm:"flex",xs:"block"}}}>
            <Typography sx={{fontSize:{lg:"18px",md:"16px",sm:"14px"},marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"1rem"}}}>Payment Options</Typography>
             {step !==1 && step !==2 && step !==3 && step !==4 ? (<CheckIcon sx={{color:"green",marginTop:{lg:"0",md:"0",sm:"0",xs:"0.2em"},marginLeft:{lg:"0.3em",md:"0.3em",sm:"0.2em",xs:"2.1em"},fontSize:{lg:"24px",md:"21px",sm:"30px"}}} />) : (<CheckIcon sx={{color:"red",marginTop:{lg:"0",md:"0",sm:"0",xs:"0.2em"},marginLeft:{lg:"0.3em",md:"0.3em",sm:"0.2em",xs:"2.1em"},fontSize:{lg:"24px",md:"21px",sm:"18px"}}} />)}
            </Stack>
          </Stack>
        </Grid>
        {step==2 ? (
        <Grid item lg={8} md={12} sm={12} sx={{display:"flex",justifyContent:"left",justifyContent:"center",marginTop:"3rem",background:"#ffffff",width:{lg:"1000px",md:"1500px"}}}>
          <Grid container>
              <form onSubmit={handleSubmit}>
                  <FormControl variant="standard">
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="quiz"
                      value={value}
                      onChange={handleRadioChange}
                    >
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{width:{lg:"950px",md:"800px",sm:"600px"}}}> 
                  <Box sx={{display:"flex",justifyContent:"left",marginLeft:{lg:"2rem"}}}>
                      <Typography sx={{fontSize:{lg:"22px"}}}>
                        Delivery Address
                      </Typography>
                  </Box>

                  {allAddresses?.map((address)=>(
                  <Grid container sx={{marginTop:{lg:"0rem"}}}>
                    <Grid item  lg={3} md={3} sm={3} xs={3} p={3}>
                        <Typography sx={{color:"purple"}}>
                           <FormControlLabel value={address._id} control={<Radio />} label={address.addressType} />
                        </Typography>
                    </Grid>
                    <Grid item  lg={7} md={7} sm={7} xs={7} p={3} sx={{marginTop:{lg:"0.5em"}}}>
                      <Typography >
                        {address.address} {address.cityDistrictTown} / {address.state}
                        </Typography>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2} p={3}>
                      <Button sx={{background:"purple",color:"white"}}>
                        Delete
                      </Button>
                    </Grid>

                  </Grid>
                  ))}

                  {value!=='' ? (
                    <Grid container sx={{marginTop:{lg:"0rem"},padding:2,background:"#ffffff"}}>
                      <Grid item>
                        <Button type="submit">
                          Delivery here
                        </Button>
                      </Grid>
                  </Grid>
                  ):null}
              </Grid>
              </RadioGroup>
              </FormControl>
            </form>
          <Grid container>
              <Grid item lg={12}>
                <Stack direction="row" sx={{display:"flex",justifyContent:"left",marginLeft:{lg:"2rem",marginTop:"1em"}}}>
                  <FormControl variant="standard">
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="quiz"
                      value={value2}
                      onChange={handleRadioChange2}
                    >
                    <FormControlLabel value="newAddress" control={<Radio />} label="Add New Address" />
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {value2 !== '' ? (
                  <AddressForm />
                ):null}
              </Grid>
          </Grid>

          </Grid>

        </Grid>

        ):null}

        {step==3 ? (
        <Grid item lg={12} sx={{display:"flex",justifyContent:"left",width:"100%",justifyContent:"center",marginTop:"3rem"}}>
          <Box>
              <CartPage checkout="checkout"  />
              <Button variant="contained" sx={{marginLeft:"2rem",width:"100%",marginBottom:"5rem"}} onClick={()=>{IncrementStep()}}>Contınue</Button>
          </Box>
        </Grid>

        ):null}

        {step==4 ? (
        <Grid item lg={12} sx={{display:"flex",justifyContent:"left",width:"100%",justifyContent:"left",marginTop:"3rem"}}>
          <Stack direction="column" sx={{width:"100%"}}>
            <Box sx={{display:"flex",width:"100%",justifyContent:{lg:"left",md:"left",sm:"left",xs:"center"}}}>
              <Typography sx={{marginLeft:"2em"}}>
                  Payment Options
                </Typography>
            </Box>
              <FormControl sx={{marginLeft:"2em",marginTop:"1em",width:"100%",display:"flex",justifyContent:{lg:"left",md:"left",sm:"left",xs:"center"}}}>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    <Stack direction="row">
                        <FormControlLabel value="Home" control={<Radio />} label="Cash on delivery" />
                    </Stack>
                </RadioGroup>
            </FormControl>
            <Button variant="contained" sx={{marginTop:"1em",marginLeft:"1em",width:{lg:"200px",md:"180px",sm:"180px"}}} onClick={()=>{onConfirmOrder()}}>
              Confirm Order
            </Button>
          </Stack>
        </Grid>

        ):null}
      </Grid> 
    </Box>
  );
};

export default CheckoutPage;