import React from 'react'
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories";
import {Box} from '@mui/material';

function ProductListPage(props) {
    const renderProduct = () => {
        console.log(props);
        const params = getParams(props.location.search);
        let content = null;
        switch (params.type) {
          default:
            content = <ClothingAndAccessories {...props} />;
        }
    
        return content;
      };
  return (
    <Box>
        {renderProduct()}
    </Box>
  )
}

export default ProductListPage;