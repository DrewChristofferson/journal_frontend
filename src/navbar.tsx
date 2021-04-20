import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { IoIosJournal } from 'react-icons/io';
import { FaPenAlt } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
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

const SidebarHeader = styled.div`
    font-size: 32px;
    font-weight: 700;
    padding-left: 20px;
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

const links: any[][] = [
    ["My Journals", "/journals", IoIosJournal],
    ["Create New Entry", "/createnewentry", FaPenAlt],
    ["Settings", "/settings", AiFillSetting]
]


function Sidebar () {
    const context = useContext(AppContext);
    return(
        <SidebarContainer>
            <SidebarHeader>
                DevJournal
            </SidebarHeader>
            <SidebarLinks>
                {
                    links.map(link => {
                       return (
                           <NavLink key={link[0]} to={link[1]}>
                                < IoIosJournal size={22} />                                
                                <NavText>
                                    {link[0]}
                                </NavText>
                                
                           </NavLink>
                       )
                       
                    })
                }
                <NavLink key="Log Out" to="/login" onClick={() => context.logout()}>Log Out</NavLink>
            </SidebarLinks>
        </SidebarContainer>
    )
}

export default Sidebar