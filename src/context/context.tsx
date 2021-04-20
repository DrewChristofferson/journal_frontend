import React from 'react';
import JournalEntry from '../views/entry';

interface Context {
    journalEntryItems: JournalEntryObject;
    journals: JournalObject;

};

interface JournalEntryObject {
    record_id: string;
    journal_id: string;
    record_title: string;
    createdAt: string;
    updatedAt: string;
    content: string;
};

interface JournalObject {
    journal_id: string;
    journal_name: string;
    createdAt: string;
    updatedAt: string;
    user_id: string;
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

const journalData: JournalObject[] = [];


const entryData: JournalEntryObject[] = [];

const entry: JournalEntryObject = {
    record_id: "",
    journal_id: "",
    record_title: "",
    createdAt: "",
    updatedAt: "",
    content: ""
};

const journal: JournalObject = {
    journal_id: "",
    journal_name: "",
    createdAt: "",
    updatedAt: "",
    user_id: ""
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

const updateToken = (value: string) => {};

const updateJournals = (value: JournalObject[]) => {};
const updateJournal = (value: JournalObject) => {};
const updateRecords = (value: JournalEntryObject[]) => {};
const updateRecord = (value: JournalEntryObject) => {};
const updateUserData = (value: UserData) => {};
const logout = () => {};
let token = "";
let userData: UserData = user;
let API_BASE_URL = "http://rh-lb-493719566.us-east-1.elb.amazonaws.com";

let isAuthenticated = false;

const AppContext = React.createContext({
    journalEntryItems: entryData,
    journals: journalData,
    updateToken,
    isAuthenticated,
    token,
    updateJournals,
    records: entryData,
    updateRecords,
    record: entry,
    updateRecord,
    journal: journal,
    updateJournal,
    API_BASE_URL,
    logout,
    userData,
    updateUserData

});

export default AppContext;
