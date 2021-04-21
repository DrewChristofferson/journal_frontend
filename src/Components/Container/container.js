import styled from "styled-components";

export const Container = styled.div`
display: flex;
position: absolute;
height: 100%;
width: 100%;
`

export const FormContainer = styled.div`
flex-basis: 60%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const PromoContainer = styled.div`
flex-basis: 40%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: black;
color: white;
`

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const ButtonContainer = styled.div`
    flex-basis: 30%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`