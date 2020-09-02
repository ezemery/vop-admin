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
import {logo} from '../../services';
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
  const {users, fetchUserDataAsync, setActiveUser} = React.useContext(UserStore);
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(users)
  const onSubmit = (data) => {

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

  const switchUser = (id) => {
      setActiveUser(id);
      history.push(`/account`);
  }

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
      onClick={() => switchUser(user.id)}
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
        <img src={logo("#000")} width="80px"/>
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
