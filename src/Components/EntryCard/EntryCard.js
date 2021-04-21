import React from 'react' 
import styled from 'styled-components'; 

const StyledEntryCard = styled.div`
    width: 100%; 
    max-width: 600px; 
    padding: 50px; 
    margin-bottom: 40px; 
    background-color: #ffffff; 
    text-align: center; 
    h2 {
        font-weight: 500; 
        margin-bottom: 50px; 
    }
    span { 
        display: block;
        margin-top: 40px; 
        color: #888888; 
        font-size: 14px;
    }
    a{
        margin-left: 4px; 
        color: #2f8bfd; 
    }
`;

export default function EntryCard({ children }) {
    return(
        <StyledEntryCard>
            {children}
        </StyledEntryCard>
    );
}