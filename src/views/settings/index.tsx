import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import AppContext from '../../context/context';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const Header = styled.div`
    display: flex;
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    padding-left: 50px;
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
                        Name
                    </SettingsSubTitleText>
                    {
                        isEditing ?
                        <Input style={{width: '100%'}} value={name} onChange={updateName} />
                        :
                        <SettingsContent>{context.userData.name}</SettingsContent>  
                    }
                    
                </ContentRow>
                <ContentRow>
                    <SettingsSubTitleText>
                        Username
                    </SettingsSubTitleText>
                    {
                        isEditing ?
                        <Input style={{width: '100%'}} value={username} onChange={updateUsername} />
                        :
                        <SettingsContent>{context.userData.username}</SettingsContent>  
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
                        <SettingsContent>{context.userData.email}</SettingsContent>  
                    }
                </ContentRow>
                
            </ContentWrapper>
            <EditButtons>
                {
                    isEditing ?
                    <div>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
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
