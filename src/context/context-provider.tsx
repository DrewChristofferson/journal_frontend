import React, { useState } from 'react'
import AppContext from './context'
import App from '../App'


interface JournalObject {
    id: string;
    name: string;
    date: string;
    update: string;
    count: number;
    owner: string;
}

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

interface JournalEntryObject {
    id: string;
    journalid: string;
    name: string;
    date: string;
    count: number;
    owner: string;
}

const data: JournalEntryObject[] = [
    {
        id: "one",
        journalid: "full",
        name: "Adding Terraform to Your Infrastructure",
        date: "1/4/2021",
        count: 189,
        owner: "Drew Christofferson"
    },
    {
        id: "two",
        journalid: "google",
        name: "Leadership Skills in Tech",
        date: "2/19/2021",
        count: 1109,
        owner: "Drew Christofferson"
    },
    {
        id: "three",
        journalid: "full",
        name: "Why Docker Make Local Development So Easy",
        date: "1/4/2021",
        count: 710,
        owner: "Drew Christofferson"
    },
    {
        id: "four",
        journalid: "full",
        name: "Git Commands to Remember",
        date: "1/4/2021",
        count: 189,
        owner: "Drew Christofferson"
    },
    {
        id: "five",
        journalid: "personal",
        name: "My Company Watchlist 2021",
        date: "2/19/2021",
        count: 1109,
        owner: "Drew Christofferson"
    },
    {
        id: "six",
        journalid: "full",
        name: "On Spring Boot Security",
        date: "1/4/2021",
        count: 710,
        owner: "Drew Christofferson"
    },
    {
        id: "seven",
        journalid: "google",
        name: "Kubernetes vs. ECS",
        date: "1/4/2021",
        count: 189,
        owner: "Drew Christofferson"
    },
    {
        id: "eight",
        journalid: "google",
        name: "Tips for Managing a Team",
        date: "2/19/2021",
        count: 1109,
        owner: "Drew Christofferson"
    },
    {
        id: "nine",
        journalid: "personal",
        name: "Why Keep a Dev Journal?",
        date: "1/4/2021",
        count: 710,
        owner: "Drew Christofferson"
    },

]

/** The context provider for our app */
export default function AppProvider () {
    const [ journalEntryItems, setJournalEntryItems ] = useState<JournalEntryObject[]>(data)
    const [ journals, setJournals ] = useState<JournalObject[]>(journalItems)



    return (
        <AppContext.Provider value={{journalEntryItems, journals}}>
            <App />
        </AppContext.Provider>
    )


    // async componentDidMount() {
    //     //make api calls here
    // }

}
