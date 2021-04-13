import React, { useState } from 'react';
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";



const JournalContainer = styled.div`
    display: flex;
    flex-direction: column;
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
`
const JournalTitleText = styled.div`
    font-size: 42px;
`

const EntryContent = styled.div`
    padding-top: 50px;
    line-height: 2em;
`

interface JournalEntryObject {
    id: string;
    journalid: string;
    name: string;
    date: string;
    count: number;
    owner: string;
}

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`


const journalEntryItems: JournalEntryObject[] = [
    {
        id: "one",
        journalid: "full",
        name: "Adding Terraform to Your Infrastructure",
        date: "1/4/2021",
        count: 189,
        owner: "Drew Christofferson"
    },
    {
        id: "two",
        journalid: "google",
        name: "Leadership Skills in Tech",
        date: "2/19/2021",
        count: 1109,
        owner: "Drew Christofferson"
    },
    {
        id: "three",
        journalid: "full",
        name: "Why Docker Make Local Development So Easy",
        date: "1/4/2021",
        count: 710,
        owner: "Drew Christofferson"
    },
    {
        id: "four",
        journalid: "full",
        name: "Git Commands to Remember",
        date: "1/4/2021",
        count: 189,
        owner: "Drew Christofferson"
    },
    {
        id: "five",
        journalid: "personal",
        name: "My Company Watchlist 2021",
        date: "2/19/2021",
        count: 1109,
        owner: "Drew Christofferson"
    },
    {
        id: "six",
        journalid: "full",
        name: "On Spring Boot Security",
        date: "1/4/2021",
        count: 710,
        owner: "Drew Christofferson"
    },
    {
        id: "seven",
        journalid: "google",
        name: "Kubernetes vs. ECS",
        date: "1/4/2021",
        count: 189,
        owner: "Drew Christofferson"
    },
    {
        id: "eight",
        journalid: "google",
        name: "Tips for Managing a Team",
        date: "2/19/2021",
        count: 1109,
        owner: "Drew Christofferson"
    },
    {
        id: "nine",
        journalid: "personal",
        name: "Why Keep a Dev Journal?",
        date: "1/4/2021",
        count: 710,
        owner: "Drew Christofferson"
    },

]

const dummyContent: string = "import React, { useState } from \"react\"; \nimport styled from \"styled-components\"; \nimport { useParams } from \"react-router-dom\"; \nimport Editor from \"@monaco-editor/react\"; \n";

function JournalEntry () {
    const { entryid } = useParams<{ entryid: string }>();
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("javascript");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [ isEditView, setIsEditView ] = useState(false);

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    function toggleLanguage() {
        setLanguage(language === "javascript" ? "python" : "javascript");
    }

    const handleEditSubmit = () => {
        setIsEditView(!isEditView)
    }

    return(
        <JournalContainer>
            <JournalHeader>
                <JournalTitleGroup>
                    
                    <JournalTitleText>
                        {
                            journalEntryItems.map(item => {
                                if(item.id === entryid){
                                    return item.name;
                                }
                                else return null;
                            })
                        }
                    </JournalTitleText>
                    
                </JournalTitleGroup>
                
            </JournalHeader>
            {
                isEditView ?
                <div>
                    <Editor
                        height="50vh" // By default, it fully fits with its parent
                        theme={'dark'}
                        language={language}
                        value={dummyContent}
                        // editorDidMount={handleEditorDidMount}
                        loading={"Loading..."}
                    />
                    <button onClick={handleEditSubmit}>Done</button>
                </div>
                
                :
                <EntryContent>
                    <ReactMarkdown>
                        {markdown}
                    </ReactMarkdown>
                </EntryContent>
            }
        </JournalContainer>
    )
}

export default JournalEntry;