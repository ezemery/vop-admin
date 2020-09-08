import React, {useState, useCallback} from 'react';
// import { Form, Icon, Input, Button, Card, Row, Col } from 'antd';
import {
  FormLayout,
  TextField,
  Icon,
  Button,
  Checkbox,
  Form,
} from '@shopify/polaris';
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
  Logo,
  Text,
  AnimateText,
  SmallText,
  Background,
  Box,
  LeftSide,
  RightSide,
  CompanyDesc,
} from '../styles';

export const AccountCreate = (props) => {
  const history = useHistory();
  const {handleSubmit, control} = useForm();
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setInvalidEmail(false);
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_HOST}/login/go`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          history.push('/');
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
          <AnimateText size="large">Choose an account name</AnimateText>
          <SmallText>
            We allow you to create multiple accounts later if you need them. To
            make it easy to identify which account is which, we need you to
            choose an account name.
          </SmallText>
          <Form  onSubmit={handleSubmit(onSubmit)}>
            <FormLayout>
              <TextField
                type="text"
                label="Name"
                labelHidden
                onChange={() => {}}
                value=""
                prefix={<Icon source={CustomersMajorMonotone} />}
                placeholder="Name"
                error=""
              />
              <Button primary fullWidth>
                Create Account
              </Button>
            </FormLayout>
          </Form>
          <SmallText>
            Already have an account <Button plain>Sign In</Button>
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
