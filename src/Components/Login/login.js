import styled from 'styled-components'; 
import { Link } from 'react-router-dom'; 

export const EntryPage = styled.div`
    display: flex; 
    align-items: center; 
    flex-direction: row; 
    min-height: 100vh;
    background-color: #ffffff; 
    justify-content: center;
    width: 80%;
`;

export const PageHeader = styled(Link)`
    font-size: 2rem; 
    font-weight: 600; 
    margin: 40px 0; 
    color: inherit;
`
