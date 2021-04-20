import React from 'react'
import styled from 'styled-components'
import './Button.css'

const ButtonStyle = styled.button`
    border: none;
    padding: 5px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px 15px;
`

function Button (props) {
    const { variant = 'primary', children, ...rest } = props
    return (
        <ButtonStyle className={`button ${variant}`} {...rest}>
            {children}
        </ButtonStyle>
    )
}

export default Button