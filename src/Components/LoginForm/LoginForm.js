import React from 'react';
import { Form, Icon, Input, Button, Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import {LoginContainer} from "./styles"


const LoginForm = (props) => {

    return (
      <LoginContainer type="flex" justify="space-around" align="middle">
        <Col lg={24} sm={12} align="middle">
            <Card 
              title={<div className="text-align"><img src="vop-black-300.png" style={{ width: 150 }} alt="Tokshop" /></div>}
              bordered={false} style={{ width: 300 }}>

                <form method="POST" action="/login/go">
                <Form.Item>
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Email"
                      name="email"
                    />
                </Form.Item>
                <Form.Item>
                  <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                </Form.Item>
                <Form.Item>
                  <Row>
                    <Col span={12}>

                      <Button type="primary" htmlType="submit" className="login-form-button">
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