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

const links: any[][] = [
    ["My Journals", "/journals", < IoIosJournal size={22} />],
    ["Create New Entry", "/createnewentry", < FaPenAlt size={22} />],
    ["Settings", "/settings", < AiFillSetting size={22} />]
]

// const links2: any[][] = [
//     ["My Journals", "/journals", < IoIosJournal size={22} />],
//     ["Settings", "/settings", < AiFillSetting size={22} />]
// ]

// interface JournalObject {
//     journal_id: string;
//     journal_name: string;
//     createdAt: Date;
//     updatedAt: Date;
//     user_id: string;
// }

function Sidebar () {
    const context = useContext(AppContext);
    //const [journals, setJournals] = useState<[JournalObject] | undefined>();
    // const config = {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     }
    // }

    // useEffect(() => {
    //     getJournals();
    // }, [])

    // const getJournals = async() => {
    //     await axios.get(`${context.API_BASE_URL}/api/v1/journal/user`, config)
    //     .then((response) => {
    //         setJournals(response.data);
    //         context.updateJournals(response.data);
    //         // setIsLoading(false);
    //     })
    //     .catch((e) => e)
    // };

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
                    // :
                    // links2.map(link => {
                    //     return (
                    //         <NavLink key={link[0]} to={link[1]}>
                    //             {link[2]}                                
                    //             <NavText>
                    //                 {link[0]}
                    //             </NavText>
                                
                    //         </NavLink>
                    //     )
                    // })
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