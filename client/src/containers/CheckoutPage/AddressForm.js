import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import {Stack,TextField,FormControl,FormLabel,Radio,RadioGroup,FormControlLabel, Button,Box, Typography} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

//Form schema
const formSchema = Yup.object({
    name: Yup.string().required("name is required"),
    mobileNumber: Yup.string().required("mobile number is required"),
    pinCode : Yup.string().required("pin code is required"),
    locality : Yup.string().required("locality number is required"),
    address : Yup.string().required("address is required"),
    cityDistrictTown : Yup.string().required("place  is required"),
    state : Yup.string().required("state is required"),
  });


const AddressForm = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
      };

console.log("gelen value : ",value);
    
        //formik
    const formik = useFormik({
        initialValues: {
        name: "",
        mobileNumber: "",
        pinCode :"",
        locality:"",
        address: "",
        cityDistrictTown:"",
        state:"",
        addressType:"",
        landmark:"",
        alternatePhone:""
        },
        onSubmit: values => {
        values.addressType = value;
        const payload = {
            address: {
              name:values.name,
              mobileNumber:values.mobileNumber,
              pinCode:values.pinCode,
              locality:values.locality,
              address:values.address,
              cityDistrictTown:values.cityDistrictTown,
              state:values.state,
              landmark:values.landmark,
              alternatePhone:values.alternatePhone,
              addressType:values.addressType,
            },
          };
        dispatch(addAddress(payload));
        },
        validationSchema: formSchema,
    });


  return (
    <Stack direction="column">
        <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" sx={{marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"1em"},marginTop:{lg:"1em",md:"1em",sm:"1em",xs:"1em"}}}>
            <TextField
                label="enter your name"
                size="small"
                id="outlined-start-adornment"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                type="name"
                sx={{ width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"20ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"} }}
                />
                <TextField
                label="enter your mobile number"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange("mobileNumber")}
                onBlur={formik.handleBlur("mobileNumber")}
                type="mobileNumber"
                size="small"
                id="outlined-start-adornment"
                sx={{ width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"20ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"},marginLeft:{lg:"1em",md:"1em",sm:"1em",xs:"1em"} }}
                />
        </Stack>
        <Stack direction="row">
            <Typography sx={{color:"red",marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"1.6rem"},fontSize:{lg:"18px",md:"15px",sm:"14px",xs:"12px"}}}>
                    {formik.touched.name && formik.errors.name}
            </Typography>
            <Typography sx={{color:"red",marginLeft:{lg:"11em",md:"8.6rem",sm:"7rem",xs:"5rem"},fontSize:{lg:"18px",md:"15px",sm:"14px",xs:"12px"}}}>
                    {formik.touched.mobileNumber && formik.errors.mobileNumber}
            </Typography>
        </Stack>
        <Stack direction="row" sx={{marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"1rem"},marginTop:{lg:"1em",md:"1em",sm:"1em",xs:"1em"}}}>
        <TextField
                label="enter pincode"
                size="small"
                id="outlined-start-adornment"
                value={formik.values.pinCode}
                onChange={formik.handleChange("pinCode")}
                onBlur={formik.handleBlur("pinCode")}
                type="pinCode"
                sx={{ width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"20ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"} }}
                />
                <TextField
                label="enter locality"
                size="small"
                id="outlined-start-adornment"
                value={formik.values.locality}
                onChange={formik.handleChange("locality")}
                onBlur={formik.handleBlur("locality")}
                type="locality"
                sx={{ width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"20ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"},marginLeft:{lg:"1em",md:"1em",sm:"1em",xs:"1em"} }}
                />
        </Stack>
        <Stack direction="row">
            <Typography sx={{color:"red",marginLeft:{lg:"2rem",md:"2rem",sm:"2.3em",xs:"1.8em"},fontSize:{lg:"18px",md:"15px",sm:"14px",xs:"12px"}}}>
                    {formik.touched.pinCode && formik.errors.pinCode}
            </Typography>
            <Typography sx={{color:"red",marginLeft:{lg:"12rem",md:"7.3rem",sm:"6rem",xs:"5.2em"},fontSize:{lg:"18px",md:"15px",sm:"14px",xs:"12px"}}}>
                    {formik.touched.locality && formik.errors.locality}
            </Typography>
        </Stack>
        <Stack direction="row" sx={{marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"1rem"},marginTop:{lg:"1em",md:"1em",sm:"1em",xs:"1em"}}}>
        <TextField
                label="enter address"
                size="small"
                id="outlined-start-adornment"
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                onBlur={formik.handleBlur("address")}
                type="address"
                sx={{ width:{lg:"82ch",md:"62ch",sm:"52ch",xs:"42ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"} }}
                />
        </Stack>
        <Stack direction="row">
            <Typography sx={{color:"red",marginLeft:"2rem",fontSize:{lg:"18px",md:"15px",sm:"14px",xs:"12px"}}}>
                    {formik.touched.address && formik.errors.address}
            </Typography>
        </Stack>
        <Stack direction="row" sx={{marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"1rem"},marginTop:{lg:"1em",md:"1em",sm:"1em",xs:"1em"}}}>
        <TextField
                label="enter city/district/town"
                size="small"
                id="outlined-start-adornment"
                value={formik.values.cityDistrictTown}
                onChange={formik.handleChange("cityDistrictTown")}
                onBlur={formik.handleBlur("cityDistrictTown")}
                type="cityDistrictTown"
                sx={{ width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"20ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"} }}
                />
                <TextField
                label="enter state"
                size="small"
                id="outlined-start-adornment"
                value={formik.values.state}
                onChange={formik.handleChange("state")}
                onBlur={formik.handleBlur("state")}
                type="state"
                sx={{ width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"20ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"},marginLeft:{lg:"1em",md:"1em",sm:"1em",xs:"1em"} }}
                />
        </Stack>
        <Stack direction="row">
            <Typography sx={{color:"red",marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"2em"},fontSize:{lg:"18px",md:"15px",sm:"14px",xs:"12px"}}}>
                    {formik.touched.cityDistrictTown && formik.errors.cityDistrictTown}
            </Typography>
            <Typography sx={{color:"red",marginLeft:{lg:"14rem",md:"8.6rem",sm:"7rem",xs:"7em"},fontSize:{lg:"18px",md:"15px",sm:"14px",xs:"12px"}}}>
                    {formik.touched.state && formik.errors.state}
            </Typography>
        </Stack>
        <Stack direction="row" sx={{marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"1em"},marginTop:{lg:"1em",md:"1em",sm:"1em",xs:"1em"}}}>
        <TextField
                label="enter Landmark (Optional)"
                size="small"
                id="outlined-start-adornment"
                value={formik.values.landmark}
                onChange={formik.handleChange("landmark")}
                onBlur={formik.handleBlur("landmark")}
                type="landmark"
                sx={{ width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"20ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"} }}
                />
                <TextField
                label="enter alternate phone (Optional)"
                value={formik.values.alternatePhone}
                onChange={formik.handleChange("alternatePhone")}
                onBlur={formik.handleBlur("alternatePhone")}
                type="alternatePhone"
                size="small"
                id="outlined-start-adornment"
                sx={{ width:{lg:"40ch",md:"30ch",sm:"25ch",xs:"20ch"},marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em",xs:"0.3em"},marginLeft:{lg:"1em",md:"1em",sm:"1em",xs:"1em"} }}
                />
        </Stack>
        <Stack direction="row" sx={{marginLeft:{lg:"2rem",md:"2rem",sm:"2rem",xs:"2rem"},marginTop:{lg:"1em",md:"1em",sm:"1em",xs:"1em"}}}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Address Type</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={value}
                onChange={handleRadioChange}
            >
                <Stack direction="row">
                    <FormControlLabel value="Home" control={<Radio />} label="Home" />
                    <FormControlLabel value="Work" control={<Radio />} label="Work" />
                </Stack>
            </RadioGroup>
        </FormControl>
        </Stack>
        <Box sx={{marginLeft:{lg:"2em",md:"2rem",sm:"2rem",xs:"1rem"},marginTop:{lg:"1em",md:"1em",sm:"1em",xs:"1em"},marginBottom:"3rem"}}>
            <Button type="submit">
                Save
            </Button>
        </Box>
        </form>
    </Stack>
  );
};

export default AddressForm;