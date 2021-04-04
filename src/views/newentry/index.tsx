import React, { MouseEvent, useState } from 'react'
import styled from 'styled-components'
import Editor from "@monaco-editor/react";
import { useParams } from 'react-router-dom';

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
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("javascript");
    const [isEditorReady, setIsEditorReady] = useState(false);

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    function toggleLanguage() {
        setLanguage(language === "javascript" ? "python" : "javascript");
    }
    
    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        alert("entry created");
    }

    let newValue: string = "console.log('Hello World!'); \nconsole.log('We are killing it');"
    
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
                <br />
                {/* <Content  placeholder="Write your content here..."/> */}
                {/* <Submit onClick={handleSubmit}>
                    Submit
                </Submit> */}
                <Editor
                    height="50vh"
                    width="50vw" // By default, it fully fits with its parent
                    theme={'dark'}
                    language={language}
                    value={newValue}
                    // editorDidMount={handleEditorDidMount}
                    loading={"Loading..."}
                />
            </NewEntryForm>
        </div>
    )
}

export default NewEntry;