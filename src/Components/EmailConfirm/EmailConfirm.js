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
import {useForm, Controller} from 'react-hook-form';
import {Icons} from '../Icons';
import {
  LoginContainer,
  LoginForm,
  Logo,
  FormContent,
  Text,
  AnimateText,
  SmallText,
  Box,
  SVGIcon,
  Background,
  LeftSide,
  RightSide,
  CompanyDesc,
} from '../styles';

export const EmailConfirm = (props) => {
  const history = useHistory();

  const {handleSubmit, control} = useForm();
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const LogoSVG = () => (
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
  );

  const Forgot = () => (
    <SVGIcon
      viewBox="0 0 167 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M94.5566 120.213C97.9136 119.763 100.27 116.676 99.819 113.319C99.3684 109.962 96.2818 107.606 92.9249 108.057C89.5679 108.507 87.2118 111.594 87.6625 114.951C88.1131 118.308 91.1997 120.664 94.5566 120.213Z"
        fill="#B3BCF5"
      />
      <path
        d="M119.243 149.695L43.5682 159.853C36.8651 160.752 30.6796 156.031 29.7799 149.328L23.0895 99.4857C22.1898 92.7825 26.9112 86.5971 33.6143 85.6973L121.142 73.9484C122.526 73.7627 123.64 73.7374 124.549 73.8707C127.9 74.362 131.015 72.0436 131.507 68.6925C131.998 65.3414 129.68 62.2265 126.329 61.7348C124.273 61.4334 122.043 61.4522 119.51 61.7921L112.205 62.7727L109.327 41.3364C106.685 21.6515 88.1751 7.83278 68.0657 10.5321C47.9563 13.2314 33.7456 31.4422 36.3879 51.1271L39.2653 72.5634L31.9826 73.541C18.5763 75.3405 9.13344 87.7115 10.933 101.118L17.6233 150.96C19.4228 164.366 31.7938 173.809 45.2001 172.009L120.875 161.852C124.232 161.401 126.588 158.314 126.137 154.957C125.687 151.6 122.6 149.244 119.243 149.695ZM48.5445 49.4953C46.8019 36.5136 56.2912 24.4882 69.6975 22.6887C83.1038 20.8891 95.4283 29.9865 97.1709 42.9682L100.048 64.4045L51.4219 70.9317L48.5445 49.4953Z"
        fill="#B3BCF5"
      />
      <path
        d="M71.7629 123.273C75.1199 122.822 77.476 119.736 77.0253 116.379C76.5747 113.022 73.4881 110.666 70.1312 111.116C66.7742 111.567 64.4181 114.653 64.8687 118.01C65.3194 121.367 68.406 123.723 71.7629 123.273Z"
        fill="#B3BCF5"
      />
      <path
        d="M159.424 100.742C157.708 88.9717 146.795 80.7152 134.975 82.3018C123.074 83.8994 114.69 94.8826 116.287 106.785C116.738 110.142 119.824 112.498 123.182 112.047C126.539 111.597 128.895 108.51 128.444 105.153C127.746 99.9539 131.408 95.1562 136.608 94.4583C141.807 93.7604 146.604 97.4226 147.302 102.622C147.31 102.677 147.318 102.732 147.326 102.786C147.763 106.517 145.975 110.149 142.737 112.076C137.139 115.41 134.087 121.782 134.964 128.311L135.669 133.568C136.12 136.925 139.207 139.281 142.564 138.83C145.921 138.379 148.277 135.293 147.826 131.936L147.12 126.679C146.899 125.027 147.641 123.432 149.011 122.616C156.525 118.143 160.628 109.654 159.462 100.988C159.451 100.905 159.438 100.824 159.424 100.742Z"
        fill="#5C6AC4"
      />
      <path
        d="M145.188 158.588C148.545 158.137 150.901 155.051 150.451 151.694C150 148.337 146.913 145.981 143.556 146.431C140.199 146.882 137.843 149.969 138.294 153.326C138.745 156.683 141.831 159.039 145.188 158.588Z"
        fill="#5C6AC4"
      />
      <path
        d="M48.9694 126.332C52.3263 125.882 54.6824 122.795 54.2318 119.438C53.7812 116.081 50.6945 113.725 47.3376 114.176C43.9806 114.626 41.6246 117.713 42.0752 121.07C42.5258 124.427 45.6124 126.783 48.9694 126.332Z"
        fill="#B3BCF5"
      />
    </SVGIcon>
  );
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
          <AnimateText size="extraLarge">Forgot Password</AnimateText>
          <SmallText>
            Enter your registered email address below and we’ll help you recover
            your account.
          </SmallText>
          <Form>
            <FormLayout>
              <TextField
                type="email"
                label="Email"
                labelHidden
                onChange={() => {}}
                value=""
                prefix={<Icon source={EmailMajorMonotone} />}
                placeholder="Email"
                error=""
              />
              <Button primary fullWidth>
                Send Email
              </Button>
            </FormLayout>
          </Form>
          <SmallText>
            Go back to <Button plain>Login</Button>
          </SmallText>
        </LoginForm>
        <CompanyDesc>
          <Icons />
        </CompanyDesc>
      </LeftSide>
      <RightSide>
        <Box />
        <Forgot />
      </RightSide>
    </LoginContainer>
  );
};

// import React from 'react'
// import {Form, Input, Button, Row, Col, Typography} from 'antd';
// import { Link } from "react-router-dom";
// import {EmailContainer} from "./styles"

// const { Title } = Typography;

// export default function EmailConfirm() {

//     const [validate, setvalidate] = React.useState("");
//     const [help, setHelp] = React.useState("");
//     const [email, setEmail] = React.useState("");
//     const sendEmail = (email) => {

//         setvalidate("validating");
//         fetch(process.env.REACT_APP_API_HOST + `/admin/password/forgot/${email}`, {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(function(response) {
//             return response.json();
//         }).then(function(json) {
//             if(json.error){
//                 setHelp(json.message)
//                 setvalidate("error");
//                 return;
//             }
//             setHelp(json.message)
//             setvalidate("success");

//         }).catch(function(ex) {
//             setvalidate("error");
//             setHelp("An error occured while processing your request")
//         });

//       }
//       const formSubmit = (e) => {
//         e.preventDefault();
//         if(email.length === 0){
//             setHelp("Email field cannot be empty")
//             setvalidate("warning");
//             return;
//         }
//             sendEmail(email);
//       };

//       const changeEmail = (e) => {
//         setEmail(e.target.value);
//       }

//     return (
//         <EmailContainer>
//             <div className="email-container">
//                 <Row className="logo-div">
//                 <div className="logo"> <img src="/vop-black-300.png" alt="Tokshop" /></div>
//                 </Row>
//                 <Row className="email-title_container">
//                     <Col lg={24} sm={12}>
//                         <Title level={3} className="text-align">Enter a registered email address </Title>
//                     </Col>
//                 </Row>
//             <Row type="flex" justify="center" align="middle" className="full-height">
//                         <Form
//                             name="basic"
//                             onSubmit={formSubmit}
//                             >
//                                 <Col span={24}>
//                                     <Form.Item
//                                         name="email"
//                                         validateStatus={validate}
//                                         help={help}
//                                         hasFeedback
//                                         rules={[{ required: true, message: 'Fill in your registered email address' }]}
//                                         >
//                                         <Input placeholder="Email" id="email" value={email} onChange={changeEmail}/>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col span={24}>
//                                     <Form.Item >
//                                         <Button type="primary" htmlType="submit" className="full-width">
//                                             Submit
//                                         </Button>
//                                     </Form.Item>
//                                 </Col>
//                                 <Col lg={24} sm={12} className="text-align" >
//                                     <Link className="login-form-forgot" to="/login">
//                                     &lt; Back to Login
//                                 </Link>
//                                 </Col>
//                             </Form>
//                 </Row>
//             </div>
//         </EmailContainer>
//     )
// }
