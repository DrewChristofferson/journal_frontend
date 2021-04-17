import React, { MouseEvent, useContext, useState } from 'react'
import styled from 'styled-components'
import Editor from "@monaco-editor/react";
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../../context/context';
import axios from 'axios';

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
    let history = useHistory();
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("markdown");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const context = useContext(AppContext);
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };

    const handleEditorChange = (value: any, event: MouseEvent) => {
        content = value;
    };

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        let newEntry = {
            journal_id: context.journal.journal_id,
            record_title: title,
            content: content
        };
        postEntry(newEntry).then(res => history.push(`/journals/${context.journal.journal_id}`));
    };

    const postEntry = async (entry: any) => {
        await axios.post(`${context.API_BASE_URL}/api/v1/record`, entry, config)
    } ;

    let content: string;
    let initialValue: string = "";
    let title = document.getElementById("title")?.nodeValue;
    return(
        <div>
            <NewEntryTitleText>
                Create a New Entry
            </NewEntryTitleText>
            <NewEntryForm>
            {/* <br />
                <Label>
                    Entry Title
                </Label> */}
                <br />
                <Input type="textarea" id="title" placeholder="Title" onKeyUp={e => {
                        let el: any = e.target;
                        title = el.value;
                    }
                } />
                <br /><br />
                {/* <Content  placeholder="Write your content here..."/> */}
                 
                <Editor
                    height="50vh"
                    width="50vw" // By default, it fully fits with its parent
                    theme={'dark'}
                    language={language}
                    value={initialValue}
                    // editorDidMount={handleEditorDidMount}
                    loading={"Loading..."}
                    onChange={handleEditorChange}
                />
                <Submit onClick={handleSubmit}>
                    Submit
                </Submit>
            </NewEntryForm>
        </div>
    )
}

export default NewEntry;