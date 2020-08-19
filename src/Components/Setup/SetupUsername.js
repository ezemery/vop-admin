import React,{ useState }  from 'react';
import { Steps, Icon, Input, Button, Card, Row, Col, Statistic, Alert } from 'antd';
import 'whatwg-fetch'
import {OnboardingSteps} from "./styles"
import {useParams} from "react-router-dom";

const { Step } = Steps;

const SetupUsername = ({complete, showSteps, username}) => {

    const [newUsername, setNewUsername] = useState(username);
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { userId, accountId } = useParams();

    const LoadUser = () => {
        setShowDetails(false)
        setLoading(true)
        setError(null)
        fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/social/tiktok/user`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: newUsername,
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            setLoading(false)
            if (json.found) {
                setShowDetails(json)
            } else {
                setError("Unable to find username")
            }
        }).catch(function(ex) {
            setLoading(false)
            setError("Error validating username")
        })

    };
    const saveUsername = () => {
        fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/social/tiktok/user_save`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: newUsername,
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            if (json === "Success") {
                complete();
                setShowDetails(false)
            }
        }).catch(function(ex) {
    
        })

    };
    
    const onSubmit = () => { LoadUser() };
    const onSubmitValid = data => { saveUsername() };
    return (
        <Card title="Setup Username" bordered={false}>
            <OnboardingSteps>
            { showSteps ? <div><Steps current={1}>
                <Step />
                <Step />
                <Step />
            </Steps><p>&nbsp;</p></div> : "" }
            </OnboardingSteps>
            <p> Enter your Tiktok username </p>
            <Input
                name="username"
                onChange={(e) => {
                    setNewUsername(e.target.value)
                    setShowDetails(false)
                    setError(null)
                }}
                value={newUsername}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="TikTok Username"
            />
            { error != null ? (  <div>
                    <div style={{height:"10px"}} />
                    <Alert message={error} type="error" showIcon />
                    </div>) : ""}

                { (showDetails === false) ? (
                    <div>
                        <div style={{height:"10px"}} />
                        <Button type="primary" onClick={onSubmit} className="login-form-button" loading={loading}>Validate</Button>
                        <Button onClick={complete} style={{float:"right"}} hidden={!showSteps}>Skip</Button>
                    </div>

                ) : (
                    <div>
                        <div style={{height:"10px"}} />
                        <Alert message="Username is valid" type="success" showIcon />
                        <div style={{height:"10px"}} />
                        <Row gutter={16}>
                            <Col span={8}>
                                <Statistic title="Likes" value={showDetails.likes} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Followers" value={showDetails.followers}/>
                            </Col>
                            <Col span={8}>
                                <Statistic title="Following" value={showDetails.following} />
                            </Col>
                        </Row>
                        <div style={{height:"10px"}} />
                        <Button type="primary" onClick={onSubmitValid} className="login-form-button">Save</Button>
                    </div>

                )}
        </Card>
    );
};

export default SetupUsername
