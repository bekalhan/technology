import React, { useEffect, useState } from 'react';
import {
    Box,Grid,Stack, Typography,TextField,OutlinedInput,InputLabel,FormControl, Button
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom';





function Login() {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });

      const [signup, setSignup] = useState(false);
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const auth = useSelector((state) => state.auth);
      const isAuth = auth.authenticate;
      const dispatch = useDispatch();

      const userSignup = () => {
        const user = { firstName, lastName, email, password };
        if (
          firstName === "" ||
          lastName === "" ||
          email === "" ||
          password === ""
        ) {
          return;
        }
    
        dispatch(_signup(user));
      };

    
      const userLogin = () => {
        console.log("geldimi ",email,password)
        if (signup) {
          userSignup();
        } else {
          dispatch(login({ email, password }));
        }
      };

      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      console.log("isauth :",isAuth);

      if(isAuth) {
        return <Redirect to={`/`} />
      }

  return (
    <Box sx={{background:"#d4d1df",height:"100vh"}}>
        <Grid container sx={{display:"flex",justifyContent:"center",paddingTop:"2rem"}}>
            <Grid item lg={5} md={5} sm={5} xs={10} sx={{background:"#ffffff"}}>
                <Stack direction="row">
                     <CircleIcon sx={{color:"#252938",fontSize:{lg:"18px",md:"14px",sm:"12px"},marginTop:"1em",marginLeft:"1em"}} />
                     <Typography sx={{marginTop:{lg:"0.9em",md:"0.5em",sm:"0.3em",xs:"1.4em"},marginLeft:"0.4em",color:"#6f7275"}}>
                            root elivated
                     </Typography>
                </Stack>
                <Stack direction="column" sx={{background:"",marginTop:{lg:"6rem",md:"5rem",sm:"5rem",xs:"5rem"},marginLeft:{lg:"0",md:"1em",sm:"2em",xs:"4rem"}}} >
                    <Stack direction="column" sx={{display:"flex",justifyContent:"left",marginLeft:{lg:"6rem",md:"4rem",sm:"2rem",xs:"2rem"}}}>
                        <Typography sx={{fontSize:{lg:"25px",md:"22px",sm:"18px",xs:"22px"},fontWeight:"bold"}}>
                            Welcome Back!
                        </Typography>
                        <Typography sx={{marginTop:"0.6em",color:"gray",fontWeight:"100",fontSize:{lg:"14px",md:"11px",sm:"9px",xs:"11px"}}}>
                            Welcome back! Please enter your details
                        </Typography>
                    </Stack>
                    <Stack direction="column" sx={{background:"",marginTop:{lg:"2rem",md:"2rem",sm:"2rem",xs:"2rem"},marginBottom:"10rem"}} >
                        <Stack direction="row" sx={{display:"flex",justifyContent:"left",marginLeft:{lg:"6rem",md:"4rem",sm:"2rem",xs:"2rem"}}}>
                        </Stack>
                        <Stack direction="column" sx={{display:"flex",justifyContent:"left",marginLeft:{lg:"6rem",md:"4rem",sm:"2rem",xs:"2rem"}}}>
                            <Typography>
                                Email
                            </Typography>
                            <Box>
                            <TextField
                                label="enter your email"
                                size="small"
                                id="outlined-start-adornment"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"30ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"} }}
                                />
                            </Box>
                        </Stack>
                        <Stack direction="column" sx={{display:"flex",justifyContent:"left",marginLeft:{lg:"6rem",md:"4rem",sm:"2rem",xs:"2rem"},marginTop:{lg:"1rem",md:"1rem",sm:"1rem",xs:"1rem"}}}>
                            <Typography>
                                Password
                            </Typography>
                            <Box>
                            <FormControl sx={{  width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"30ch"},marginTop:{lg:"0.3em",md:"0.3em",sm:"0.3em",xs:"0.3em"} }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        size="small"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Box>
                        </Stack>
                        <Stack direction="row" sx={{display:"flex",justifyContent:"left",marginLeft:{lg:"6rem",md:"4rem",sm:"2rem",xs:"2rem"},marginTop:{lg:"1rem",md:"1rem",sm:"1rem",xs:"1rem"}}}>
                                <Typography sx={{marginTop:"0.6em",color:"gray",fontWeight:"100",fontSize:{lg:"14px",md:"11px",sm:"9px",xs:"11px"}}}>
                                    You not a member?
                                </Typography>
                                <Link to={`/signup`} style={{textDecoration:"none"}}>
                                    <Typography sx={{marginTop:"0.6em",marginLeft:"0.5em",color:"black",fontWeight:"bold",fontSize:{lg:"14px",md:"11px",sm:"9px",xs:"11px"}}}>
                                        Sign Up
                                    </Typography>
                                </Link>
                        </Stack>
                        <Stack  sx={{display:"flex",justifyContent:"left",marginLeft:{lg:"6rem",md:"4rem",sm:"2rem",xs:"2rem"},marginTop:{lg:"2rem",md:"2rem",sm:"2rem",xs:"2rem"}}}>
                            <Button
                            onClick={userLogin}
                            sx={{width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"30ch"},background:"#7d56d9",color:"white"}}>
                                Login
                            </Button>
                        </Stack>

                    </Stack>

                </Stack>
            </Grid>
            <Grid item lg={5} md={5} sm={5} sx={{background:"#f3f5f8"}}>
                <Stack direction="column" sx={{marginTop:{lg:"9rem",md:"8rem",sm:"12rem"}}}>
                    <Box sx={{display:"flex",justifyContent:"center",textAlign:"center"}}>
                        <Box sx={{background:"#613db8",height:{lg:"100px",md:"150px",sm:"200px"},width:{lg:"100px",md:"150px",sm:"200px"},borderRadius:"50%"}}>
                        </Box>
                    </Box>
                    <Box sx={{display:{lg:"flex",md:"flex",sm:"none",xs:"none"},justifyContent:"center",textAlign:"center",marginTop:"1em"}}>
                        <Box sx={{background:"#613db8",height:{lg:"100px",md:"150px"},width:{lg:"100px",md:"150px"},borderRadius:"50%"}}>
                        </Box>
                    </Box>
                    <Box sx={{display:{lg:"flex",md:"none",sm:"none",xs:"none"},justifyContent:"center",textAlign:"center",marginTop:"1em"}}>
                        <Box sx={{background:"#613db8",height:"100px",width:"100px",borderRadius:"50%"}}>
                        </Box>
                    </Box>
                </Stack>
            </Grid>

        </Grid>
    </Box>
  )
}

export default Login;