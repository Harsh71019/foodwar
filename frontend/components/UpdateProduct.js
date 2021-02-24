import React from 'react'
import gql from "graphql-tag"
import { useMutation, useQuery } from '@apollo/client';
import Form from "../components/styles/Form"
import ErrorMessage from "../components/ErrorMessage"
import useForm from "../lib/useForm"


const SINGLE_PRODUCT_QUERY= gql`
    query SINGLE_PRODUCT_QUERY($id:ID!) {
        Product(where:{id:$id}) {
            id 
            name
            description
            price
        }
    }
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION (
        $id:ID!
        $name:String
        $description:String
        $price:Int
    ) {
        updateProduct (
            id:$id,
            data:{name:$name,description:$description,price:$price }
        ) {
            id
            name
            description
            price
        }
    }
`
    

const UpdateProduct = ({id}) => {
    
    const {data, error,loading} = useQuery(SINGLE_PRODUCT_QUERY, {
        variables : {id},
    })


    const [updateProduct,{data:updateData,error:updateError,loading:updateLoading},] = useMutation(UPDATE_PRODUCT_MUTATION)

    const {inputs ,handleChange,clearForm,resetForm} = useForm(data?.Product);

    if(loading) return <p>..Loading</p>

    return (
        <Form onSubmit={ async (e) => {
            e.preventDefault();
            const res = await updateProduct({
                variables:{
                    id,
                    name:inputs.name,
                    description:inputs.description,
                    price:inputs.price,   
                }
            })
            console.log(res)
        //     console.log(inputs)
        //     //submit things to the backend
        //    const res = await createProduct()
        //     clearForm()
        //     Router.push({
        //         pathname:`/product/${res.data.createProduct.id}`,
        //     })

        }}
        >
            <ErrorMessage error={error || updateError} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>

            <label htmlFor="name">
                Name
                <input 
                 value={inputs.name} 
                 type="text"
                 id="name" 
                 name="name"
                 placeholder="Name of the product"
                 onChange={handleChange}
                 
                />
            </label>

            <label htmlFor="price">
                Price
                <input 
                 value={inputs.price} 
                 type="number"
                 id="price" 
                 name="price" 
                 placeholder="Price of the product"
                 onChange={handleChange}
                 
                />
            </label>
            <label htmlFor="description">
            Description
                <textarea 
                 id="description" 
                 name="description" 
                 placeholder="description of the product"
                 onChange={handleChange}
                 value={inputs.description} 

                />
            </label>
            <button type="submit">+ Update Products</button>
            </fieldset>
          

        </Form>
    )
    }
export default UpdateProduct
