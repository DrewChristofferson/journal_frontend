import React from 'react';
import styled from 'styled-components'
import Searchbar from '../../Components/searchbar'
import { GrAddCircle } from 'react-icons/gr';
import { useHistory } from "react-router-dom";


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

const journalColumns: string[] = [
    "Journal Name",
    "Date Created",
    "Last Update",
    "Entry Count",
    "Created By"
]

const journalItems: JournalObject[] = [
    {
        id: "full",
        name: "Full Stack",
        date: "1/4/2021",
        update: "3/16/2021",
        count: 18,
        owner: "Drew Christofferson"
    },
    {
        id: "google",
        name: "Google Work",
        date: "2/19/2021",
        update: "2/19/2021",
        count: 1,
        owner: "Drew Christofferson"
    },
    {
        id: "personal",
        name: "Personal Thoughts",
        date: "1/4/2021",
        update: "3/16/2021",
        count: 10,
        owner: "Drew Christofferson"
    },

]


function JournalsAll () {
    let history = useHistory();

    const handleJournalClick = (id: string) => {
        history.push(`/journals/${id}`)
    }

    const handleNewJournalClick = () => {
        alert("TODO: new journal page")
    }

    return(
        <JournalContainer>
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
                        journalItems.map(item => {
                            return (
                                <TableRow key={item.id} onClick={() => handleJournalClick(item.id)}>
                                    <TableItem>{item.name}</TableItem>
                                    <TableItem>{item.date}</TableItem>
                                    <TableItem>{item.update}</TableItem>
                                    <TableItem>{item.count}</TableItem>
                                    <TableItem>{item.owner}</TableItem>
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