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

const updateToken = (value: string) => {};

const updateJournals = (value: JournalObject[]) => {};
const updateJournal = (value: JournalObject) => {};
const updateRecords = (value: JournalEntryObject[]) => {};
const updateRecord = (value: JournalEntryObject) => {};
let token = "";

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
    updateJournal

});

export default AppContext;
