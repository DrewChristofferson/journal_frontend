import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import { Formik, Field, Form, FormikHelpers } from "formik";
import axios from 'axios';
import AppContext from '../../context/context';


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
`

interface MyFormValues {
    username: string;
    password: string;

  }

function Login() {
    const history = useHistory();
    const initialValues: MyFormValues = { username: '', password: '' };
    const [showError, setShowError] = useState<Boolean>(false);
    const context = useContext(AppContext);

    const handleSubmit = (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {

        axios({
            method: 'post',
            url: 'http://rh-lb-954750967.us-east-1.elb.amazonaws.com/login',
            data: {
              username: values.username,
              password: values.password
            }
          }).then(
            function(response) {
                if(response.status === 200){
                    history.push("/journals");
                    context.updateToken(response.headers.authorization)
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
        <Container>
            <PromoContainer>
                <h1>Hacker Journal</h1>
                <h5>"This journal app for developers will make all your wildest dreams come true."</h5>
                <h5>- John Turner (Super smart developer)</h5>
            </PromoContainer>
            <FormContainer>
           
                <h2>Sign Up</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
                        handleSubmit( values, actions );
                      }}
                    // onSubmit={(values, actions) => {
                    //     console.log({ values, actions });
                    //     alert(JSON.stringify(values, null, 2));
                    //     actions.setSubmitting(false);
                    //   }}
                >
                    <Form>
                        <label htmlFor="username">Username</label>
                        <Field name="username" type="text" />
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" />
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
                {
                    showError ?
                    <p style={{color: 'red'}}>Invalid username or password</p>
                    :
                    <></>
                }
                <div>
                    Forgot Password? 
                </div>
                <div>
                    Don't have an account? Sign Up
                </div>
                
            </FormContainer>
        </Container>
    )
}

export default Login
