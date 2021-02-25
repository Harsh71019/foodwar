import React from 'react'
import Form from "./styles/Form"
import useForm from "../lib/useForm"
import { useMutation } from '@apollo/client'
import gql from "graphql-tag"
import {CURRENT_USER_QUERY} from "./User"
import DisplayError from "./ErrorMessage"


const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION ($email:String!,$password:String!){
        authenticateUserWithPassword(email:$email,password:$password) {
            ... on UserAuthenticationWithPasswordSuccess {
            item{
                id
                email
                name
            }
        }
        ... on UserAuthenticationWithPasswordFailure {
            code
            message
        }
        }
      
    }
`

const SignIn = () => {
    const {inputs,handleChange,resetForm} = useForm({
        email:'',
        password:'',
    })

    const [signin, {data,loading}] = useMutation(SIGNIN_MUTATION, {
        variables:inputs,
        //refectch the currently logged in user
        refetchQueries:[{query:CURRENT_USER_QUERY}]
    })

    async function handleSubmit(e){
        e.preventDefault();
        console.log(inputs)
        const res =  await signin();
        console.log(res)
        resetForm()
    }
    const error = data?. authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Hey Sign in To view the good stuff</h2>
            <DisplayError error={error}
            />
            <fieldset>
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

export default SignIn
