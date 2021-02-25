import React from 'react'
import Form from "./styles/Form"
import useForm from "../lib/useForm"
import { useMutation } from '@apollo/client'
import gql from "graphql-tag"
import {CURRENT_USER_QUERY} from "./User"
import DisplayError from "./ErrorMessage"


const SIGNUP_MUTATION = gql`
   mutation SIGNUP_MUTATION($email:String!,$name:String!,$password:String!) {
       createUser(data:{
           email:$email,name:$name,password:$password
       }) {
        id
        email
        name
       }
   } 
`

const SignUp = () => {
    const {inputs,handleChange,resetForm} = useForm({
        email:'',
        password:'',
        name:'',
    })

    const [signup, {data,loading,error}] = useMutation(SIGNUP_MUTATION, {
        variables:inputs,
        //refectch the currently logged in user
        // refetchQueries:[{query:CURRENT_USER_QUERY}]
    }) 

    async function handleSubmit(e){
        e.preventDefault();
        console.log(inputs)
        const res =  await signup();
        console.log(res)
        console.log(error)
        resetForm()
    }
    // const error = data?. authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Hey Sign UP To view the good stuff</h2>
            <DisplayError error={error}
            />
            <fieldset>
                {data?.createUser && (<p>Signed Up with {data.createUser.email} - Please headup and signin</p>)}
            <label htmlFor="name">
                    Name
                    <input 
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        autoComplete="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    password
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
              
                <button type="submit">Sign In</button>
            </fieldset>
        </Form>
    )
}

export default SignUp
