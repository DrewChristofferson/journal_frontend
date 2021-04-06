import React from 'react';
import styled from 'styled-components'
import './SearchBar.css'

// const SearchForm = styled.form`
//     height: 40px;
//     width: 50%;
//     padding-bottom: 3px;
// `

const Input = styled.input`
    border: 2px solid #dadada;
    border-radius: 7px;
    height: 70%;
    width: 50%;
    text-indent: 10px;
    &:focus {
        outline: none;
        border-color: #9ecaed;
        box-shadow: 0 0 2px #9ecaed;
`;

function Searchbar (props) {
    const { size = 'medium', ...rest } = props
    return(
        <Input type="text" className={size} {...rest}/>
    )
}

export default Searchbar;