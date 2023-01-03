import axios from "../helpers/axios"
import { productConstants } from "./constants";
import {baseUrl} from '../baseUrl';


export const getProductsBySlug = (slug) => {
    return async dispatch => {
        console.log("girdi get product by slug");
        const res = await axios.get(`${baseUrl}/products/${slug}`);
        console.log("data res : ",res);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            });
        } else {
            // dispatch({
            //     type: 
            // })
        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            console.log("a");
            const { cid, type } = payload.params;
            const res = await axios.get(`${baseUrl}/page/${cid}/${type}`);
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                });
            }
        } catch(error) {
            console.log(error)
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`${baseUrl}/product/${productId}`);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}

export const getAllProduct = () =>{
    return async dispatch => {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
        let res;
        console.log("girdi");
        try{
            res = await axios.get(`${baseUrl}/products`);
            console.log("all res :",res);
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload:{products :res.data}
            })
        }catch(error){
            console.log(error);
            dispatch({
                type:productConstants.GET_ALL_PRODUCTS_FAILURE,
                payload:{error:res.data.error}
            })
        }

    }
};