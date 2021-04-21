import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import { Formik, Field, Form, FormikHelpers } from "formik";
import axios from 'axios';
import AppContext from '../../context/context';
import { BrowserRouter as Router, Link } from 'react-router-dom'; 
import { EntryPage, PageHeader } from '../../Components/Login/login'; 
import EntryCard from '../../Components/EntryCard/EntryCard';
import InputGroup from '../../Components/InputGroup/InputGroup';
import LoginInput from '../../Components/Input/LoginInput';
import LoginButton from '../../Components/LoginButton/LoginButton';
import { Container, FormContainer, PromoContainer } from '../../Components/Container/container'
import Promo from './loginpromo'


interface MyFormValues {
    username: string;
    password: string;

  }

export default function Login() {
    const history = useHistory();
    const initialValues: MyFormValues = { username: '', password: '' };
    const [showError, setShowError] = useState<Boolean>(false);
    const context = useContext(AppContext);

    const handleSubmit = (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
    
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
        actions.setSubmitting(false);
    }

    return (
        <Router>
        <Container>
            <Promo />
            <FormContainer>
            <EntryPage>
                {/* <PageHeader to="/">Awesome Journal</PageHeader> */}
                <EntryCard>
                    <h1>Login</h1>
                    <Formik 
                        initialValues={initialValues}
                        onSubmit={(values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
                        handleSubmit( values, actions );
                      }}>
                        <Form>
                            <InputGroup>
                                <label htmlFor='username'>Username</label>
                                <Field name='username' type='text' placeholder='JohnT' as={LoginInput} />
                            </InputGroup>
                            <InputGroup>
                                <label htmlFor='password'>Password</label>
                                <Field name='password' type='password' placeholder='thisgrouprocks' as={LoginInput} />
                            </InputGroup>
                            <LoginButton type='submit' full>Sign In</LoginButton>
                        </Form> 
                    </Formik>
                    {
                        showError ?
                        <p style={{color: 'red'}}>Invalid username or password</p>
                        :
                        <></>
                    }   
                    <span>
                        Don't have an account?
                        <Link to="/signup" onClick={() => history.push("/signup")}>Sign Up</Link>
                    </span>
                </EntryCard>
            </EntryPage>
          </FormContainer>
        </Container>
        </Router>
    );
}