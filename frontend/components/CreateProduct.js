import useForm from "../lib/useForm"
import Form from "../components/styles/Form"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import ErrorMessage from "../components/ErrorMessage"
import {ALL_PRODUCTS_QUERY} from "../components/Products"
import Router from "next/router"

const  CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION (
            # which variables are put and what are the types of the variables passed    
        $name:String!
        $description:String!
        $price:Int!
        $image:Upload
    ) {
        createProduct(
            data:{
                name:$name
                description: $description
                price:$price
                status:"AVAILABLE"
                photo:{
                    create:{
                        image:$image,
                        altText:$name
                    }
                }
            }
        ) {
            id
            name
            price
            description
        }
    }
`

const CreateProduct = () => {

    const {inputs ,handleChange,clearForm,resetForm} = useForm({
        image:'',
        name:"Nice fuckka",
        price:42442,
        description:"heyyyyyc gazillion dollars"
    });

    const [createProduct, {loading,error,data}] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables:inputs,
        refetchQueries:[{query:ALL_PRODUCTS_QUERY }]
    })

    return (
        <Form onSubmit={ async (e) => {
            e.preventDefault();
            console.log(inputs)
            //submit things to the backend
           const res = await createProduct()
            clearForm()
            Router.push({
                pathname:`/product/${res.data.createProduct.id}`,
            })

        }}
        >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="image">
                Image
                <input 
                required
                 type="file"
                 id="image" 
                 name="image"
                 placeholder="upload image of the product"
                 onChange={handleChange}
                 
                />
            </label>

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
            <button type="submit">+ Add Products</button>
            </fieldset>
          

        </Form>
    )
}

export default CreateProduct
