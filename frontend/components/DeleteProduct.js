import React from 'react'
import gql from "graphql-tag"
import { useMutation } from '@apollo/client'

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id:ID!) {
        deleteProduct(id:$id) {
            id 
            name
        }
    }
`

function update(cache,payload) {
    console.log(payload)
    console.log("running update after deleting")
    cache.evict(cache.identify(payload.data.deleteProduct))
}

const DeleteProduct = ({id,children}) => {
    const [deleteProduct, {loading}] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables:{id},
        update:update
    })
    return (
        <button disabled={loading} type="button" onClick={ () => {
            if(confirm("are u sure u wanna delete this item ?")) {
            deleteProduct().catch(err => alert(err.message))
            }}
        }>
            {children}
        </button>
    )
}

export default DeleteProduct
