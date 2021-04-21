import React, { MouseEvent, useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import Editor from "@monaco-editor/react";
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/context';
import axios from 'axios';
import { Select } from '../../Components/Dropdown/dropdown';
import Button from '../../Components/Button/Button';
import { ButtonsContainer } from '../../Components/Container/container';
import Input from '../../Components/Input/Input';


const NewEntryTitleText = styled.div`
    font-size: 42px;
    padding-bottom: 10px; 
`

const NewEntryForm = styled.form`
    display: flex;
    flex-direction: column;
`
interface JournalObject {
    journal_id: string;
    journal_name: string;
    createdAt: Date;
    updatedAt: Date;
    user_id: string;
}

export default function CreateNewEntry () {
    let history = useHistory();
    const [journals, setJournals] = useState<[JournalObject] | undefined>();
    const [entryTitle, setEntryTitle] = useState<string | undefined>();
    const [entryContent, setEntryContent] = useState<string | undefined>();
    const [showError, setShowError] = useState<Boolean>(false);
    const context = useContext(AppContext);
    const [ jid, setJID ] = useState<string | undefined>();
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };

    useEffect(() => {
        getJournals();
    }, [])

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        let newEntry = {
            journal_id: jid,
            record_title: entryTitle,
            content: entryContent
        };
        // if()
        postEntry(newEntry).then(res => {
            history.push(`/journals/${jid}`)
        });
    };

    function handleEditorChange(value: string | undefined, event: React.FormEvent<HTMLInputElement>) {
        setEntryContent(value)
      }


    const postEntry = async (entry: any) => {
        await axios.post(`${context.API_BASE_URL}/api/v1/record`, entry, config)
    };

    const getJournals = async() => {
        await axios.get(`${context.API_BASE_URL}/api/v1/journal/user`, config)
        .then((response) => {
            setJournals(response.data);
            context.updateJournals(response.data);
        })
        .catch((e) => e)
    };
    
    //create a dropdown of the journals
    let optionItems = journals?.map((item) =>
        <option key={item.journal_id} value={item.journal_id}>{item.journal_name}</option>
    );

    function handleSelect(event: React.ChangeEvent<HTMLSelectElement>){
        let value = event.target.value; 
        if(value.length < 1){
            setShowError(true); 
        }
        else {
            setJID(value);
            setShowError(false); 
        }
        console.log(value)
        console.log(Number(value))
        console.log(showError)

    }

    function handleCancel(e:MouseEvent){
        e.preventDefault();         
        history.push("/journals");
    }

    return(
        <div>
            <NewEntryTitleText>
                Create a New Entry
            </NewEntryTitleText>
            <NewEntryForm>
                <Select onChange={handleSelect}> 
                    <option value="" hidden>Select Journal</option>
                    {optionItems}
                </Select>
                    {
                        showError ?
                        <p style={{color: 'red'}}>Please Select a Journal. If no journals are found, you may need to create a new one.</p>
                        :
                        <></>
                    } 
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
                    language={"markdown"}
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


