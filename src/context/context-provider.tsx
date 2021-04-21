import { useState } from 'react';
import AppContext from './context';
import App from '../App';
import axios from 'axios';

interface JournalObject {
    journal_id: string;
    journal_name: string;
    createdAt: string;
    updatedAt: string;
    user_id: string;
};

const journalItem: JournalObject = {
        journal_id: "",
        journal_name: "",
        createdAt: "",
        updatedAt: "",
        user_id: ""
};

const journalRecords: JournalEntryObject[] = [
    {
        record_id: "",
        journal_id: "",
        record_title: "",
        createdAt: "",
        updatedAt: "",
        content: "",
    }
];

const journalRecord: JournalEntryObject = {
    record_id: "",
    journal_id: "",
    record_title: "",
    createdAt: "",
    updatedAt: "",
    content: "",
};

const user: UserData = {
    accountNonExpired: false,
    accountNonLocked: false,
    authorities: [],
    credentialsNonExpired: false,
    email: '',
    enabled: false,
    name: '',
    password: '',
    role: '',
    userid: '',
    username: ''
};


interface JournalEntryObject {
    record_id: string;
    journal_id: string;
    record_title: string;
    createdAt: string;
    updatedAt: string;
    content: string;
};

interface UserData {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: [];
    credentialsNonExpired: boolean;
    email: string;
    enabled: boolean;
    name: string;
    password: string;
    role: string;
    userid: string;
    username: string;
};

/** The context provider for our app */
export default function AppProvider () {
    const [ token, setToken ] = useState<string>('invalidtoken');
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
    const [ journals, setJournals ] = useState<JournalObject[]>([]);
    const [ journal, setJournal ] = useState<JournalObject>(journalItem);
    const [ records, setRecords ] = useState<JournalEntryObject[]>(journalRecords);
    const [ record, setRecord ] = useState<JournalEntryObject>(journalRecord);
    const [ userData, setUserData ] = useState<UserData>(user);
    let API_BASE_URL = "https://api.devjournal.link";

    const updateToken = (value: string) => {
        setToken(value.slice(6));
        setIsAuthenticated(true);
        localStorage.setItem('token', value.slice(6));

        getUserData(value.slice(6));
    };

    const getUserData = async(jwt: string) => {
        await axios.get(`${API_BASE_URL}/api/v1/user`, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        )
        .then((response) => {
            setUserData(response.data);
            localStorage.setItem('userid', response.data.userid);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('username', response.data.username);
        })
        .catch((e) => e)
    };

    const updateUserData = (newUser: UserData) => {
        setUserData(newUser);
    };

    const updateJournals = (value: JournalObject[]) => {
        setJournals(value);
    };

    const updateJournal = (value: JournalObject) => {
        setJournal(value);
    };

    const updateRecords = (value: JournalEntryObject[]) => {
        setRecords(value);
    };

    const updateRecord = (value: JournalEntryObject) => {
        setRecord(value);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserData(user);
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
    };

    return (
        <AppContext.Provider value={{ journals, updateToken, isAuthenticated, token, updateJournals, records, updateRecords, record, updateRecord, journal, updateJournal, API_BASE_URL, logout, userData, updateUserData}}>
            <App />
        </AppContext.Provider>
    );
}
