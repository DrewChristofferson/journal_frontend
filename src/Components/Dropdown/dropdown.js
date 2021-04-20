import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";
// import ReactSelect from "react-select"; 


export const Select = styled.select`
  border: 3px solid #111111;
  border-radius: 7px;
  height: 40px;
  width: 50%;
  background: white;
  color: black;
  font-size: 18px;
  text-indent: 10px; 
  margin-bottom: 10px; 
  &:focus {
    outline: none;
    border-color: #black;
    box-shadow: 0 0 2px #black;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export default function Dropdown (){
  
  return(
    <Select>
      <option value="">Select Journal</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Select>
    

  )
}

