import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Searchbar from '../../Components/SearchBar/SearchBar';
import { GrAddCircle } from 'react-icons/gr';
import { useHistory, useParams, Link, useRouteMatch } from "react-router-dom";
// import { contextType } from 'react-commonmark';
import AppContext from '../../context/context';
import axios from 'axios';


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
    id: string;
    name: string;
    date: string;
    update: string;
    count: number;
    owner: string;
}

const journalItems: JournalObject[] = [

]

interface JournalEntryObject {
    record_id: string;
    journal_id: string;
    record_title: string;
    createdAt: string;
    updatedAt: string;
    content: string;
}

const journalColumns: string[] = [
    "Entry Name",
    "Date Created",
    "Last Update"
]

interface MatchParams {
    jid: string,
    eid: string
  };


function Journal () {
    let history = useHistory();
    let match = useRouteMatch<MatchParams>(`/journals/:jid/:eid`);
    const context = useContext(AppContext);
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }
    const { jid } = useParams<{ jid: string }>();

    const handleJournalEntryClick = (id: string) => {
        history.push(`/journals/${jid}/${id}`)
    }

    const handleNewEntryClick = () => {
        history.push("/newentry");
        console.log(context.journal);
    }

    const handleRecordDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this entry? This cannot be undone.")) { //prompt the user and confirm they want to delete the journal entry
            //if yes, delete the entry
            await axios.delete(`${context.API_BASE_URL}/api/v1/record/${id}`, config)
            .then((res) => getRecords());
        }

        // console.log(context.records)
    };

    useEffect(() => {
        getRecords();
    }, context.records)

    const getRecords = async() => {
        await axios.get(`${context.API_BASE_URL}/api/v1/record/journal/` + jid, config)
        .then((response) => {
                context.updateRecords(response.data);
        })
        .catch((e) => e)
    }

    return(
        <JournalContainer>
            <BreadcrumbContainer>
                <Link to="/journals">My Journals</Link> &gt; <Link to={`/journals/${match?.params?.jid}`}>{context.journal?.journal_name}</Link>
            </BreadcrumbContainer>
            <JournalHeader>
                <JournalTitleGroup>
                    <JournalTitleText>
                        {
                            context.journal.journal_name
                        }
                    </JournalTitleText>
                    <AddIcon size={30} onClick={handleNewEntryClick}/>
                </JournalTitleGroup>
                <Searchbar placeholder="Search" />
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
                        context.records.map(item => {
                                return (
                                    <TableRow key={item.record_id}>
                                        <TableItem onClick={() => handleJournalEntryClick(item.record_id)}>{item.record_title}</TableItem>
                                        <TableItem>{new Date(item.createdAt).toLocaleString()}</TableItem>
                                        <TableItem>{new Date(item.updatedAt).toLocaleString()}</TableItem>
                                        <TableItem onClick={() => handleRecordDelete(item.record_id)}>❌</TableItem>
                                    </TableRow>
                                )
                            
                        })
                    }
                </tbody>
            </Table>
        </JournalContainer>
    )
}

export default Journal;