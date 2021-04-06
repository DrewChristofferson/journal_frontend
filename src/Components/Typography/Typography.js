import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    font-family: 'Nunito', sans-serif;
`
const H1 = styled.h1`
    font-size: 40px;
`
const H2 = styled.h2`
    font-size: 30px;
`
const H3 = styled.h3`
    font-size: 20px;
`
const H4 = styled.h4`
    font-size: 15px;
`

function Searchbar () {
    
    return(
        <Container>
            <H1>This is my text</H1>
            <H2>This is my text</H2>
            <H3>This is my text</H3>
            <H4>This is my text</H4>
        </Container>
    )
}

export default Searchbar;