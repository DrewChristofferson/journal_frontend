import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components'
import Searchbar from '../../Components/searchbar'
import { GrAddCircle } from 'react-icons/gr';
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import axios from 'axios';
import AppContext from '../../context/context';

const JournalContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const BreadcrumbContainer = styled.div`
    padding-bottom: 20px;
    font-size: 12px;
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
const AddIcon = styled(GrAddCircle)`
    padding-bottom: 15px;
    padding-left: 25px;
    cursor: pointer;
`
const Table = styled.table`
    color: black;
    width: 100%;
    border-collapse: collapse;
`
const TableRowHeading = styled.tr`
    text-align: left;
    line-height: 50px;
`
const TableRow = styled.tr`
    text-align: left;
    line-height: 50px;
    &:hover {
        cursor: pointer;
        background-color: #e5f2ff;
    }
`
const TableHeader = styled.th`
    text-align: left;
    padding-left: 10px;
`
const TableItem = styled.td`
    text-align: left;
    padding-left: 10px;
`

interface JournalObject {
    journal_id: string;
    journal_name: string;
    createdAt: Date;
    updatedAt: Date;
    user_id: string;
}

interface MatchParams {
    jid: string,
    eid: string
  };

const journalColumns: string[] = [
    "Journal Name",
    "Date Created",
    "Last Update",
    // "Created By"
]

function JournalsAll () {
    let history = useHistory();
    let match = useRouteMatch<MatchParams>(`/journals/:jid/:eid`);
    const context = useContext(AppContext);
    const [journals, setJournals] = useState<[JournalObject] | undefined>();
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        getJournals();
    }, [context.journals])

    const handleJournalClick = (id: string) => {
        history.push(`/journals/${id}`)
        let journal = context.journals.filter(j => j.journal_id === id)[0];
        context.updateJournal(journal);
    }

    const handleNewJournalClick = () => {
        let name: string = "";
        let names: string[] = context.journals.flatMap(j => j.journal_name);
        while (name === "" || names.includes(name)) {
            name = String(window.prompt("Journal name must be unique and nonempty!"));
        }
        let newJournal = {
            journal_name: name
        };
        if (name.length > 0 && name !== 'null') {
            postJournal(newJournal).then((res) => getJournals())
        }
    };

    const handleJournalDelete = async (id: string) => { 
        if (window.confirm("Are you sure you want to delete this journal? This cannot be undone.")) { //confirm the deletion of the journal
            //if yes, delete the journal
            await axios.delete(`${context.API_BASE_URL}/api/v1/journal/${id}`, config)
        }
        getJournals();
    };

    const handleJournalEdit = async (id: string, name: string) => {
        // const currentInnerHtml = document.getElementById("journalName")?.innerHTML;
        // let html = `<input type={"text"} placeholder={"${name}"}/><button>Save</button><button>Cancel</button>`;
        // document.getElementById("journalName").innerHTML : = html;
    };

    const postJournal = async (journal: any) => {
        await axios.post(`${context.API_BASE_URL}/api/v1/journal`, journal, config)
    };

    const getJournals = async() => {
        await axios.get(`${context.API_BASE_URL}/api/v1/journal/user`, config)
        .then((response) => {
            setJournals(response.data);
            context.updateJournals(response.data);
        })
        .catch((e) => e)
    };


    return(
        <JournalContainer>
            <BreadcrumbContainer>
                <Link to="/journals">My Journals</Link> 
            </BreadcrumbContainer>
            <JournalHeader>
                <JournalTitleGroup>
                    <JournalTitleText>
                        My Journals
                    </JournalTitleText>
                    <AddIcon size={30} onClick={handleNewJournalClick}/>
                </JournalTitleGroup>
                <Searchbar />
            </JournalHeader>
            <Table>
                <thead>
                    <TableRowHeading>
                        {
                            journalColumns.map(heading => {
                                return (
                                    <TableHeader key={heading}>{heading}</TableHeader>
                                )
                            })
                        }
                    </TableRowHeading>
                </thead>
                <tbody>
                    {
                        journals?.map(item => {
                            return (
                                <TableRow key={item.journal_id} >
                                    <TableItem onClick={() => handleJournalClick(item.journal_id)}>{item.journal_name}</TableItem>
                                    <TableItem>{new Date(item.createdAt).toLocaleString()}</TableItem>
                                    <TableItem>{new Date(item.updatedAt).toLocaleString()}</TableItem>
                                    <TableItem onClick={() => handleJournalEdit(item.journal_id, item.journal_name)}>✎</TableItem>
                                    <TableItem onClick={() => handleJournalDelete(item.journal_id)}>❌</TableItem>
                                </TableRow>
                            )
                        })
                    }
                </tbody>
            </Table>
        </JournalContainer>
    )
}

export default JournalsAll;