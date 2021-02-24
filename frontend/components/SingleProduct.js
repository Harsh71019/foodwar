import React from 'react'
import gql from "graphql-tag"
import {useQuery} from "@apollo/client"
import DisplayError from "./ErrorMessage"
import Head from "next/head"
import styled from 'styled-components'


const ProductStyles = styled.div`
    display:grid;
    grid-auto-columns:1fr;
    grid-auto-flow:column;
    min-height:800px;
    max-width:var(--maxWidth);
    justify-content:center;
    align-items:top;
    gap:2rem;
    img {
        width:100%;
        object-fit:contain;

    }
0
`


const SINGLE_ITEM_QUERYS = gql`
    query SINGLE_ITEM_QUERY($id:ID!) {
        Product (where : {id : $id }) {
            name 
            price 
            description
            id
            photo {
                altText
                image {
                    publicUrlTransformed
                    
                }
            }
        }
    }
`


const SingleProduct = ({id}) => {
    console.log(id)
    const {data , loading, error} = useQuery(SINGLE_ITEM_QUERYS,{
        variables:{
        id,
    },
});
    console.log({data,loading,error})
    if(loading) return <p>Loading...</p>
    if(error) return <DisplayError error={error}/>
    const {Product} = data
    return (
        <ProductStyles>
            <Head>
                <title>FoodCorner | {Product.name}</title>
            </Head>
            <img src={Product.photo.image.publicUrlTransformed} alt={Product.photo.altText}/>
            <div className="details"> 
            <h2>{Product.name}</h2> 
            <p>{Product.description}</p>
            </div>
        </ProductStyles>
    )
}

export default SingleProduct
