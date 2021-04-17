import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Searchbar from '../../Components/SearchBar/SearchBar';
import { GrAddCircle } from 'react-icons/gr';
import { useHistory, useParams } from "react-router-dom";
// import { contextType } from 'react-commonmark';
import AppContext from '../../context/context';
import axios from 'axios';


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

const journalEntryItems: JournalEntryObject[] = [
    // {
    //     id: "one",
    //     journalid: "full",
    //     name: "Adding Terraform to Your Infrastructure",
    //     date: "1/4/2021",
    //     count: 189,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "two",
    //     journalid: "google",
    //     name: "Leadership Skills in Tech",
    //     date: "2/19/2021",
    //     count: 1109,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "three",
    //     journalid: "full",
    //     name: "Why Docker Make Local Development So Easy",
    //     date: "1/4/2021",
    //     count: 710,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "four",
    //     journalid: "full",
    //     name: "Git Commands to Remember",
    //     date: "1/4/2021",
    //     count: 189,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "five",
    //     journalid: "personal",
    //     name: "My Company Watchlist 2021",
    //     date: "2/19/2021",
    //     count: 1109,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "six",
    //     journalid: "full",
    //     name: "On Spring Boot Security",
    //     date: "1/4/2021",
    //     count: 710,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "seven",
    //     journalid: "google",
    //     name: "Kubernetes vs. ECS",
    //     date: "1/4/2021",
    //     count: 189,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "eight",
    //     journalid: "google",
    //     name: "Tips for Managing a Team",
    //     date: "2/19/2021",
    //     count: 1109,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "nine",
    //     journalid: "personal",
    //     name: "Why Keep a Dev Journal?",
    //     date: "1/4/2021",
    //     count: 710,
    //     owner: "Drew Christofferson"
    // },

]

function Journal () {
    let history = useHistory();
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
        history.push("/newentry")
    }

    const handleRecordDelete = async (id: string) => {
        await axios.delete(`${context.API_BASE_URL}/api/v1/record/${id}`, config)
        .then((res) => getRecords());
        console.log(context.records)
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