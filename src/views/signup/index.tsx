import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import { Formik, Field, Form, FormikHelpers } from "formik";
import axios from 'axios';
import AppContext from '../../context/context';
import { Link } from 'react-router-dom'; 
import { EntryPage, PageHeader } from '../../Components/Login/login'; 
import EntryCard from '../../Components/EntryCard/EntryCard';
import InputGroup from '../../Components/InputGroup/InputGroup';
import LoginInput from '../../Components/Input/Input';
import LoginButton from '../../Components/LoginButton/LoginButton';
import { IoMdBookmarks } from 'react-icons/io';



const Container = styled.div`
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
`

const FormContainer = styled.div`
    flex-basis: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const PromoContainer = styled.div`
    flex-basis: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    padding-bottom: 10%;
`

const Title = styled.h1`
    font-size: 50px;
`
const QuoteRight = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 90%;
    font-size: 68px;
    font-weight: 800;
`
const QuoteLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 90%;
    font-size: 68px;
    font-weight: 800;
`
const QuoteContent = styled.div`
    width: 75%;
    font-size: 24px;
    font-weidht: 400;
    font-style: italic; 
`
const QuoteAuthorContent = styled.div`
    width: 50%;
    font-size: 20px;
    font-weidht: 500;
`

interface MyFormValues {
    name: string; 
    email: string; 
    username: string;
    password: string;

  }

export default function Login() {
    const history = useHistory();
    const initialValues: MyFormValues = { name:'', email: '', username: '', password: '' };
    const [showError, setShowError] = useState<Boolean>(false);
    const context = useContext(AppContext);

    const handleSubmit = (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
    
        axios({
            method: 'post',
            url: `${context.API_BASE_URL}/api/v1/user`,
            data: {
              name: values.name,
              email: values.email,
              username: values.username,
              password: values.password
            }
          }).then(
            function(response) {
                if(response.status === 200){
                    login(values)
                } else if (response.status === 405){
                    console.log("Method Not Allowed");
                } else {
                    console.log("server error");
                }
            }
        ).catch(
            function(e) {
                setShowError(true);
            }
        );
        actions.setSubmitting(false);
    } 

    const login = (values: MyFormValues) => {
        axios({
            method: 'post',
            url: `${context.API_BASE_URL}/login`,
            data: {
              username: values.username,
              password: values.password
            }
          }).then(
            function(response) {
                if(response.status === 200){    
                    context.updateToken(response.headers.authorization);
                    history.push("/journals");
                } else if (response.status === 403){
                    console.log("invalid username or password");
                } else {
                    console.log("server error");
                }
            }
        ).catch(
            function(e) {
                setShowError(true);
            }
        );
    
    }

    return (
        <Container>
            <PromoContainer>
                <IoMdBookmarks size="100"/>
                <Title>DevJournal</Title>
                <QuoteLeft>&#8220;</QuoteLeft>
                <QuoteContent>This journal app for developers will make all your wildest dreams come true.</QuoteContent>
                <QuoteRight>&#8221;</QuoteRight>
                <QuoteAuthorContent>- John Turner, Super Smart Developer</QuoteAuthorContent>
            </PromoContainer>
            <FormContainer>
            <EntryPage>
                {/* <PageHeader to="/">Awesome Journal</PageHeader> */}
                <EntryCard>
                    <h1>Sign Up</h1>
                    <Formik 
                        initialValues={initialValues}
                        onSubmit={(values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
                        handleSubmit( values, actions );
                      }}>
                        <Form>
                            <InputGroup>
                                <label htmlFor='name'>Name</label>
                                <Field name='name' type='text' placeholder='John Turner' as={LoginInput} />
                            </InputGroup>
                            <InputGroup>
                                <label htmlFor='email'>Email</label>
                                <Field name='email' type='text' placeholder='jturner@byu.edu' as={LoginInput} />
                            </InputGroup>
                            <InputGroup>
                                <label htmlFor='username'>Username</label>
                                <Field name='username' type='text' placeholder='JohnT' as={LoginInput} />
                            </InputGroup>
                            <InputGroup>
                                <label htmlFor='password'>Password</label>
                                <Field name='password' type='password' placeholder='thisgrouprocks' as={LoginInput} />
                            </InputGroup>
                            <LoginButton type='submit' full>Sign Up</LoginButton>
                        </Form> 
                    </Formik>
                    {
                        showError ?
                        <p style={{color: 'red'}}>Username already exists</p>
                        :
                        <></>
                    }   
                    <span>
                        Already have an account?
                        <Link to="/login">Sign In</Link>
                    </span>
                </EntryCard>
            </EntryPage>
          </FormContainer>
        </Container>
    );
}





