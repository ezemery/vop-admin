import React, {useState, useCallback} from 'react';
// import { Form, Icon, Input, Button, Card, Row, Col } from 'antd';
import {
  FormLayout,
  TextField,
  Icon,
  Button,
  Checkbox,
  Form,
  DisplayText,
} from '@shopify/polaris';
import {EmailMajorMonotone, LockMajorMonotone} from '@shopify/polaris-icons';

import {Link, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {Icons, LogoSVG} from '../Icons';
import {UserStore} from '../../Context/store';
import {
  LoginContainer,
  LoginForm,
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
  const {users, fetchUserDataAsync} = React.useContext(UserStore);
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(!data.email);


    if(!data.email || !data.password){
      setLoading(false);
      setInvalidEmail(true);
      return;
    }

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

  const Logo = useCallback(
    () => (
      <svg
        width="90"
        height="39"
        viewBox="0 0 90 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M75.7587 0.104982C72.0547 0.103275 68.4956 1.48497 65.8356 3.95725C63.1755 6.42952 61.6236 9.79809 61.5088 13.3491V34.1606H61.5895C61.7509 35.2466 62.3152 36.2404 63.1791 36.9592C64.043 37.6781 65.1483 38.0738 66.292 38.0738C67.4358 38.0738 68.5409 37.6781 69.4048 36.9592C70.2687 36.2404 70.8331 35.2466 70.9945 34.1606V26.657C72.9512 27.3214 75.0358 27.5678 77.1021 27.3789C79.1687 27.1901 81.1671 26.5705 82.9578 25.5633C84.7485 24.5563 86.2881 23.1862 87.4691 21.5489C88.6501 19.9115 89.4438 18.0465 89.7949 16.0842C90.146 14.122 90.0458 12.1097 89.5013 10.1884C88.957 8.26713 87.9816 6.48309 86.6433 4.96113C85.3051 3.43915 83.6363 2.21598 81.7538 1.37717C79.8711 0.538367 77.8203 0.104182 75.7445 0.104982H75.7587ZM75.7587 18.2968C74.8193 18.2968 73.901 18.0297 73.1198 17.529C72.3387 17.0284 71.7298 16.3168 71.3703 15.4844C71.0108 14.6519 70.9167 13.7358 71.1 12.852C71.2834 11.9683 71.7357 11.1565 72.4 10.5194C73.0643 9.88221 73.9107 9.44829 74.832 9.2725C75.7534 9.09671 76.7085 9.18694 77.5765 9.53177C78.4444 9.87659 79.1863 10.4605 79.7082 11.2098C80.2301 11.959 80.5087 12.8398 80.5087 13.7409C80.5087 14.9493 80.0083 16.108 79.1175 16.9624C78.2267 17.8168 77.0185 18.2968 75.7587 18.2968Z"
          fill="black"
        />
        <path
          d="M27.4599 0.943066C25.9618 0.111515 24.1808 -0.115649 22.5082 0.311481C20.8356 0.738608 19.4082 1.78508 18.5394 3.22104L9.73777 18.0461C9.16822 18.9892 8.86545 20.0586 8.85947 21.1484C8.85348 22.2383 9.14447 23.3108 9.70363 24.2596C10.2628 25.2083 11.0707 26.0006 12.0473 26.5576C13.024 27.1148 14.1353 27.4175 15.2715 27.4358H15.623H15.7798H15.9698C16.2364 27.4138 16.5014 27.3758 16.763 27.322C17.4302 27.1882 18.0715 26.9545 18.6629 26.6294L18.7865 26.5519L18.8672 26.5018C19.0192 26.4107 19.1665 26.3151 19.3137 26.2103C20.0845 25.6522 20.7158 24.9362 21.1615 24.1145L29.8729 9.49911C30.3006 8.78545 30.5775 7.99792 30.6877 7.18157C30.798 6.36522 30.7393 5.53604 30.5152 4.74143C30.2912 3.94681 29.9059 3.20235 29.3817 2.5506C28.8575 1.89886 28.2045 1.3526 27.4599 0.943066Z"
          fill="black"
        />
        <path
          d="M12.248 3.23498C11.8281 2.50617 11.2611 1.86495 10.5799 1.34881C9.89868 0.832654 9.11704 0.451943 8.28066 0.228908C7.44428 0.00588168 6.56993 -0.0549845 5.70873 0.0498725C4.84754 0.154728 4.01678 0.423197 3.26503 0.839601C2.51327 1.25599 1.8556 1.81195 1.33048 2.47498C0.805348 3.138 0.423283 3.89478 0.206647 4.70109C-0.00999386 5.50738 -0.056877 6.34701 0.0687399 7.17088C0.194357 7.99477 0.489955 8.78636 0.938246 9.49939L7.51222 20.5611C7.51543 19.4686 7.81674 18.3958 8.38622 17.4495L14.5612 7.09385L12.248 3.23498Z"
          fill="black"
        />
        <path
          d="M45.4452 0.34668C42.627 0.34668 39.8718 1.14829 37.5284 2.65012C35.1851 4.15196 33.3587 6.28658 32.28 8.78405C31.2016 11.2815 30.9193 14.0297 31.4691 16.6809C32.019 19.3322 33.3761 21.7675 35.3691 23.6792C37.362 25.5906 39.901 26.8923 42.6653 27.4197C45.4295 27.947 48.2946 27.6764 50.8986 26.6419C53.5023 25.6074 55.7278 23.8556 57.2936 21.6079C58.8595 19.3602 59.6952 16.7177 59.6952 14.0145C59.6952 10.3896 58.1939 6.9131 55.5215 4.34989C52.8492 1.78668 49.2246 0.34668 45.4452 0.34668ZM45.4452 18.5704C44.5058 18.5704 43.5875 18.3033 42.8064 17.8026C42.0252 17.302 41.4163 16.5904 41.0568 15.758C40.6973 14.9255 40.6032 14.0094 40.7866 13.1256C40.9699 12.2419 41.4223 11.4301 42.0866 10.793C42.7509 10.1558 43.5973 9.72189 44.5187 9.5461C45.4401 9.3703 46.3951 9.46052 47.263 9.80535C48.1309 10.1502 48.8728 10.7341 49.3948 11.4834C49.9166 12.2326 50.1953 13.1134 50.1953 14.0145C50.1953 15.2227 49.6948 16.3816 48.804 17.236C47.9132 18.0904 46.705 18.5704 45.4452 18.5704Z"
          fill="black"
        />
      </svg>
    ),
    [],
  );

  const switchPath = (id) => (
    history.push(`/id/${id}`)
  )

  const UserBody = () => {
    const Content = () => users.map((user, indx) => {
      const UsernameInitials = () => {
        return user.username.toUpperCase().slice(0,1);
      }

      const UsernameCapitalize = () => {
        return user.username.charAt(0).toUpperCase() + user.username.slice(1);
      }

    return <div 
      key={indx}
      style={{
        display: 'flex',
        justifyContent: 'start',
        margin: '10px',
        padding:"10px",
        alignItems: 'center',
        borderBottom:"1px solid #DFE3E8",
        cursor:"pointer"
      }}
      onClick={() => switchPath(user.id)}
      >
        <div style={{display:"flex", alignItems:"center",justifyContent:"center", marginRight:"10px", width:"30px",height:"30px", padding:"10px", borderRadius:"50%", background:"green", color:"white"}}>{UsernameInitials()}</div>
           <div>{UsernameCapitalize()} <br/>{user.email}</div>
       </div>
    }) 

   return (
   <div style={{boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",borderRadius: "3px", padding:"50px"}}>
           <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
         <Logo />
        </div>
        
         <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
         
          <DisplayText size="medium">
            Choose an account
          </DisplayText>
        </div>
          <Content/>

  </div>
  )
}

  const LoginBody = useCallback(()=>(
    <>
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
          <Button url="/email/confirm/" plain>Forgotten Password</Button>
        </FormContent>
        <Button primary fullWidth submit loading={loading}>
          Login
        </Button>
      </FormLayout>
    </Form>
    <SmallText>
      Don&apos;t have a Vop account? <Button url="/create" plain>Sign Up</Button>
    </SmallText>
    </>
  ),[])
  
  const View = () =>{
    if(users.length > 0){
      return <UserBody/>

    }else{
        return <LoginBody/>
    }
  }

  return (
    <LoginContainer>
      <LeftSide>
        <LogoSVG />
        <LoginForm>
           <View/>
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
