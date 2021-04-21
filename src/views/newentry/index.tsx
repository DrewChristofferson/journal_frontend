import React, { MouseEvent, useContext, useState } from 'react'
import styled from 'styled-components'
import Editor from "@monaco-editor/react";
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../../context/context';
import axios from 'axios';
import Button from '../../Components/Button/Button';
import { ButtonsContainer } from '../../Components/Container/container';
import Input from '../../Components/Input/Input'

const NewEntryTitleText = styled.div`
    font-size: 42px;
    padding-bottom: 25px; 
    border-bottom-color: black; 
    border-bottom-width: 4px; 
`

const NewEntryForm = styled.form`
    display: flex;
    flex-direction: column;
`

function NewEntry () {
    let history = useHistory();
    const [entryTitle, setEntryTitle] = useState<string | undefined>();
    const [entryContent, setEntryContent] = useState<string | undefined>();
    const context = useContext(AppContext);
    const { jid } = useParams<{ jid: string }>();
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };


    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        let newEntry = {
            journal_id: jid,
            record_title: entryTitle,
            content: entryContent
        };
        if(!entryTitle || !entryContent){
            alert("please enter a title and entry content")
        } else {
            postEntry(newEntry).then(res => {
                history.push(`/journals/${jid}`)
            });
        }
    };

    function handleEditorChange(value: string | undefined, event: React.FormEvent<HTMLInputElement>) {
        setEntryContent(value)
      }


    const postEntry = async (entry: any) => {
        await axios.post(`${context.API_BASE_URL}/api/v1/record`, entry, config)
    };

    function handleCancel(e:MouseEvent){
        e.preventDefault();         
        history.push("/journals");
    }

    return(
        <div>
            <NewEntryTitleText data-testid="title">
                Create a New Entry
            </NewEntryTitleText>
            <NewEntryForm>
                <Input 
                    type="textarea" 
                    id="title" 
                    placeholder="Title" 
                    value={entryTitle} 
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setEntryTitle(e.currentTarget.value)}
                />
                <Editor
                    height="50vh"
                    width="50vw" // By default, it fully fits with its parent
                    theme={'dark'}
                    language="markdown"
                    value={entryContent}
                    loading={"Loading..."}
                    onChange={handleEditorChange}
                />
                <ButtonsContainer>
                    <Button onClick={handleCancel} variant='secondary'>Cancel</Button>
                    <Button onClick={handleSubmit}>Done</Button>
                </ButtonsContainer>
            </NewEntryForm>
        </div>
    )
}

export default NewEntry;