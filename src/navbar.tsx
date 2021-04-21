import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { IoIosJournal } from 'react-icons/io';
import { FaPenAlt } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { IoMdBookmarks } from 'react-icons/io';
import AppContext from './context/context';



const SidebarContainer = styled.div`
    background-color: black;
    position: absolute;
    bottom: 0;
    top: 0;
    width: 300px;
    color: white;
    padding-top: 20px;
`
const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
`

const SidebarHeader = styled.div`
    font-size: 32px;
    font-weight: 700;
`

const SidebarSubtitle = styled.div`
    font-size: 20px;
    padding-top: 10px;
`

const SidebarLinks = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    justify-content: center;
` 

const NavLink = styled(Link)`
    font-size: 18px;
    font-weight: 600;
    padding-top: 20px;
    padding-bottom: 20px;
    color: white;
    text-decoration: none;
    padding-left: 20px;
    display: flex;
    align-items: flex-end;
    &:hover{
        background-color: blue;
    }
`

const NavText = styled.div`
    padding-left: 20px;
`

// const NavIcon = styled.div`
//     sel: 20px;
// `

//if context.journals.length < 1, disable the ability to create a new entry

const links: any[][] = [
    ["My Journals", "/journals", < IoIosJournal size={22} />],
    ["Create New Entry", "/createnewentry", < FaPenAlt size={22} />],
    ["Settings", "/settings", < AiFillSetting size={22} />]
]

const links2: any[][] = [
    ["My Journals", "/journals", < IoIosJournal size={22} />],
    ["Settings", "/settings", < AiFillSetting size={22} />]
]



function Sidebar () {
    const context = useContext(AppContext);
    const [journalExists, setJournalExists] = useState<Boolean>(true);

    return(
        <SidebarContainer>
            <Header>
                <IoMdBookmarks size='60'/>
                <SidebarHeader>
                    DevJournal
                </SidebarHeader>
                <SidebarSubtitle>
                    Hi, {localStorage.getItem('name')} 👋
                </SidebarSubtitle>
            </Header>
            <SidebarLinks>
                {
                    journalExists ?
                    links.map(link => {
                        return (
                            <NavLink key={link[0]} to={link[1]}>
                                {link[2]}                                
                                <NavText>
                                    {link[0]}
                                </NavText>
                                
                            </NavLink>
                        )
                    })
                    :
                    links2.map(link => {
                        return (
                            <NavLink key={link[0]} to={link[1]}>
                                {link[2]}                                
                                <NavText>
                                    {link[0]}
                                </NavText>
                                
                            </NavLink>
                        )
                    })
                }
                <NavLink key="Log Out" to="/login" onClick={() => context.logout()}>
                    < BiLogOut size={22} />                                
                    <NavText>
                        Log Out
                    </NavText>
                </NavLink>
            </SidebarLinks>
        </SidebarContainer>
    )
}

export default Sidebar