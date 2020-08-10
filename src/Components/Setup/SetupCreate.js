import React from 'react';
import { useState, useEffect } from 'react';
import { Steps, Form, Icon, Input, Button, Card} from 'antd';
import {useHistory} from "react-router-dom";
import 'whatwg-fetch'
import { useForm } from 'react-hook-form'
import {OnboardingSteps} from "./styles"


const { Step } = Steps;

const SetupCreate = (props) => {

    const history = useHistory();
    const [invalidEmail, setInvalidEmail] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = data => { createUser(data) };

    useEffect(() => {
        register({ name: 'email' }, { required: true });
        register({ name: 'password' }, { required: true });
    }, [register]);

    const createUser = ({email, password}) => {
        setInvalidEmail(false)
        fetch(process.env.REACT_APP_API_HOST + '/api/user', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log('parsed json', json);
            if (json === "Success") {
                history.push('/setup/username');
            } else {
                setInvalidEmail(true)
            }
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })

    };

    return (
        <Card title="Create Email and Password" bordered={false}>
            <OnboardingSteps>
            <Steps current={0}>
                <Step />
                <Step />
                <Step />
            </Steps>
            </OnboardingSteps>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>&nbsp;</p>
                <Form.Item
                    label="Enter your email address"
                    validateStatus={invalidEmail ? "error" : null}
                    help={invalidEmail ? "Invalid Email or already used" : null}
                >
                    <Input
                        name="email"
                        onChange={(e) => setValue('email', e.target.value)}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                    />
                </Form.Item>
                <p> Enter a password </p>
                <Input
                    name="password"
                    type="password"
                    onChange={(e) => setValue('password', e.target.value)}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Password"
                />
                <p>&nbsp;</p>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Next
                </Button>
            </form>
        </Card>
    );
};

export default SetupCreate