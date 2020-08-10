import React from 'react'
import {Form, Input, Button, Row, Col, Typography} from 'antd';
import { Link } from "react-router-dom";
import {EmailContainer} from "./styles"


const { Title } = Typography;

export default function EmailConfirm() {

    const [validate, setvalidate] = React.useState("");
    const [help, setHelp] = React.useState("");
    const [email, setEmail] = React.useState("");


      const formSubmit = (e) => {
        e.preventDefault();
        if(email.length === 0){
            setHelp("Email field cannot be empty")
            setvalidate("warning");
            return;
        }
            sendEmail(email);
      };
    
      const changeEmail = (e) => {
        setEmail(e.target.value);
      }

      const sendEmail = (email) => {

        setvalidate("validating");
        fetch(process.env.REACT_APP_API_HOST + `/api/password/forgot/${email}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            if(json.error){
                setHelp(json.message)
                setvalidate("error");
                return;
            }
            setHelp(json.message)
            setvalidate("success");
           
        }).catch(function(ex) {
            setvalidate("error");
            setHelp("An error occured while processing your request")
            console.log('parsing failed', ex)
        });

      }

    return (
        <EmailContainer>
            <div className="email-container">
                <Row className="logo-div">
                <div className="logo"> <img src="/../vop-black-300.png" alt="Tokshop" /></div>
                </Row>
                <Row className="email-title_container">
                    <Col lg={24} sm={12}>
                        <Title level={3} className="text-align">Enter a registered email address </Title>
                    </Col>   
                </Row>
            <Row type="flex" justify="center" align="middle" className="full-height">
                        <Form
                            name="basic"
                            onSubmit={formSubmit}
                            >
                                <Col span={24}>
                                    <Form.Item
                                        name="email"
                                        validateStatus={validate}
                                        help={help}
                                        hasFeedback
                                        rules={[{ required: true, message: 'Fill in your registered email address' }]}
                                        >
                                        <Input placeholder="Email" id="email" value={email} onChange={changeEmail}/>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" className="full-width">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col lg={24} sm={12} className="text-align" >
                                    <Link className="login-form-forgot" to="/login">
                                    &lt; Back to Login
                                </Link>
                                </Col>
                            </Form>  
                </Row>
            </div>
        </EmailContainer>
    )
}