import gql from 'graphql-tag'
import React from 'react'
import UpdateProduct from "../components/UpdateProduct"




const update = ({query}) => {
    return (
        <div>
            <UpdateProduct id={query.id}/>
        </div>
    )
}

export default update
 