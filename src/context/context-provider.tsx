import React, { useState, useEffect } from 'react'
import AppContext from './context'
import App from '../App'
import axios from 'axios';


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

interface JournalEntryObjectDB {
    id: string;
    journalid: string;
    name: string;
    date: string;
    count: number;
    owner: string;
}

interface JournalObjectDB {
    journal_id: string;
    user_id: string;
    journal_name: string;
    createdAt: string;
    updatedAt: number;
}

/** The context provider for our app */
export default function AppProvider () {
    const [ journalEntryItems, setJournalEntryItems ] = useState<JournalEntryObject[]>(data)
    const [ journals, setJournals ] = useState<JournalObject[]>(journalItems)
    const [ token, setToken ] = useState<string>('invalidtoken')
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false)
    // token: string = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZXRoIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6ImpvdXJuYWw6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9LHsiYXV0aG9yaXR5Ijoiam91cm5hbDp3cml0ZSJ9LHsiYXV0aG9yaXR5IjoicmVjb3JkOndyaXRlIn1dLCJpYXQiOjE2MTg1Mjk0MDgsImV4cCI6MTYxOTMwODgwMH0.QXZRULldW6uNxoRzz2cx_dPFZLvhp3RT62FJEpWWsDSwNXZYoj0q6c-vhhn3wcUdYidmv7BMNKlNiVcSslsJxQ'
    let config = {
        headers: {
          Authorization: token,
        }
      }

    useEffect(() => {
        getJournals();
    })

    let getJournals = async() => {
        await axios.get('http://rh-lb-954750967.us-east-1.elb.amazonaws.com/api/v1/journal/user', config).then(
            function(response) {
                console.log(response)
            }
        )
        await axios.get('http://rh-lb-954750967.us-east-1.elb.amazonaws.com/api/v1/record/journal/7a4b41bb-6824-4404-9beb-ab2ba10a978b', config).then(
            function(response) {
                console.log(response)
            }
        )

    }

    const updateToken = (value: string) => {
        console.log(value.slice(6));
        setToken(value.slice(6));
        setIsAuthenticated(true);
        localStorage.setItem('token', value.slice(6));
    }

    return (
        <AppContext.Provider value={{journalEntryItems, journals, updateToken, isAuthenticated, token}}>
            <App />
        </AppContext.Provider>
    )
}
