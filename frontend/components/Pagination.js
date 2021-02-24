import React from 'react'
import Head from "next/head"
import PaginationStyles from "../components/styles/PaginationStyles"
import Link from "next/link"
import { gql } from '@apollo/client/core'
import { useQuery } from '@apollo/client'
import DisplayError from "../components/ErrorMessage"
import {perPage} from "../config"


export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        _allProductsMeta {
            count
        }
    }
`;


const Pagination = ({page}) => {
    const {error, loading, data } = useQuery(PAGINATION_QUERY)
    if(loading) return "...loading.."
    if(error) return <DisplayError error={error}/>
    const {count} = data._allProductsMeta;
    const pageCount = Math.ceil(count/perPage)
    return (
        <PaginationStyles>
            <Head>
                <title>
                    Food Corner || {page} of ...
                </title> 
            </Head>  
            <Link  href={`/products/${page - 1}`}>
              <a aria-disabled={page <= 1}> ← Prev</a> 
            </Link> 
                <p>{page} of {pageCount}</p>
                <p>{count} Items total ___</p>
            <Link href={`/products/${page + 1}`}>
                <a aria-disabled={page >= pageCount}>
                    Next →
                </a>    
            </Link> 
        </PaginationStyles>
    ) 
}

export default Pagination
