import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router,useHistory, Link } from "react-router-dom";
import axios from 'axios';
import AppContext from '../../context/context';
import CreateModal from '../../Components/Modals/CreateModal'
import DeleteModal from '../../Components/Modals/DeleteModal'
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/LoginInput'
import { EditIcon } from '../../Components/Icons/Icons'

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

const VerticallyAlign = styled.div`
    display: flex;
    align-items: center;
    padding-right: 10px;
`

const EmptyJournalContatiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`
// const LoadingContainer = styled.div`
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `

interface JournalObject {
    journal_id: string;
    journal_name: string;
    createdAt: Date;
    updatedAt: Date;
    user_id: string;
}

const journalColumns: string[] = [
    "Journal Name",
    "Date Created",
    "Last Update",
    // "Created By"
]

function JournalsAll () {
    let history = useHistory();
    const context = useContext(AppContext);
    const [journals, setJournals] = useState<[JournalObject] | undefined>();
    const [isEditing, setIsEditing] = useState<string | undefined>();
    const [isDeletePrompt, setIsDeletePrompt] = useState<string | undefined>();
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    const [journalName, setJournalName] = useState<string | undefined>();
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    useEffect(() => {
        getJournals();
    }, [])
    

    const updateJournalName = async () => {
        await axios.put(
            `${context.API_BASE_URL}/api/v1/journal/${isEditing}`, 
            {"journal_name": journalName}, 
            config
        )
    };

    const handleJournalClick = (id: string) => {
        history.push(`/journals/${id}`)
        let journal = context.journals.filter(j => j.journal_id === id)[0];
        context.updateJournal(journal);
    }

    const handleRecordDelete = async (id: string) => { 
            await axios.delete(`${context.API_BASE_URL}/api/v1/journal/${id}`, config)
        // }
        getJournals();
    };

    const handleJournalEdit = async (id: string, name: string) => {
        setJournalName(name);
        setIsEditing(id);
    };


    const handleJournalEditSubmit = async () => {
        if(journalName !== ''){
            updateJournalName();
            setIsEditing(undefined);
            getJournals();
        }
  
    };

    const getJournals = async() => {
        await axios.get(`${context.API_BASE_URL}/api/v1/journal/user`, config)
        .then((response) => {
            setJournals(response.data);
            context.updateJournals(response.data);
            // setIsLoading(false);
        })
        .catch((e) => e)
    };


    // if (isLoading){
    //     return(
    //         <LoadingContainer>
    //             <CircularProgress/>
    //         </LoadingContainer>
    //     )
    // } else{
        return(
            <Router>
            <JournalContainer>
                <BreadcrumbContainer>
                    <Link to="/journals" data-testid="title">My Journals</Link> 
                </BreadcrumbContainer>
                <JournalHeader>
                    <JournalTitleGroup>
                        <JournalTitleText>
                            My Journals
                        </JournalTitleText>
                        <CreateModal getJournals={getJournals} location='top'/>
                    </JournalTitleGroup>
                    {/* <Searchbar /> */}
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
                    {
                        journals && journals[0] ?
                        <tbody data-testid="journalsTable">
                        {
                            journals?.map(item => {
                                return (
                                    <TableRow key={item.journal_id} >
                                        {
                                            isEditing === item.journal_id ?
                                            <div>
                                                <TableItem>
                                                    <Input value={journalName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJournalName(e.target.value)}/>
                                                </TableItem>
                                                <Button variant="secondary" onClick={() => setIsEditing(undefined)}>Cancel</Button>
                                                <Button onClick={handleJournalEditSubmit}>Done</Button>
                                            </div>
                                            
                                            :
                                            <TableItem onClick={() => handleJournalClick(item.journal_id)}>
                                                {item.journal_name}
                                            </TableItem> 
                                        }
                                        
                                        <TableItem onClick={() => handleJournalClick(item.journal_id)}>{new Date(item.createdAt).toLocaleString()}</TableItem>
                                        <TableItem onClick={() => handleJournalClick(item.journal_id)}>{new Date(item.updatedAt).toLocaleString()}</TableItem>
                                        {
                                            isEditing === item.journal_id ?
                                            <TableItem onClick={() => setIsEditing(undefined)}>
                                                <EditIcon size={20} style={{padding: 0}}/>
                                            </TableItem>
                                            :
                                            <TableItem onClick={() => handleJournalEdit(item.journal_id, item.journal_name)}>
                                                <VerticallyAlign>
                                                    <EditIcon size={20} style={{padding: 0}}/>
                                                </VerticallyAlign>
                                            </TableItem>    
                                        }
                                        {
                                            isDeletePrompt === item.journal_id ?
                                            <TableItem onClick={() => setIsDeletePrompt(undefined)}>
                                                <VerticallyAlign>
                                                    <DeleteModal handleRecordDelete={handleRecordDelete} id={item.journal_id} location='bottom'/>
                                                </VerticallyAlign>
                                            </TableItem>
                                            :
                                            <TableItem>
                                                <VerticallyAlign>
                                                    <DeleteModal handleRecordDelete={handleRecordDelete} id={item.journal_id} location='bottom'/>
                                                </VerticallyAlign>
                                            </TableItem>
                                        }
                                        </TableRow>
                                )
                            })
                        }
                        </tbody>
                        :
                        <></>
                    }
                </Table>
                {
                    journals && journals[0] ?
                    <></>
                    :
                    <EmptyJournalContatiner>
                        <h4>Looks like you don't have any journals. Create a new one!</h4>
                        <CreateModal getJournals={getJournals} location='bottom'/>
                    </EmptyJournalContatiner>
                }
                
            </JournalContainer>
            </Router>
        )
    // }
    
}

export default JournalsAll;