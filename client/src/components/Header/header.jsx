import React,{useState} from 'react';
import {
    AppBar,Toolbar,Grid,Stack,Box,Typography,FormControl,InputLabel,
    OutlinedInput,InputAdornment,Avatar,ListItemIcon,ListItemText,IconButton,Menu
} from '@mui/material';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import SearchIcon from '@mui/icons-material/Search';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import cedric from '../../img/ced8.jpeg';
import { useTheme } from '@mui/material/styles';
import {Drawer} from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import InterestsIcon from '@mui/icons-material/Interests';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';




const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));





function Header() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [drawer,setDrawer] = useState(false);
    const [open2,setOpen2] = useState(false);


    const cart = useSelector((state) => state.cart);
    const authenticate = useSelector(state => state.auth);
    const auth= authenticate.authenticate;

    const logout = () => {
        dispatch(signout());
      };


  return (
    <AppBar position='stick'>
            {!drawer ?
            (
                <Toolbar sx={{background:"#ffffff",padding:2}}>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                onClose={e =>setOpen2(false)}
                                open={open2}
                                anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                                }}
                                transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                                }}
                                sx={{marginTop:"5rem"}}
                            >
                                <MenuItem>
                                    <Link to={`/`} style={{textDecoration:"none"}}>
                                        <MenuItem sx={{marginTop:"1rem"}}>
                                            <ListItemIcon>
                                                <CurrencyBitcoinIcon sx={{color:"#3f1cbc",fontSize:"32px"}} />
                                            </ListItemIcon>
                                            <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.5em",fontWeight:"bold"}}>SuperCoin Zoin</ListItemText>
                                        </MenuItem>
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to={`/`} style={{textDecoration:"none"}}>
                                        <MenuItem sx={{marginTop:"1rem"}}>
                                            <ListItemIcon>
                                                <NotificationsIcon sx={{color:"#3f1cbc",fontSize:"32px"}} />
                                            </ListItemIcon>
                                            <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.5em",fontWeight:"bold"}}>Notifications</ListItemText>
                                        </MenuItem>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={()=>logout()}> 
                                    <MenuItem sx={{marginTop:"1rem"}}>
                                                <ListItemIcon>
                                                    <LogoutIcon sx={{color:"#3f1cbc",fontSize:"32px"}} />
                                                </ListItemIcon>
                                                <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.5em",fontWeight:"bold"}}>Logout</ListItemText>
                                            </MenuItem>

                                    </MenuItem>
                            </Menu>

                <Box sx={{display:{lg:"none",md:"none",sm:"none",xs:"block"}}}>
                <MenuIcon sx={{color:"black"}} onClick={()=>setDrawer(true)}></MenuIcon>
            </Box>
                <Grid container sx={{color:"black"}}>
                    <Grid item lg={3} md={3} sm={3} xs={12} sx={{display:"flex",justifyContent:{lg:"flex-start",md:"flex-start",sm:"flex-start",xs:"center"}}}>
                        <Link to={`/`} style={{textDecoration:"none"}}>
                            <Stack direction="row" sx={{marginTop:{lg:"0.8em",md:"0.8em",sm:"0.8em"}}}>
                                <BatteryChargingFullIcon sx={{color:"#2b00d4",fontSize:{lg:"40px",md:"36px",sm:"32px",xs:"40px"},marginTop:{lg:"0",md:"",sm:"",xs:"0.1em"}}} />
                                <Typography sx={{fontSize:{lg:"28px",md:"24px",sm:"22px",xs:"32px"},fontWeight:"100",color:"gray"}}>
                                    roo
                                </Typography>
                                <Typography sx={{fontSize:{lg:"28px",md:"24px",sm:"22px",xs:"32px"},fontWeight:"bold"}}>
                                    tcg
                                </Typography>
                            </Stack>
                        </Link>
                    </Grid>
                    <Grid item lg={5} md={5} sm={5} sx={{display:{lg:"block",md:"block",sm:"block",xs:"none"}}}>
                    <FormControl
                     sx={{ m: 1,border:"0.1px solid #f8f9fd",background:"#f8f9fd",width:{lg:"400px",md:"250px",sm:"200px"} }}>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">
                                     <SearchIcon sx={{color:"#919294"}} />
                            </InputAdornment>}
                        />
                     </FormControl>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} sx={{display:"flex",justifyContent:"right",padding:1.8,display:{lg:"flex",md:"flex",sm:"flex",xs:"none"}}}>
                        <Stack direction="row">
                            {auth ? (
                                  <Stack direction="row" sx={{background:"#eae6fc",height:{lg:"50px",md:"45px",sm:"45px"},width:{lg:"130px",md:"120px",sm:"100px"},borderRadius:"8px",display:"flex",textAlign:"center",marginLeft:{lg:"1em",md:"0.8em",sm:"0.6em"},marginTop:{lg:"0.5em",md:"0.5em",sm:"0.5em"},cursor:"pointer"}}>
                                  <Typography sx={{color:"#3f1cbc",fontWeight:"bold",textAlign:"center",marginTop:{lg:"0.7em",md:"0.6em",sm:"0.8em"},marginLeft:{lg:"0.8em",md:"1.2em",sm:"0.5em"},fontSize:{lg:"16px",md:"14px",sm:"14px"}}}>
                                      Wishlist
                                  </Typography>
                                  <Box>
                                      <FavoriteIcon sx={{marginTop:{md:"0.4em",sm:"0.5em"},marginLeft:{md:"0.3em",sm:"0.4em"},color:"#3f1cbc",fontSize:{lg:"28px",md:"24px",sm:"20px"}}} />
                                  </Box>
                              </Stack>
                            ):null}
                            <IconButton aria-label="cart">
                            <StyledBadge badgeContent={Object.keys(cart.cartItems).length} color="secondary">
                            <Link to={`/cart`} style={{textDecoration:"none"}}>
                            <Stack direction="row" sx={{background:"#eae6fc",height:{lg:"50px",md:"45px",sm:"45px"},width:{lg:"140px",md:"120px",sm:"110px"},borderRadius:"8px",display:"flex",textAlign:"center",cursor:"pointer"}}>
                                <Typography sx={{color:"#3f1cbc",fontWeight:"bold",textAlign:"center",marginTop:{lg:"0.7em",md:"0.6em",sm:"0.8em"},marginLeft:{lg:"0.8em",md:"0.6em",sm:"0.5em"},fontSize:{lg:"16px",md:"14px",sm:"14px"}}}>
                                    Your Cart
                                </Typography>
                                <Box>
                                    <ShoppingCartIcon sx={{marginTop:{md:"0.4em",sm:"0.5em"},marginLeft:{md:"0.3em",sm:"0.4em"},color:"#3f1cbc",fontSize:{lg:"28px",md:"24px",sm:"20px"}}} />
                                </Box>
                            </Stack>
                            </Link>
                            </StyledBadge>
                            </IconButton>
                            {auth ? (
                            <Box sx={{marginLeft:{lg:"1em",md:"1em",sm:"1rem"},cursor:"pointer"}}>
                                <Avatar src={cedric} sx={{height:{lg:"50px",md:"45px",sm:"45px"},width:{lg:"50px",md:"45px",sm:"45px"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em"}}} onClick={()=>setOpen2(true)} />
                            </Box>
                            ):null}
                            {!auth ? (
                            <Link to={`/login`} style={{textDecoration:"none"}}>
                                <Stack direction="row" sx={{background:"#eae6fc",height:{lg:"50px",md:"45px",sm:"45px"},width:{lg:"100px",md:"90px",sm:"80px"},borderRadius:"8px",display:"flex",textAlign:"center",marginLeft:{lg:"1em",md:"0.8em",sm:"0.6em"},marginTop:{lg:"0.5em",md:"0.5em",sm:"0.5em"},cursor:"pointer"}}>
                                    <Typography sx={{color:"#3f1cbc",fontWeight:"bold",textAlign:"center",marginTop:{lg:"0.7em",md:"0.6em",sm:"0.8em"},marginLeft:{lg:"0.8em",md:"0.6em",sm:"0.5em"},fontSize:{lg:"16px",md:"14px",sm:"14px"}}}>
                                        Login
                                    </Typography>
                                    <Box>
                                        <AccountCircleIcon sx={{marginTop:{md:"0.4em",sm:"0.5em"},marginLeft:{md:"0.3em",sm:"0.4em"},color:"#3f1cbc",fontSize:{lg:"28px",md:"24px",sm:"20px"}}} />
                                    </Box>
                                </Stack>
                            </Link>
                            ):null}
                        </Stack>
                    </Grid>
                </Grid>
                </Toolbar>
            ):(
                <Drawer anchor='left' open={true} sx={{width:"300px"}}>
                    <MenuList sx={{width:"500px"}}>
                        <MenuItem sx={{display:"flex",justifyContent:"center"}}>
                            <MenuIcon sx={{color:"black"}} onClick={()=>{setDrawer(false)}} />
                        </MenuItem>
                        <MenuItem sx={{display:"flex",justifyContent:"center"}}>
                            <Avatar src={cedric} sx={{width:"80px",height:"80px"}} />
                        </MenuItem>
                        <Link to={`/cart`} style={{textDecoration:"none"}}>
                            <MenuItem sx={{marginTop:"1rem"}}>
                                <ListItemIcon>
                                    <ShoppingCartIcon sx={{color:"#3f1cbc",fontSize:"32px"}} />
                                </ListItemIcon>
                                <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.5em",fontWeight:"bold"}}>Your Cart</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to={`/`} style={{textDecoration:"none"}}>
                            <MenuItem sx={{marginTop:"1rem"}}>
                                <ListItemIcon>
                                    <CurrencyBitcoinIcon sx={{color:"#3f1cbc",fontSize:"32px"}} />
                                </ListItemIcon>
                                <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.5em",fontWeight:"bold"}}>SuperCoin Zoin</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to={`/`} style={{textDecoration:"none"}}>
                            <MenuItem sx={{marginTop:"1rem"}}>
                                <ListItemIcon>
                                    <CreditCardIcon sx={{color:"#3f1cbc",fontSize:"32px"}} />
                                </ListItemIcon>
                                <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.5em",fontWeight:"bold"}}>Root eliminated Cart</ListItemText>
                            </MenuItem>
                        </Link>
                        <MenuItem sx={{marginTop:"1rem"}}>
                            <ListItemIcon>
                                <InterestsIcon sx={{color:"#3f1cbc",fontSize:"32px"}} />
                            </ListItemIcon>
                            <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.5em",fontWeight:"bold"}}>My WishList</ListItemText>
                        </MenuItem>
                        <Link to={`/`} style={{textDecoration:"none"}}>
                            <MenuItem sx={{marginTop:"1rem"}}>
                                <ListItemIcon>
                                    <NotificationsIcon sx={{color:"#3f1cbc",fontSize:"32px"}} />
                                </ListItemIcon>
                                <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.5em",fontWeight:"bold"}}>Notifications</ListItemText>
                            </MenuItem>
                        </Link>

                    </MenuList>
                        <MenuItem sx={{marginTop:"auto",display:"flex",justifyContent:"center",marginBottom:"1rem"}}>
                            <Box>
                                <ListItemIcon>
                                    {auth?(
                                     <LogoutIcon sx={{color:"black",fontSize:"32px",marginLeft:"0.8em"}} onClick={()=>logout()} />
                                    ) : (
                                        <AccountCircleIcon sx={{color:"black",fontSize:"32px",marginLeft:"0.8em"}} />
                                    )}
                                </ListItemIcon>
                                {auth ? (
                                    <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.5em",fontWeight:"bold",fontSize:"32px"}} onClick={()=>logout()} >Logout</ListItemText>
                                ) : (
                                    <Link to={`/login`} style={{textDecoration:"none"}}>
                                        <ListItemText sx={{color:"#3f1cbc",marginLeft:"0.7em",fontWeight:"bold",fontSize:"32px"}}>Login</ListItemText>
                                    </Link>
                                )}
                            </Box>
                        </MenuItem>
                </Drawer>
            )}
    </AppBar>
  )
}

export default Header