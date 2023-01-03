import React,{useState,useEffect} from 'react';
import {
    Box,Grid, MenuItem,Stack
} from '@mui/material';
import Header from '../Header/header';
import Categories from '../Categories/Categories';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import {Drawer} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions';


function Layout() {
    const theme = useTheme();
    const [drawer,setDrawer] = useState(false);

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const categories = category.categories;
  
    useEffect(() => {
      dispatch(getAllCategory());
    }, []);

  return (
   <Box>
      <Header />
      <Box sx={{display:{lg:"none",md:"none",sm:"flex",xs:"flex"},justifyContent:"center"}}>
        <MenuIcon sx={{color:"black",marginTop:"1em"}} onClick={()=>{setDrawer(true)}} />
      </Box>
      {drawer ?(
         <Drawer anchor='top' open={true} sx={{marginTop:"display",justifyContent:"center"}}>
            <Stack direction="column" sx={{display:"flex",justifyContent:"center"}}>
                    <MenuItem sx={{display:"flex",justifyContent:"center",fontWeight:"bold"}}>
                            Category
                    </MenuItem>
                    {categories?.map((category)=>(
                     <MenuItem sx={{display:"flex",justifyContent:"center"}}>
                        <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`} style={{textDecoration:"none",color:"black",fontWeight:"100",marginTop:"0.5em"}}>
                            {category.name}
                        </a>
                    </MenuItem> 
                    ))}
                    <MenuItem sx={{display:"flex",justifyContent:"center",marginTop:"1em"}}>
                         <MenuIcon sx={{color:"black"}} onClick={()=>{setDrawer(false)}} />
                    </MenuItem>
            </Stack>
         </Drawer>
      ):null}
   </Box>
  )
}

export default Layout