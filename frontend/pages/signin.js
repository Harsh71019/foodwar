import React from 'react'
import styled from 'styled-components'
import SignIn from "../components/SignIn"
import SignUp from '../components/SignUp'

const GridStyles = styled.div`
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(300px,1fr));
    grid-gap:2rem;
`

const signin = () => {
    return (
        <GridStyles>
            <SignIn />
            <SignUp />
        </GridStyles>
    )
}

export default signin
