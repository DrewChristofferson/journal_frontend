import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AppContext from './context';
import App from '../App';

interface JournalObject {
    journal_id: string;
    journal_name: string;
    createdAt: string;
    updatedAt: string;
    user_id: string;
};

const journalItems: JournalObject[] = [
    // {
    //     id: "full",
    //     name: "Full Stack",
    //     date: "1/4/2021",
    //     update: "3/16/2021",
    //     count: 18,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "google",
    //     name: "Google Work",
    //     date: "2/19/2021",
    //     update: "2/19/2021",
    //     count: 1,
    //     owner: "Drew Christofferson"
    // },
    // {
    //     id: "personal",
    //     name: "Personal Thoughts",
    //     date: "1/4/2021",
    //     update: "3/16/2021",
    //     count: 10,
    //     owner: "Drew Christofferson"
    // },
];

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

interface JournalEntryObject {
    record_id: string;
    journal_id: string;
    record_title: string;
    createdAt: string;
    updatedAt: string;
    content: string;
};

const data: JournalEntryObject[] = [
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

];

interface JournalEntryObjectDB {
    id: string;
    journalid: string;
    name: string;
    date: string;
    count: number;
    owner: string;
};

interface JournalObjectDB {
    journal_id: string;
    user_id: string;
    journal_name: string;
    createdAt: number;
    updatedAt: number;
};

/** The context provider for our app */
export default function AppProvider () {
    const [ journalEntryItems, setJournalEntryItems ] = useState<JournalEntryObject[]>(data);
    const [ token, setToken ] = useState<string>('invalidtoken');
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
    const [ journals, setJournals ] = useState<JournalObject[]>(journalItems);
    const [ journal, setJournal ] = useState<JournalObject>(journalItem);
    const [ records, setRecords ] = useState<JournalEntryObject[]>(journalRecords);
    const [ record, setRecord ] = useState<JournalEntryObject>(journalRecord);
    let API_BASE_URL = "https://api.devjournal.link";
    const history = useHistory();

    const updateToken = (value: string) => {
        console.log(isAuthenticated, value);
        setToken(value.slice(6));
        setIsAuthenticated(true);
        localStorage.setItem('token', value.slice(6));
        console.log(isAuthenticated);
    };

    const updateJournals = (value: JournalObject[]) => {
        setJournals(value);
        // localStorage.setItem('journals', value);
    };

    const updateJournal = (value: JournalObject) => {
        setJournal(value);
        // localStorage.setItem('journals', value);
    };

    const updateRecords = (value: JournalEntryObject[]) => {
        setRecords(value);
        // localStorage.setItem('journals', value);
    };

    const updateRecord = (value: JournalEntryObject) => {
        setRecord(value);
        // localStorage.setItem('journals', value);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        // localStorage.setItem('journals', value);
    };

    return (
        <AppContext.Provider value={{journalEntryItems, journals, updateToken, isAuthenticated, token, updateJournals, records, updateRecords, record, updateRecord, journal, updateJournal, API_BASE_URL, logout}}>
            <App />
        </AppContext.Provider>
    );
}
