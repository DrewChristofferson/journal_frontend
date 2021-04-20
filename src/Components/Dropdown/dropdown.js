import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";
export const Select = styled.select`
  border: 2px solid #dadada;
  border-radius: 7px;
  height: 30px;
  width: 50%;
  background: white;
  color: gray;
  font-size: 14px;
  margin-left: 10px;
  text-indent: 10px; 
  &:focus {
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 2px #9ecaed;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

