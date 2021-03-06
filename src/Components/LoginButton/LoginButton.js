import React from 'react' 
import styled from 'styled-components'; 

const LoginButtonStyle = styled.button`
    width: ${props => props.full ? '100%' : null}; 
    min-width: 64px; 
    border: 0; 
    align-items: center;
    border-radius: 4px; 
    padding: 8px 16px; 
    outline: none; 
    background-color: #111111; 
    color: #ffffff; 
    font-size: 0.875rem; 
    font-weight: 500; 
    line-height: 1.5;
    letter-spacing: 0.02857rem; 
    cursor: pointer; 
    transition: all 0.2s; 
    &:hover { background-color: #ffffff;
                color: #111111;
                border: 2px solid #111111; 
            }
`;

export default function LoginButton({ children, ...props }) {
    return(
        <LoginButtonStyle {...props}>
            {children}
        </LoginButtonStyle>
    );
}


