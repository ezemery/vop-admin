import React,{ useState,useContext }  from 'react';
import { Steps, Icon, Input, Button, Card, Row, Col, Statistic, Alert } from 'antd';
import 'whatwg-fetch'
import {OnboardingSteps} from "./styles"
import {useParams} from "react-router-dom";
import {UserStore,FrameStore,AccountStore} from "../../Context/store";

const { Step } = Steps;

export const SetupUsername = ({complete, showSteps, username}) => {
    const {user} = React.useContext(UserStore);
    const {updateActiveAccount} = React.useContext(AccountStore);
    const { unsetIsLoading, setIsLoading } = useContext(FrameStore);
    const userId = user.id
    const [newUsername, setNewUsername] = useState(username);
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { accountId } = useParams();
    
    

    const LoadUser = async () => {
        setShowDetails(false)
        setLoading(true)
        setError(null)
        try{
            const response  =   await fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/social/tiktok/user`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: newUsername,
                })
            })
            const json = await response.json();
            setLoading(false)
            if (json.statusCode === 0) {
                setShowDetails(json)
            } else {
                setError("Unable to find username")
            }
        }catch(error){
            setLoading(false)
            setError("Error validating username")
        }
    };

    const saveUsername = async () => {
        setIsLoading()
        try{
            const response = await  fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/social/tiktok/user_save`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: newUsername,
                })
            })

            const json = await response.json();
            if (json.success === true) {
                await updateActiveAccount(userId);
                unsetIsLoading();
                setShowDetails(false)
                complete();
            }
        }catch(error){

        }
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
                                <Statistic title="Likes" value={showDetails.body.userData.heart} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Followers" value={showDetails.body.userData.fans}/>
                            </Col>
                            <Col span={8}>
                                <Statistic title="Following" value={showDetails.body.userData.following} />
                            </Col>
                        </Row>
                        <div style={{height:"10px"}} />
                        <Button type="primary" onClick={onSubmitValid} className="login-form-button">Save</Button>
                    </div>

                )}
        </Card>
    );
};
