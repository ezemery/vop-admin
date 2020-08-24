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
import {EmailMajorMonotone, LockMajorMonotone} from '@shopify/polaris-icons';
import {Link, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {Icons} from '../Icons';
import {UserStore} from '../../Context/store';
import {
  LoginContainer,
  LoginForm,
  Logo,
  FormContent,
  Text,
  AnimateText,
  SmallText,
  Background,
  Box,
  LeftSide,
  RightSide,
  CompanyDesc,
} from '../styles';

export const Login = (props) => {
  const history = useHistory();

  const {handleSubmit, control} = useForm();
  const {fetchUserDataAsync} = React.useContext(UserStore);

  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const LogoSVG = useCallback(
    () => (
      <Logo viewBox="0 0 105 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M87.5501 0.121584C83.2697 0.119611 79.1565 1.71636 76.0825 4.57345C73.0084 7.43052 71.215 11.3234 71.0823 15.4271V39.4778H71.1755C71.3621 40.7329 72.0143 41.8813 73.0126 42.712C74.0109 43.5428 75.2882 44.0002 76.61 44.0002C77.9318 44.0002 79.2089 43.5428 80.2073 42.712C81.2056 41.8813 81.8579 40.7329 82.0445 39.4778V30.8063C84.3057 31.5741 86.7147 31.8589 89.1027 31.6406C91.4908 31.4224 93.8003 30.7063 95.8697 29.5424C97.9391 28.3787 99.7184 26.7953 101.083 24.9032C102.448 23.0109 103.365 20.8556 103.771 18.5879C104.177 16.3203 104.061 13.9948 103.432 11.7745C102.803 9.55413 101.675 7.49242 100.129 5.73357C98.5824 3.9747 96.6538 2.56115 94.4783 1.59179C92.3026 0.622424 89.9326 0.120659 87.5337 0.121584H87.5501ZM87.5501 21.1449C86.4645 21.1449 85.4032 20.8362 84.5005 20.2575C83.5978 19.679 82.8941 18.8568 82.4787 17.8947C82.0632 16.9327 81.9545 15.874 82.1663 14.8527C82.3782 13.8314 82.901 12.8933 83.6687 12.1569C84.4364 11.4206 85.4145 10.9191 86.4792 10.716C87.544 10.5128 88.6478 10.6171 89.6508 11.0156C90.6538 11.4141 91.5112 12.0889 92.1144 12.9548C92.7175 13.8206 93.0395 14.8386 93.0395 15.8799C93.0395 17.2763 92.4611 18.6155 91.4317 19.6028C90.4022 20.5902 89.006 21.1449 87.5501 21.1449Z"
          fill="black"
        />
        <path
          d="M31.7341 1.09031C30.0029 0.129329 27.9447 -0.133192 26.0118 0.360419C24.0788 0.854027 22.4292 2.06338 21.4253 3.72284L11.2536 20.8553C10.5954 21.9452 10.2455 23.1811 10.2386 24.4405C10.2317 25.7 10.568 26.9395 11.2142 28.0359C11.8604 29.1324 12.794 30.0479 13.9227 30.6917C15.0513 31.3356 16.3357 31.6854 17.6487 31.7066H18.0549H18.2361H18.4556C18.7637 31.6811 19.07 31.6372 19.3723 31.575C20.1434 31.4204 20.8845 31.1503 21.568 30.7746L21.7108 30.6851L21.8041 30.6272C21.9797 30.5219 22.1499 30.4114 22.32 30.2903C23.2108 29.6453 23.9403 28.8178 24.4554 27.8683L34.5227 10.9781C35.017 10.1533 35.337 9.24323 35.4644 8.29981C35.5918 7.35639 35.524 6.39816 35.265 5.47987C35.0061 4.56157 34.5609 3.70124 33.955 2.94805C33.3493 2.19487 32.5946 1.56359 31.7341 1.09031Z"
          fill="black"
        />
        <path
          d="M14.1543 3.73849C13.6692 2.89625 13.0138 2.15522 12.2266 1.55875C11.4394 0.962254 10.5361 0.522287 9.56951 0.264537C8.60295 0.00679714 7.59252 -0.0635426 6.59727 0.057635C5.60205 0.178811 4.64198 0.489067 3.77322 0.970281C2.90446 1.45148 2.14441 2.09398 1.53756 2.8602C0.930698 3.62642 0.489166 4.50099 0.238811 5.4328C-0.0115494 6.36459 -0.0657297 7.3349 0.079439 8.287C0.224608 9.23912 0.566215 10.1539 1.08428 10.9779L8.68147 23.7614C8.68518 22.4988 9.03339 21.259 9.6915 20.1654L16.8276 8.19798L14.1543 3.73849Z"
          fill="black"
        />
        <path
          d="M52.5181 0.400146C49.2612 0.400146 46.0772 1.32652 43.3691 3.06211C40.6611 4.79771 38.5504 7.26457 37.3039 10.1508C36.0575 13.0369 35.7313 16.2129 36.3667 19.2767C37.0022 22.3407 38.5705 25.1551 40.8737 27.3642C43.1768 29.5732 46.111 31.0775 49.3055 31.6869C52.5 32.2964 55.8111 31.9836 58.8203 30.7881C61.8293 29.5926 64.4012 27.5681 66.2107 24.9706C68.0204 22.3731 68.9861 19.3193 68.9861 16.1954C68.9861 12.0062 67.2511 7.98861 64.1627 5.02645C61.0745 2.06428 56.8857 0.400146 52.5181 0.400146ZM52.5181 21.4604C51.4325 21.4604 50.3713 21.1516 49.4686 20.573C48.5658 19.9945 47.8622 19.1722 47.4467 18.2102C47.0313 17.2481 46.9225 16.1894 47.1344 15.1681C47.3463 14.1468 47.8691 13.2087 48.6367 12.4724C49.4044 11.736 50.3825 11.2346 51.4474 11.0314C52.5122 10.8283 53.6158 10.9325 54.6189 11.331C55.6219 11.7295 56.4792 12.4044 57.0824 13.2702C57.6855 14.136 58.0075 15.154 58.0075 16.1954C58.0075 17.5916 57.4292 18.9309 56.3997 19.9183C55.3703 20.9056 53.974 21.4604 52.5181 21.4604Z"
          fill="black"
        />
      </Logo>
    ),
    [],
  );

  const onSubmit = (data) => {
    setInvalidEmail(false);
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_HOST}/admin/login`, {
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
        setInvalidEmail(false);
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          setLoading(false);
          fetchUserDataAsync().then(() => {
            history.push('/');
          });
        }
        // throw new Error('Network response was not ok');
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
          <AnimateText size="extraLarge">Welcome back!</AnimateText>
          <SmallText>Login to your account using email and password</SmallText>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout>
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
                label="Password"
                placeholder="Password"
                labelHidden
                type="password"
                name="password"
              />
              <FormContent>
                <Checkbox
                  label="Stay signed in"
                  checked={checked}
                  onChange={handleChange}
                />
                <Button plain>Forgotten Password</Button>
              </FormContent>
              <Button primary fullWidth submit loading={loading}>
                Login
              </Button>
            </FormLayout>
          </Form>
          <SmallText>
            Don&apos;t have a Vop account? <Button plain>Sign Up</Button>
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
      {/* <Col lg={24} sm={12} align="middle">
            <Card
              title={<div className="text-align"><img src="vop-black-300.png" style={{ width: 150 }} alt="Tokshop" /></div>}
              bordered={false} style={{ width: 300 }}>

                <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Item
                    validateStatus={invalidEmail ? "error" : null}
                    help={invalidEmail ? "Incorrect email or password" : null}>
                    <Controller as={Input} control={control}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                                name="email"/>
                </Form.Item>
                <Form.Item>
                    <Controller as={Input} control={control}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                name="password"
                    />
                </Form.Item>
                <Form.Item>
                  <Row>
                    <Col span={12}>

                      <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        Log in
                      </Button>
                    </Col>
                    <Col span={12}>
                      <div>
                        <Link className="login-form-forgot" to="/email/confirm">
                          Forgot password?
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Form.Item>
              </form>
            </Card>
        </Col> */}
    </LoginContainer>
  );
};
