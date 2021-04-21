import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { HtmlRenderer, Parser } from 'commonmark';
import { useParams, Link, useRouteMatch } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Button from '../../Components/Button/Button';
import AppContext from '../../context/context';
import axios from 'axios';
// import CircularProgress from '@material-ui/core/CircularProgress';


const BreadcrumbContainer = styled.div`
    padding-bottom: 20px;
    font-size: 12px;
`
const JournalContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 80px;
`
const JournalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 50px;
`
const JournalTitleGroup = styled.div`
    display: flex;
    justify-content: left;
    align-items: flex-end;
    width: 100%
`
const ButtonContainer = styled.div`
    flex-basis: 30%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`
const JournalTitleText = styled.div`
    font-size: 28px;
    flex-basis: 70%;
`
const EntryContent = styled.div`
    line-height: 2em;
`
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`
// const LoadingContainer = styled.div`
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `

interface JournalEntryObject {
    record_id: string;
    journal_id: string;
    record_title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

interface JournalObject {
    journal_id: string;
    user_id: string;
    journal_name: string;
    createdAt: number;
    updatedAt: number;
};

interface MatchParams {
    jid: string,
    eid: string
  };

function JournalEntry () {
    const [entry, setEntry] = useState<JournalEntryObject | undefined>();
    const [journal, setJournal] = useState<JournalObject>();
    const [isEditView, setIsEditView] = useState(false);
    const [displayText, setDisplayText] = useState<string>('')
    const [markdownContent, setMarkdownContent] = useState<string | undefined>();
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    const context = useContext(AppContext); 
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };
    let match = useRouteMatch<MatchParams>(`/journals/:jid/:eid`);
    const { jid } = useParams<{ jid: string }>();
    let parser = new Parser()
    let renderer = new HtmlRenderer()

    useEffect(() => {
        getEntry();
        getJournal();
    }, [])

    const getEntry = async() => {
        await axios.get(`${context.API_BASE_URL}/api/v1/record/${match?.params.eid}`, config)
        .then((response) => {
            console.log(response.data);
            setEntry(response.data);
            setMarkdownContent(response.data.content);
            let markdownDisplay: any = renderer.render(parser.parse(response.data.content));
            setDisplayText(markdownDisplay);
            context.updateRecords(response.data);
        })
        .catch((e) => console.log(e));
    }

    const getJournal = async() => {
        await axios.get(`${context.API_BASE_URL}/api/v1/journal/user`, config)
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].journal_id, jid)
                if (response.data[i].journal_id === jid){
                    setJournal(response.data[i]);
                }
            }
            // setIsLoading(false)
        })
        .catch((e) => e)
    }

    function handleEditorChange(value: string | undefined, event: React.FormEvent<HTMLInputElement>) {
        setMarkdownContent(value)
      }

    const handleEditSubmit = () => {
        let currentContent: string = markdownContent ? markdownContent : '';
        let markdownDisplay: any = renderer.render(parser.parse(currentContent));
        setDisplayText(markdownDisplay);
        setIsEditView(!isEditView);
        let updatedEntry = { 
            record_id: match?.params.eid,
            journal_id: match?.params.jid,
            record_title: entry?.record_title,
            content: currentContent
        }
        putEntry(updatedEntry)
    };

    const putEntry = async (newEntry: any) => {
        await axios.put(`${context.API_BASE_URL}/api/v1/record/${match?.params.eid}`, 
            newEntry, 
            config)
    };

    const handleEditToggle = () => {
        setIsEditView(!isEditView);
    }

    // if (isLoading) {
    //     return(
    //         <LoadingContainer>
    //             <CircularProgress/>
    //         </LoadingContainer>
    //     )
    // } else {
        return(
            <JournalContainer>
                <BreadcrumbContainer>
                    <Link to="/journals">My Journals</Link> &gt; <Link to={`/journals/${match?.params?.jid}`}>{journal?.journal_name}</Link> &gt; <Link to={`/journals/${match?.params?.jid}/${match?.params?.eid}`}>{entry?.record_title}</Link>
                </BreadcrumbContainer>
    
                <JournalHeader>
                    <JournalTitleGroup>
                        
                        <JournalTitleText>
                            {
                                entry?.record_title
                            }
                        </JournalTitleText>
                        <ButtonContainer>
                            {
                                isEditView ?
                                <></>
                                :
                                <Button onClick={handleEditToggle}>Edit</Button>
                            } 
                        </ButtonContainer> 
                    </JournalTitleGroup>
                    
                </JournalHeader>
                {
                    isEditView ?
                    <div> 
                        <Editor
                            height="50vh" // By default, it fully fits with its parent
                            theme={'dark'}
                            language={"markdown"}
                            value= {markdownContent}
                            loading={"Loading..."}
                            onChange={handleEditorChange}
                        />
                        <ButtonsContainer>
                            <Button onClick={() => setIsEditView(false)} variant='secondary'>Cancel</Button>
                            <Button onClick={handleEditSubmit}>Done</Button>
                        </ButtonsContainer>
                        
                    </div>
                    
                    : /*** if false (not the editor view) ***/ 
                    <EntryContent>
                        <div dangerouslySetInnerHTML={ {__html: displayText} } />
                    </EntryContent>
                }
            </JournalContainer>
        )
    // }
    
}

export default JournalEntry;