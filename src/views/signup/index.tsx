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
import LoginInput from '../../Components/Input/LoginInput';
import LoginButton from '../../Components/LoginButton/LoginButton';
import { Container, FormContainer, PromoContainer } from '../../Components/Container/container'
import Promo from '../login/loginpromo'


interface MyFormValues {
    name: string; 
    email: string; 
    username: string;
    password: string;
  }

export default function SignUp() {
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
            <Promo/>
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





