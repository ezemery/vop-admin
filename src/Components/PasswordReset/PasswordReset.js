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
import {Icons, LogoSVG} from '../Icons';
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

export const PasswordReset = (props) => {
  const history = useHistory();

  const {handleSubmit, control} = useForm();
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const [help, setHelp] = React.useState("");
  const [loading, setLoading] = useState(false);

  const Forgot = useCallback(() => (
    <SVGIcon
      viewBox="0 0 174 157"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8276 78.5002C10.8276 41.1258 41.1255 10.8279 78.4998 10.8279C115.874 10.8279 146.172 41.1258 146.172 78.5002V92.0346H150.855L135.345 110.647L119.834 92.0346H124.517V81.2071C124.517 52.8026 101.49 29.7761 73.0861 29.7761C44.6816 29.7761 21.6551 52.8026 21.6551 81.2071H32.4827C32.4827 58.7825 50.6615 40.6037 73.0861 40.6037C95.5106 40.6037 113.689 58.7825 113.689 81.2071H96.7172L135.345 127.565L173.972 81.2071H157V78.5002C157 35.1459 121.854 0.000338364 78.5002 2.44312e-09C35.1459 -0.000338359 0 35.1456 0 78.4998C0 120.723 33.3986 155.382 75.5926 156.946L75.9932 146.119C39.5653 144.898 10.7017 114.948 10.8276 78.5002Z"
        fill="#B3BCF5"
      />
      <path d="M97.4482 146.172H86.6206V157H97.4482V146.172Z" fill="#5C6AC4" />
      <path d="M119.103 146.172H108.276V157H119.103V146.172Z" fill="#5C6AC4" />
      <path d="M140.758 146.172H129.931V157H140.758V146.172Z" fill="#5C6AC4" />
    </SVGIcon>
  ),[]);

  const onSubmit = (data) => {
    setLoading(true);
    const token = window.location.href.split("/").slice("-1");
    const {new_password, confirm_password} = data
    if(new_password !== confirm_password ){
      setHelp("Passwords must be the same")
      setLoading(false)
      return;
    }
    const password = {new_password}
    fetch(`${process.env.REACT_APP_API_HOST}/admin/password/reset/${token[0]}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
           'Content-Type': 'application/json'
       },
           body: JSON.stringify(password)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
          if(json.error){
                setHelp(json.message)
                return;
            }
              setTimeout(()=>{
                  history.push('/login');
              }, 200)
            throw new Error('Network response was not ok');
          })
      .catch((ex) => {
        setLoading(false);
        setHelp("An error occured while processing your request")
      });
  };

  return (
    <LoginContainer>
      <LeftSide>
        <LogoSVG />
        <LoginForm>
          <AnimateText size="extraLarge">Account recovery</AnimateText>
          <SmallText>
            Your password has been reset. Please create a new password to log
            into your account.
          </SmallText>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout>
            <Controller
                as={TextField}
                control={control}
                prefix={<Icon source={LockMajorMonotone} />}
                label="New Password"
                placeholder="New Password"
                labelHidden
                type="password"
                name="new_password"
                error={help ? help : null}
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
              <Button primary fullWidth submit loading={loading}>
                Reset Password
              </Button>
            </FormLayout>
          </Form>
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
// import {useHistory} from "react-router-dom";
// import {ResetContainer} from "./styles"

// const { Title } = Typography;

// export default function PasswordReset() {
//     const history = useHistory();
//     const [validate, setvalidate] = React.useState("");
//     const [help, setHelp] = React.useState("");
//     const [password, setPassword] = React.useState("");
//     const resetPassword = (password) => {
//         setvalidate("validating");
//         const token = window.location.href.split("/").slice("-1");
//         const data = {
//             "new_password" : password
//          }
//         fetch(process.env.REACT_APP_API_HOST + `/admin/password/reset/${token[0]}`, {
//             method: 'POST',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         }).then(function(response) {
//             return response.json();
//         }).then(function(json) {
//             if(json.error){
//                 setHelp(json.message)
//                 setvalidate("error");
//                 return;
//             }
//             setHelp("Password reset was successful")
//             setvalidate("success");
//             setTimeout(()=>{
//                 history.push('/login');
//             }, 200)

//         }).catch(function(ex) {
//             setvalidate("error");
//             setHelp("An error occured while processing your request")
//         });

//       }

//     const formSubmit = (e) => {
//         e.preventDefault();
//         if(password.length === 0){
//             setHelp("Password fields cannot be empty")
//             setvalidate("warning");
//             return;
//         }
//             resetPassword(password);
//       };

//       const changePassword = (e) => {
//         setPassword(e.target.value);
//       }
//       const checkPassword = (e) => {
//         if(e.target.value !== password){
//             setvalidate("error");
//             setHelp("Passwords do not match")
//         }else{
//             setvalidate("success");
//             setHelp("Passwords match")
//         }
//       }

//     return (
//         <ResetContainer>
//         <div className="reset-container">
//             <Row className="logo-div">
//              <div className="logo"> <img src="/vop-black-300.png" alt="Tokshop" /></div>
//             </Row>
//             <Row className="reset-title_container">
//                 <Col lg={24} sm={12}>
//                      <Title level={3} style={{textAlign:"center"}}>Reset your password </Title>
//                 </Col>
//             </Row>
//             <Row type="flex" justify="center" align="middle" className="full-height">
//                     <Form
//                         name="basic"
//                         onSubmit={formSubmit}
//                         >
//                             <Col span={24}>
//                                 <Form.Item
//                                     name="new-password"
//                                     rules={[{ required: true, message: 'Enter new password'}]}
//                                     >
//                                     <Input.Password placeholder="New password" id="new-password" value={password} onChange={changePassword}/>
//                                 </Form.Item>
//                             </Col>
//                             <Col span={24}>
//                                 <Form.Item
//                                     name="confirm-password"
//                                     validateStatus={validate}
//                                     hasFeedback
//                                     help={help}
//                                     rules={[{ required: true, message: 'confirm new password' }]}
//                                     >
//                                     <Input.Password placeholder="Confirm  Password" id="confirm-password" onChange={checkPassword}/>
//                                 </Form.Item>
//                             </Col>
//                             <Col span={24}>
//                                 <Form.Item >
//                                     <Button type="primary" htmlType="submit" style={{width:"100%"}}>
//                                         Submit
//                                     </Button>
//                                 </Form.Item>
//                             </Col>
//                         </Form>
//             </Row>
//         </div>
//      </ResetContainer>
//     )
// }
