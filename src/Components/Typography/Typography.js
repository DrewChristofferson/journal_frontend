import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    font-family: 'Nunito', sans-serif;
`
export const H1 = styled.div`
    font-size: 42px;
`
export const H2 = styled.h2`
    font-size: 30px;
`
export const H3 = styled.h3`
    font-size: 20px;
`
export const H4 = styled.h4`
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