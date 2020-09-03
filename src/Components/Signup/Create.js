import React, {useState, useCallback} from 'react';
// import { Form, Icon, Input, Button, Card, Row, Col } from 'antd';
import {FormLayout, TextField, Icon, Button, Form} from '@shopify/polaris';
import {
  EmailMajorMonotone,
  LockMajorMonotone,
  CustomersMajorMonotone,
} from '@shopify/polaris-icons';
import {Link, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {Icons, LogoSVG} from '../Icons';
import {
  LoginContainer,
  LoginForm,
  FormContent,
  Text,
  AnimateText,
  SmallText,
  Box,
  Background,
  LeftSide,
  RightSide,
  CompanyDesc,
} from '../styles';

export const Create = (props) => {
  const history = useHistory();

  const {handleSubmit, control} = useForm();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setInvalidEmail(false);
    setLoading(true);
    if (data.password !== data.confirm_password) {
      setInvalidPassword(true);
      setLoading(false);
      return;
    }
    setInvalidPassword(false);
    const body = {
      email: data.email,
      password: data.password,
    };

    fetch(`${process.env.REACT_APP_API_HOST}/admin/register/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        setInvalidEmail(false);
        if (json.success || json.created_at) {
          history.push('/login');
          return;
        }
        throw new Error('Network response was not ok');
      })
      .catch((ex) => {
        setLoading(false);
        setInvalidEmail(true);
      });
  };

  return (
    <LoginContainer>
      <LeftSide>
        <LogoSVG />
        <LoginForm>
          <AnimateText size="large">Let’s get to know you!</AnimateText>
          <SmallText>Enter your basic info and a password.</SmallText>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout>
              <Controller
                as={TextField}
                control={control}
                prefix={<Icon source={CustomersMajorMonotone} />}
                label="Name"
                placeholder="Name"
                labelHidden
                type="text"
                name="name"
              />

              <Controller
                as={TextField}
                control={control}
                prefix={<Icon source={EmailMajorMonotone} />}
                error={invalidEmail ? 'Incorrect email or password' : null}
                label="Email"
                placeholder="Email"
                labelHidden
                type="email"
                name="email"
              />

              <Controller
                as={TextField}
                control={control}
                prefix={<Icon source={LockMajorMonotone} />}
                error={invalidPassword ? 'Password does not match' : null}
                label="Password"
                placeholder="Password"
                labelHidden
                type="password"
                name="password"
              />
              <Controller
                as={TextField}
                control={control}
                prefix={<Icon source={LockMajorMonotone} />}
                label="Confirm Password"
                placeholder="Confirm Password"
                labelHidden
                type="password"
                name="confirm_password"
              />

              <Button primary submit fullWidth loading={loading}>
                Create User
              </Button>
            </FormLayout>
          </Form>
          <SmallText>
            Already have an account{' '}
            <Button plain url="/login">
              Sign In
            </Button>
          </SmallText>
        </LoginForm>
        <CompanyDesc>
          <Icons />
        </CompanyDesc>
      </LeftSide>
      <RightSide>
        <Text>
          You’re just a few steps away
          <br /> from your shoppable social
          <br /> feed.
        </Text>
        <Box />
        <Background src="./login.png" />
      </RightSide>
    </LoginContainer>
  );
};
