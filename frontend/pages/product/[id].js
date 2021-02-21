import React from 'react'
import SingleProduct from "../../components/SingleProduct"


const SingleProducts = ({query}) => {


    return (
        <SingleProduct id={query.id}></SingleProduct>
    )
}

export default SingleProducts
