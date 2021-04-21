import styled from "styled-components";

const BasicInput = styled.input`
    border: 2px solid #dadada;
    border-radius: 7px;
    height: 30px;
    width: 50%;
    text-indent: 10px;
    margin-bottom: 10px;
    &:focus {
        outline: none;
        border-color: #9ecaed;
        box-shadow: 0 0 2px #9ecaed;
`;

export default function Input({ ...props }) {
    return(
        <BasicInput {...props} />
    );
}