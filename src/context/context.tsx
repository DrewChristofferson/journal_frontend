import React from 'react'

interface Context {
    journalEntryItems: JournalEntryObject;
    journals: JournalObject;

}

interface JournalEntryObject {
    id: string;
    journalid: string;
    name: string;
    date: string;
    count: number;
    owner: string;
}

interface JournalObject {
    id: string;
    name: string;
    date: string;
    update: string;
    count: number;
    owner: string;
}

const journalData: JournalObject[] = [
    {
        id: "full",
        name: "Full Stack",
        date: "1/4/2021",
        update: "3/16/2021",
        count: 18,
        owner: "Drew Christofferson"
    }
]


const entryData: JournalEntryObject[] = [
    {
        id: "one",
        journalid: "full",
        name: "Adding Terraform to Your Infrastructure",
        date: "1/4/2021",
        count: 189,
        owner: "Drew Christofferson"
    }
]

const updateToken = (value: string) => {
    console.log('invalidtoken');
}

let token = 'thisismytoken';
let isAuthenticated = false;

const AppContext = React.createContext({
    journalEntryItems: entryData,
    journals: journalData,
    updateToken,
    isAuthenticated,
    token

})
export default AppContext
