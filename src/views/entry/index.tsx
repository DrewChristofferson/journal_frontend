import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { HtmlRenderer, Parser } from 'commonmark'
import { useParams, Link, useRouteMatch } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Button from '../../Components/Button/Button'
import AppContext from '../../context/context';

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

}

interface JournalEntryObject {
    id: string;
    journalid: string;
    name: string;
    date: string;
    count: number;
    owner: string;
}

interface JournalObject {
    id: string;
    name: string;
    date: string;
    update: string;
    count: number;
    owner: string;
}

interface MatchParams {
    jid: string,
    eid: string
  }

const markdown: string = `A paragraph with *emphasis* and **strong importance**.

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
    const [language, setLanguage] = useState("markdown");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [ isEditView, setIsEditView ] = useState(false);
    const [ journal, setJournal ] = useState<JournalObject>();
    const [ journalEntry, setJournalEntry ] = useState<JournalEntryObject>();
    const [displayText, setDisplayText] = useState<string>('')
    const [markdownContent, setMarkdownContent] = useState<string | undefined>(markdown);
    const context = useContext(AppContext)
    // const { journalEntryItems, journals } = React.useContext(AppContext) as ContextType
    let match = useRouteMatch<MatchParams>('/journals/:jid/:eid')
    let parser = new Parser()
    let renderer = new HtmlRenderer()
    let markdownDisplay = renderer.render(parser.parse(markdown))

    useEffect(() => {
        let temp: string = markdown ? markdown : '';
        let markdownDisplay: any = renderer.render(parser.parse(temp));
        setDisplayText(markdownDisplay);
        console.log(context)
        getJournalEntry();
    }, [])

    const getJournalEntry = () => {
        context.journalEntryItems.forEach(entry => {
            if (entryid === entry.id){
                setJournalEntry(entry);
                console.log(entry);
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

    function handleEditorChange(value: string | undefined, event: React.FormEvent<HTMLInputElement>) {
        setMarkdownContent(value)
      }

    const handleEditSubmit = () => {
        let temp: string = markdownContent ? markdownContent : '';
        let markdownDisplay: any = renderer.render(parser.parse(temp));
        setDisplayText(markdownDisplay);
        setIsEditView(!isEditView)
    }
    // Monaco editor functions end//

    const handleEditToggle = () => {
        setIsEditView(!isEditView);
    }

    return(
        <JournalContainer>
            <BreadcrumbContainer>
                <Link to="/journals">My Journals</Link> &gt; <Link to={`/journals/${match?.params?.jid}`}>{journalEntry?.journalid}</Link> &gt; <Link to={`/journals/${match?.params?.jid}/${match?.params?.eid}`}>{journalEntry?.id}</Link>
            </BreadcrumbContainer>

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
                        value={markdownContent}
                        // editorDidMount={handleEditorDidMount}
                        loading={"Loading..."}
                        onChange={handleEditorChange}
                    />
                    {/* <button onClick={handleEditSubmit}>Done</button> */}
                    <Button onClick={handleEditSubmit}>Done</Button>
                </div>
                
                :
                <EntryContent>
                    <div dangerouslySetInnerHTML={ {__html: displayText} } />
                </EntryContent>
            }
        </JournalContainer>
    )
}

export default JournalEntry;