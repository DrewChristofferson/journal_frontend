import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import AppContext from '../../context/context';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const Header = styled.div`
    display: flex;
`

function Settings() {
    const context = useContext(AppContext);
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [name, setName] = useState<string>(context.userData.name)
    const [username, setUsername] = useState<string>(context.userData.username)
    const [email, setEmail] = useState<string>(context.userData.email)
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    const updateUser = async () => {
        await axios.put(
            `${context.API_BASE_URL}/api/v1/user/${context.userData.userid}`, 
            {
                'name': name,
                'email': email,
                'username': username
            }, 
            config
        )
    };

    const updateName = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const updateUsername = (e: React.FormEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value)
    }
    const updateEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const submit = () => {
        updateUser();
        context.updateUserData(
            {
                "accountNonExpired": context.userData.accountNonExpired,
                "accountNonLocked": context.userData.accountNonLocked,
                "authorities": context.userData.authorities,
                "credentialsNonExpired": context.userData.credentialsNonExpired,
                "email": email,
                "enabled": context.userData.enabled,
                "name": name,
                "password": context.userData.password,
                "role": context.userData.role,
                "userid": context.userData.userid,
                "username": username 
            }
        )
        setIsEditing(false);

    }

    return (
        <Container>
            <Header>
                <h2>Settings</h2>
                {
                    isEditing ?
                    <></>
                    :
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                }
            </Header>
            <div>
                <h5>
                    Name
                </h5>
                {
                    isEditing ?
                    <input value={name} onChange={updateName} />
                    :
                    <p>{context.userData.name}</p>  
                }
                
            </div>
            <div>
                <h5>
                    Username
                </h5>
                {
                    isEditing ?
                    <input value={username} onChange={updateUsername} />
                    :
                    <p>{context.userData.username}</p>  
                }
            </div>
            <div>
                <h5>
                    Email
                </h5>
                {
                    isEditing ?
                    <input value={email} onChange={updateEmail} />
                    :
                    <p>{context.userData.email}</p>  
                }
            </div>
            <div>
                {
                    isEditing ?
                    <div>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                    <button onClick={submit}>Done</button>
                    </div>
                    :
                    <></>
                }
            </div>
            

        </Container>
    )
}

export default Settings
