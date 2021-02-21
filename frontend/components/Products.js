import React from 'react'
import gql from "graphql-tag"
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Product from "./Product"

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY
{
  allProducts {
    id
    name
    price
    description 
    photo {
      id
      image {
        publicUrlTransformed
      }
    }
  }
}
`

const ProductsListStyles = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr;
    grid-gap:60px

`


const Products = () => {
 const {data,error,loading} =  useQuery(ALL_PRODUCTS_QUERY);
    console.log(data,error,loading)  
    if(loading) return <p>Loadin...</p>;
    if(error) return <p>Error.. {error.message}</p> 

 return (
        <div>
            <ProductsListStyles>
              {  data.allProducts.map(product => 
                    <Product key={product.id} product={product}/>
                )}
            </ProductsListStyles>
        </div>
    )
}

export default Products
