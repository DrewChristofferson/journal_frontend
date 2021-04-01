import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"



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
    padding-bottom: 30px;
    color: white;
    text-decoration: none;
    padding-left: 20px;
    &:hover{
        background-color: blue;
    }
`

const links: string[][] = [
    ["My Journals", "/journals"],
    ["Create New Entry", "/newentry"],
    ["Settings", "/settings"]
]


function Sidebar () {
    return(
        <SidebarContainer>
            <SidebarHeader>
                HackerJournal
            </SidebarHeader>
            <SidebarLinks>
                {
                    links.map(link => {
                       return (
                           <NavLink to={link[1]}>
                                {link[0]}
                           </NavLink>
                       )
                       
                    })
                }
            </SidebarLinks>
        </SidebarContainer>
    )
}

export default Sidebar