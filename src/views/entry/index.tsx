import React from 'react';
import styled from 'styled-components'
import { useParams } from "react-router-dom";


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

const EntryContent = styled.div`
    padding-top: 50px;
    line-height: 2em;
`

interface JournalEntryObject {
    id: string;
    journalid: string;
    name: string;
    date: string;
    count: number;
    owner: string;
}


const journalEntryItems: JournalEntryObject[] = [
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

const dummyContent: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel molestie diam. Vestibulum justo elit, pharetra vel vehicula ac, suscipit sit amet ligula. Curabitur facilisis metus vitae ex scelerisque scelerisque. Morbi bibendum molestie ante, ut tempor velit tincidunt eget. Donec commodo risus sed purus sagittis, at elementum felis facilisis. Pellentesque purus ex, eleifend non cursus ut, rutrum sed urna. Donec commodo non metus eget pulvinar. Mauris auctor ipsum mattis, posuere nisi a, ornare purus. Pellentesque placerat pulvinar est, ac sollicitudin risus placerat ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut vel tortor sed eros pharetra ullamcorper. Ut ultricies augue a interdum tempor. Donec laoreet gravida diam, ut faucibus odio semper ac. In ante lectus, vulputate sed tellus a, finibus imperdiet nulla. Sed vulputate nunc mi, ac tincidunt urna blandit nec."

function JournalEntry () {
    const { entryid } = useParams<{ entryid: string }>();

    return(
        <JournalContainer>
            <JournalHeader>
                <JournalTitleGroup>
                    <JournalTitleText>
                        {
                            journalEntryItems.map(item => {
                                if(item.id === entryid){
                                    return item.name;
                                }
                                else return null;
                            })
                        }
                    </JournalTitleText>
                </JournalTitleGroup>
            </JournalHeader>
            <EntryContent>
                {dummyContent}
            </EntryContent>
        </JournalContainer>
    )
}

export default JournalEntry;