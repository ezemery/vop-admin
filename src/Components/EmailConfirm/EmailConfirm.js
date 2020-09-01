import React, {useState, useCallback} from 'react';
import {
  FormLayout,
  TextField,
  Icon,
  Button,
  Heading,
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

export const EmailConfirm = (props) => {
  const history = useHistory();
  const {handleSubmit, control} = useForm();
  const [help, setHelp] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState("")

  const onSubmit = (data) => {
    setLoading(true);
    const {email} = data;

    fetch(`${process.env.REACT_APP_API_HOST}/admin/password/forgot/${email}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
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
        setEmailSent(email)
        return;
      })
      .catch((ex) => {
        setLoading(false);
        setHelp("An error occured while processing your request")
      });
  };

  const Confirm = useCallback(() => (
    <SVGIcon viewBox="0 0 157 157" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M112.562 57.5209C110.011 54.9664 105.864 54.9664 103.313 57.5209L75.2292 85.601L63.4999 73.875C60.9487 71.3205 56.8013 71.3205 54.25 73.875C51.6955 76.4296 51.6955 80.5704 54.25 83.125L70.6042 99.4791C71.8798 100.758 73.5545 101.396 75.2292 101.396C76.9038 101.396 78.5785 100.758 79.8541 99.4791L112.562 66.7708C115.117 64.2163 115.117 60.0754 112.562 57.5209Z" fill="#5C6AC4"/>
    <path d="M150.458 71.9583C146.847 71.9583 143.917 74.889 143.917 78.5C143.917 114.571 114.571 143.917 78.5 143.917C42.4292 143.917 13.0833 114.571 13.0833 78.5C13.0833 42.4292 42.4292 13.0833 78.5 13.0833C96.0611 13.0833 112.546 19.9455 124.923 32.4074C127.464 34.975 131.609 34.9881 134.173 32.4401C136.737 29.8954 136.75 25.7545 134.206 23.1902C119.356 8.23596 99.5707 0 78.5 0C35.2138 0 0 35.2138 0 78.5C0 121.786 35.2138 157 78.5 157C121.786 157 157 121.786 157 78.5C157 74.889 154.069 71.9583 150.458 71.9583Z" fill="#B3BCF5"/>
    </SVGIcon>

  ),[])

  const Forgot = useCallback(() => (
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
  ),[]);

  const EmailSent = ()=>{
    if(emailSent){
      return (
        <>
        <AnimateText size="extraLarge">Account recovery</AnimateText>
        <SmallText>
        We have sent a reset link to your email address <Heading>{emailSent}</Heading>Please go to your inbox and click the reset link to complete your account recovery process.
        </SmallText>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          <Button primary fullWidth url="/email/confirm">
            Resend Email
          </Button>
        </FormLayout>
      </Form>
      </>
      )
    }
    return (
      <>
      <AnimateText size="extraLarge">Forgot Password</AnimateText>
      <SmallText>
        Enter your registered email address below and we’ll help you recover
        your account.
      </SmallText>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout>
        <Controller
            as={TextField}
            control={control}
            prefix={<Icon source={EmailMajorMonotone} />}
            error={help ? help : null}
            label="Email"
            placeholder="Email"
            labelHidden
            type="email"
            name="email"
          />
        <Button primary fullWidth submit loading={loading}>
          Send Email
        </Button>
      </FormLayout>
    </Form>
    </>
    )
  }


  return (
    <LoginContainer>
      <LeftSide>
        <LogoSVG />
        <LoginForm>
           <EmailSent/>
          <SmallText>
            Go back to <Button plain url="/login">Login</Button>
          </SmallText>
        </LoginForm>
        <CompanyDesc>
          <Icons />
        </CompanyDesc>
      </LeftSide>
      <RightSide>
        <Box />
        {emailSent ? <Confirm/> : <Forgot />}
      </RightSide>
    </LoginContainer>
  );
};