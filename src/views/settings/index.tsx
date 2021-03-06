import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import AppContext from '../../context/context';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/LoginInput'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const Header = styled.div`
    display: flex;
`

const ContentWrapper = styled.div`
    padding-top: 80px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`
const ContentRow = styled.div`
    padding-top: 30px;
    margin-right: 100px;
`
const EditButtons = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 100px;
`

const SettingsTitleText = styled.div`
    font-size: 42px;
`
const SettingsSubTitleText = styled.div`
    font-size: 30px;
`
const SettingsContent = styled.div`
    font-size: 24px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`

function Settings() {
    const context = useContext(AppContext);
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [name, setName] = useState<string>(localStorage.getItem('name') || 'Name not found')
    const [username, setUsername] = useState<string>(localStorage.getItem('username') || 'Name not found')
    const [email, setEmail] = useState<string>(localStorage.getItem('email') || 'Name not found')
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
        if (name.length > 0 && email.length > 0 && username.length > 0) {
            updateUser();
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            setIsEditing(false);
        }
    }
    const cancel = () => {
        updateUser();
        setName(localStorage.getItem('name') || 'Name not Found');
        setEmail(localStorage.getItem('email') || 'Email not Found');

        setIsEditing(false);

    }

    return (
        <Container>
            <Header>
                <SettingsTitleText>Settings</SettingsTitleText>
                {
                    isEditing ?
                    <></>
                    :
                    <ButtonContainer>
                        <Button style={{height: '50%'}} onClick={() => setIsEditing(true)}>Edit</Button>
                    </ButtonContainer>
                    
                }
            </Header>
            <ContentWrapper>
            <ContentRow>
                    <SettingsSubTitleText>
                        Username
                    </SettingsSubTitleText>
                    <SettingsContent>{localStorage.getItem('username')}</SettingsContent>  
                    {/* {
                        isEditing ?
                        <Input style={{width: '100%'}} value={username} onChange={updateUsername} />
                        :
                        <SettingsContent>{localStorage.getItem('username')}</SettingsContent>  
                    } */}
                </ContentRow>
                <ContentRow>
                    <SettingsSubTitleText>
                        Name
                    </SettingsSubTitleText>
                    {
                        isEditing ?
                        <Input style={{width: '100%'}} value={name} onChange={updateName} />
                        :
                        <SettingsContent>{localStorage.getItem('name')}</SettingsContent>  
                    }
                    
                </ContentRow>
                <ContentRow>
                    <SettingsSubTitleText>
                        Email
                    </SettingsSubTitleText>
                    {
                        isEditing ?
                        <Input style={{width: '100%'}} value={email} onChange={updateEmail} />
                        :
                        <SettingsContent>{localStorage.getItem('email')}</SettingsContent>  
                    }
                </ContentRow>
                
            </ContentWrapper>
            <EditButtons>
                {
                    isEditing ?
                    <div>
                    <Button variant="secondary" onClick={cancel}>Cancel</Button>
                    <Button onClick={submit}>Done</Button>
                    </div>
                    :
                    <></>
                }
            </EditButtons>
        

        </Container>
    )
}

export default Settings
