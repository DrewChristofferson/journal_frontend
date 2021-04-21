import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Searchbar from '../../Components/SearchBar/SearchBar';
import { GrAddCircle, GrEdit } from 'react-icons/gr';
import { useHistory, useParams, Link, useRouteMatch } from "react-router-dom";
// import { contextType } from 'react-commonmark';
import DeleteModal from '../../Components/Modals/DeleteModal'
import AppContext from '../../context/context';
import axios from 'axios';
import Input from '../../Components/Input/LoginInput'
import Button from '../../Components/Button/Button'
import { AddIcon, EditIcon } from '../../Components/Icons/Icons'
// import CircularProgress from '@material-ui/core/CircularProgress';


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

const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const EmptyJournalContatiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`


interface JournalObject {
    journal_id: string;
    user_id: string;
    journal_name: string;
    createdAt: number;
    updatedAt: number;
};

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
    const context = useContext(AppContext);
    const [records, setRecords] = useState<[JournalEntryObject] | undefined>();
    const [journal, setJournal] = useState<JournalObject>();
    const [record, setRecord] = useState<JournalEntryObject>();
    const [isEditing, setIsEditing] = useState<string | undefined>();
    const [isDeletePrompt, setIsDeletePrompt] = useState<string | undefined>();
    const [journalName, setJournalName] = useState<string | undefined>();
    const [recordName, setRecordName] = useState<string | undefined>();
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }
    const { jid } = useParams<{ jid: string }>();

    useEffect(() => {
        getJournal();
        getRecords();
    }, [])

    const getJournal = async() => {
        await axios.get(`${context.API_BASE_URL}/api/v1/journal/user`, config)
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].journal_id, jid)
                if (response.data[i].journal_id === jid){
                    setJournal(response.data[i]);
                }
            }
        })
        .catch((e) => e)
    }

    const getRecords = async() => {
        await axios.get(`${context.API_BASE_URL}/api/v1/record/journal/` + jid, config)
        .then((response) => {
            setRecords(response.data)
            // setIsLoading(false)
        })
        .catch((e) => e)
    }

    const handleJournalEntryClick = (id: string) => {
        history.push(`/journals/${jid}/${id}`)
    }

    const handleNewEntryClick = () => {
        history.push(`/journals/${jid}/newentry`);
    }

    /*** Editing a journal entry name ***/
    const handleRecordEdit = async (id: string, name: string) => {
        setRecordName(name);
        setIsEditing(id);
    };
    const handleRecordClick = (id: string) => {
        history.push(`/journals/${id}`)
        let entry = context.journalEntryItems.filter(r => r.record_id === id)[0];
        context.updateRecord(entry);
    }
    const updateRecordName = async () => {
        await axios.put(
            `${context.API_BASE_URL}/api/v1/record/${isEditing}`, 
            {"record_title": recordName}, 
            config
        )
    };
    const handleRecordEditSubmit = async () => {
        if(recordName !== ''){
            updateRecordName();
            setIsEditing(undefined);
            getRecords();
            getRecords();
        }
    };
    /*** END ***/

    /*** Delete a journal entry ***/
    const handleRecordDelete = async (id: string) => {
            await axios.delete(`${context.API_BASE_URL}/api/v1/record/${id}`, config)
            .then((res) => getRecords());
    };
    /*** END ***/
    
    // if(isLoading){
    //     return(
    //         <LoadingContainer>
    //             <CircularProgress/>
    //         </LoadingContainer>
    //     )
    // } else {
        return(
            <JournalContainer>
                <BreadcrumbContainer>
                    <Link to="/journals">My Journals</Link> &gt; <Link to={`/journals/${jid}`}>{journal?.journal_name}</Link>
                </BreadcrumbContainer>
                <JournalHeader>
                    <JournalTitleGroup>
                        <JournalTitleText>
                            {
                                journal?.journal_name
                            }
                        </JournalTitleText>
                        <AddIcon size={30} onClick={handleNewEntryClick}/>
                    </JournalTitleGroup>
                    {/* <Searchbar placeholder="Search" /> */}
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
                        records && records[0] ?
                        <tbody>
                        {
                            records?.map(item => {
                                    return (
                                        <TableRow key={item.record_id}>
                                            {
                                                isEditing === item.record_id ?
                                                <div>
                                                    <TableItem>
                                                        <Input value={recordName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecordName(e.target.value)}/>
                                                    </TableItem>
                                                    <Button variant="secondary" onClick={() => setIsEditing(undefined)}>Cancel</Button>
                                                    <Button onClick={handleRecordEditSubmit}>Done</Button>
                                                </div>
                                                
                                                :
                                                <TableItem onClick={() => handleRecordClick(item.record_id)}>
                                                    {item.record_title}
                                                </TableItem> 
                                            }
                                            <TableItem onClick={() => handleJournalEntryClick(item.record_id)}>{new Date(item.createdAt).toLocaleString()}</TableItem>
                                            <TableItem onClick={() => handleJournalEntryClick(item.record_id)}>{new Date(item.updatedAt).toLocaleString()}</TableItem>
                                            {
                                                isEditing === item.record_id ?
                                                <TableItem onClick={() => setIsEditing(undefined)}>
                                                    <EditIcon size='30'/>
                                                </TableItem>
                                                :
                                                <TableItem onClick={() => handleRecordEdit(item.record_id, item.record_title)}>
                                                    <EditIcon size='30' />
                                                </TableItem>    
                                            }
                                            {
                                                isDeletePrompt === item.record_id ?
                                                <TableItem onClick={() => setIsDeletePrompt(undefined)}>
                                                    <DeleteModal handleRecordDelete={handleRecordDelete} id={item.record_id} location='bottom'/>
                                                </TableItem>
                                                :
                                                <TableItem>
                                                    <DeleteModal handleRecordDelete={handleRecordDelete} id={item.record_id} location='bottom'/>
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
                    records && records[0] ?
                    <></>
                    :
                    <EmptyJournalContatiner>
                        <h4>Create your first entry! 🎉</h4>
                        <AddIcon size={30} onClick={handleNewEntryClick}/>
                    </EmptyJournalContatiner>
                }
            </JournalContainer>
        )
    // }
    
}

export default Journal;