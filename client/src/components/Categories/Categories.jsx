import React,{ useEffect } from 'react';
import {
    Box,List,ListItem,Stack, Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions';


function Categories() {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const categories = category.categories;
  
    useEffect(() => {
      dispatch(getAllCategory());
    }, []);

  return (
    <Box sx={{padding:2}}>
        <Typography sx={{fontWeight:"blod",marginLeft:"1.5em",marginTop:"2em"}}>
            Category
        </Typography>
        <Stack direction="column" sx={{marginLeft:"3em"}}>
            {categories?.map((category)=>(
                <List>
                    <ListItem>
                        <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`} style={{textDecoration:"none",color:"black",fontWeight:"100",marginTop:"0.5em"}}>
                            {category.name}
                        </a>
                    </ListItem>
                </List>
            ))}

        </Stack>
    </Box>
  )
}

export default Categories