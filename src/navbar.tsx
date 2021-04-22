import { useContext } from 'react'
// import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { IoIosJournal } from 'react-icons/io';
import { FaPenAlt } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { IoMdBookmarks } from 'react-icons/io';
import AppContext from './context/context';
//import axios from 'axios'



const SidebarContainer = styled.div`
    height: 100%; 
    position: fixed; 
    top: 0; 
    left: 0;
    width: 300px;
    color: white;
    padding-top: 20px;
    background-color: black;
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

const links: any[][] = [
    ["My Journals", "/journals", < IoIosJournal size={22} />],
    ["Create New Entry", "/createnewentry", < FaPenAlt size={22} />],
    ["Settings", "/settings", < AiFillSetting size={22} />]
]


function Sidebar () {
    const context = useContext(AppContext);

    return(
        <SidebarContainer>
            <Header>
                <IoMdBookmarks size='60'/>
                <SidebarHeader>
                    DevJournal
                </SidebarHeader>
                <SidebarSubtitle>
                    Hi, {localStorage.getItem('username')} 👋
                </SidebarSubtitle>
            </Header>
            <SidebarLinks>
                {
                    // journals && journals[0] ?
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