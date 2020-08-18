import React, {useState} from 'react';
import { Form, Icon, Input, Button, Card, Row, Col } from 'antd';
import {Link, useHistory} from "react-router-dom";
import {LoginContainer} from "./styles"
import { useForm, Controller } from "react-hook-form";


const LoginForm = (props) => {
    const history = useHistory();

    const { handleSubmit, control } = useForm();

    const [invalidEmail, setInvalidEmail] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = data => {
        setInvalidEmail(false);
        setLoading(true)

        fetch(process.env.REACT_APP_API_HOST + '/admin/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        }).then(function(json) {
            if (json.success) {
                history.push("/");
                return
            }
            throw new Error('Network response was not ok');
        }).catch(function(ex) {
            setLoading(false)
            setInvalidEmail(true);
        })
    }

    return (
      <LoginContainer type="flex" justify="space-around" align="middle">
        <Col lg={24} sm={12} align="middle">
            <Card
              title={<div className="text-align"><img src="/vop-black-300.png" style={{ width: 150 }} alt="Tokshop" /></div>}
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
        </Col>
      </LoginContainer>
    );
};

export default LoginForm
