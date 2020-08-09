import React from 'react'
import {Form, Input, Button, Row, Col, Typography} from 'antd';
import {useHistory} from "react-router-dom";
import {ResetContainer} from "./styles"


const { Title } = Typography;

export default function PasswordReset() {
    const history = useHistory();
    const [validate, setvalidate] = React.useState("");
    const [help, setHelp] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    const formSubmit = (e) => {
        e.preventDefault();
        if(password.length === 0){
            setHelp("Password fields cannot be empty")
            setvalidate("warning");
            return;
        }
            resetPassword(password);
      };
    
      const changePassword = (e) => {
        setPassword(e.target.value);
      }
      const checkPassword = (e) => {
        if(e.target.value !== password){
            setvalidate("error");
            setHelp("Passwords do not match")
        }else{
            setvalidate("success");
            setHelp("Passwords match")
        }
      }
      const resetPassword = (password) => {
        setvalidate("validating");
        const token = window.location.href.split("/").slice("-1");
        console.log(token)
        const data = {
            "new_password" : password
         }
        fetch(`/api/password/reset/${token[0]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            if(json.error){
                setHelp(json.message)
                setvalidate("error");
                return;
            }
            setHelp("Password reset was successful")
            setvalidate("success");
            setTimeout(()=>{
                history.push('/login');
            }, 200)
           
        }).catch(function(ex) {
            setvalidate("error");
            setHelp("An error occured while processing your request")
        });

      }

    return (
        <ResetContainer>
        <div className="reset-container">
            <Row className="logo-div">
             <div className="logo"> <img src="/../vop-black-300.png" alt="Tokshop" /></div>
            </Row>
            <Row className="reset-title_container">
                <Col lg={24} sm={12}>
                     <Title level={3} style={{textAlign:"center"}}>Reset your password </Title>
                </Col>   
            </Row>
            <Row type="flex" justify="center" align="middle" className="full-height">
                    <Form
                        name="basic"
                        onSubmit={formSubmit}
                        >
                            <Col span={24}>
                                <Form.Item
                                    name="new-password"
                                    rules={[{ required: true, message: 'Enter new password'}]}
                                    >
                                    <Input.Password placeholder="New password" id="new-password" value={password} onChange={changePassword}/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="confirm-password"
                                    validateStatus={validate}
                                    hasFeedback
                                    help={help}
                                    rules={[{ required: true, message: 'confirm new password' }]}
                                    >
                                    <Input.Password placeholder="Confirm  Password" id="confirm-password" onChange={checkPassword}/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" style={{width:"100%"}}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Form>  
            </Row>
        </div>
     </ResetContainer>
    )
}