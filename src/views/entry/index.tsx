import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { HtmlRenderer, Parser } from 'commonmark';
import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Button from '../../Components/Button/Button';
import AppContext from '../../context/context';
import axios from 'axios';

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

interface Context {
    journalEntryItems: JournalEntryObject;
    journals: JournalObject;
};

interface JournalEntryObject {
    record_id: string;
    journal_id: string;
    record_title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

interface JournalObject {
    id: string;
    name: string;
    date: string;
    update: string;
    count: number;
    owner: string;
};

interface MatchParams {
    jid: string,
    eid: string
  };

const markdown: string = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

const journalEntryItems: JournalEntryObject[] = [];
const oneRecord = {
        record_id: "",
        journal_id: "",
        record_title: "",
        createdAt: "",
        updatedAt: "",
        content: ""
}

function JournalEntry () {
    const { entryid } = useParams<{ entryid: string }>();
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("markdown");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [isEditView, setIsEditView] = useState(false);
    const [displayText, setDisplayText] = useState<string>('')
    const [markdownContent, setMarkdownContent] = useState<string | undefined>(markdown);
    const context = useContext(AppContext); 
    let history = useHistory(); 
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   "Content-Type": "text/plain"
        }
    };
    // const { journalEntryItems, journals } = React.useContext(AppContext) as ContextType
    let match = useRouteMatch<MatchParams>(`/journals/:jid/:eid`);
    let parser = new Parser()
    let renderer = new HtmlRenderer()
    let markdownDisplay = renderer.render(parser.parse(markdown))
    

    useEffect(() => {
        let temp: string = markdown ? markdown : '';
        let markdownDisplay: any = renderer.render(parser.parse(temp));
        setDisplayText(markdownDisplay);
        getJournalEntry();
    }, [])

    const getJournalEntry = () => {
        context.records.forEach(record => {
            if (entryid === record.record_id){
                context.updateRecord(record);
                setDisplayText(context.record.content)
                console.log(record);
            }
        }) 
    }

    // Monaco editor functions start//
    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    let newContent:string;

    function handleEditorChange(value: string | undefined, event: React.FormEvent<HTMLInputElement>) {
        setMarkdownContent(value)
        // newContent = String(value); 
      }

    const handleEditSubmit = () => {
        // debugger; 
        let temp: string = markdownContent ? markdownContent : '';
        let markdownDisplay: any = renderer.render(parser.parse(temp));
        setDisplayText(markdownDisplay);
        // debugger; 
        setIsEditView(!isEditView);
        let updatedEntry = { //including all the items in the JournalObject so that I could use the updateRecord context function. Didn't work though.. 
            record_id:context.record.record_id,
            record_title:context.record.record_title,
            journal_id:context.record.journal_id,
            createdAt:context.record.createdAt,
            updatedAt:context.record.updatedAt,
            content:temp
        }
        // debugger; 
        putEntry(updatedEntry)
            // .then(res => getJournalEntry())
            // .then(res => getRecords());
        context.updateRecord(updatedEntry);
        // setMarkdownContent(updatedEntry.content); //need to update the markdown content somehow.. 
        // getJournalEntry(); //adding this totally messes up the record updates... 
        handleEditToggle();
    };

    const putEntry = async (entry: any) => {
        await axios.put(`${context.API_BASE_URL}/api/v1/record/${context.record.record_id}`, 
            entry, 
            config)
    };
    // Monaco editor functions end//

    const handleEditToggle = () => {
        setIsEditView(!isEditView);
    }

    const getRecords = async() => {
        await axios.get(`${context.API_BASE_URL}/api/v1/record/${context.record.record_id}`, config)
        .then((response) => {
                context.updateRecords(response.data);
        })
        .catch((e) => e)
        // debugger; 
    }

    return(
        <JournalContainer>
            <BreadcrumbContainer>
                <Link to="/journals">My Journals</Link> &gt; <Link to={`/journals/${match?.params?.jid}`}>{context.journal?.journal_name}</Link> &gt; <Link to={`/journals/${match?.params?.jid}/${match?.params?.eid}`}>{context.record?.record_title}</Link>
            </BreadcrumbContainer>

            <JournalHeader>
                <JournalTitleGroup>
                    
                    <JournalTitleText>
                        {
                            context.record.record_title
                        }
                    </JournalTitleText>
                    <ButtonContainer>
                        <Button onClick={handleEditToggle}>Edit</Button>
                    </ButtonContainer> 
                </JournalTitleGroup>
                
            </JournalHeader>
            {
                isEditView ?
                <div> 
                    <Editor
                        height="50vh" // By default, it fully fits with its parent
                        theme={'dark'}
                        language={language}
                        value= {displayText}
                        // editorDidMount={handleEditorDidMount}
                        loading={"Loading..."}
                        onChange={handleEditorChange}
                    />
                    {/* <button onClick={handleEditSubmit}>Done</button> */}
                    <Button onClick={handleEditSubmit}>Done</Button>
                </div>
                
                : /*** if false (not the editor view) ***/ 
                // <ReactMarkdown source={markdownContent}/>
                <EntryContent>
                    <div dangerouslySetInnerHTML={ {__html: displayText} } />  {/* normally this used displayText, but displayText doesn't update immediately?  */}
                </EntryContent>
            }
        </JournalContainer>
    )
}

export default JournalEntry;