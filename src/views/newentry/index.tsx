import React, { MouseEvent } from 'react'
import styled from 'styled-components'

const NewEntryTitleText = styled.div`
    font-size: 42px;
`

const NewEntryForm = styled.form`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-size: p
`

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

const Content = styled.textarea`
    border: 2px solid #dadada;
    border-radius: 7px;
    height: 400px;
    width: 80%;
    text-indent: 10px;
    &:focus {
        outline: none;
        border-color: #9ecaed;
        box-shadow: 0 0 2px #9ecaed;
`;

const Submit = styled.button`
    border: 2px solid #dadada;
    border-radius: 7px;
    height: 30px;
    width: 100px;
    &:hover {
        background-color: blue;
        color: white;
        border: 2px solid blue;
        cursor: pointer;

`;

function NewEntry () {

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        alert("entry created");
    }
    return(
        <div>
            <NewEntryTitleText>
                Create a New Entry
            </NewEntryTitleText>
            <NewEntryForm>
                <Label>
                    Entry Title
                </Label>
                <Input type="text" id="title" placeholder="Title" />
                <Content  placeholder="Write your content here..."/>
                <Submit onClick={handleSubmit}>
                    Submit
                </Submit>
            </NewEntryForm>
        </div>
    )
}

export default NewEntry;