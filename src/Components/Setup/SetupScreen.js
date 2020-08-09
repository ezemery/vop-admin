import React from 'react';
import { Row, Col } from 'antd';
import {Route, Switch, useHistory} from "react-router-dom";
import 'whatwg-fetch'
import SetupUsername from "./SetupUsername";
import SetupCreate from "./SetupCreate";
import SetupTags from "./SetupTags";

const SetupScreen = (props) => {

    const history = useHistory();

    const usernameComplete = () => history.push('/setup/tags');
    const tagComplete = () => window.location.href = "/";

    return (
        <Row type="flex" justify="space-around" align="middle" style={{minHeight: "100%"}}>
            <Col md={12} sm={12}>
                <Switch>
                    <Route path="/setup/create">
                        <SetupCreate/>
                    </Route>
                    <Route path="/setup/username">
                        <SetupUsername complete={usernameComplete} showSteps={true}/>
                    </Route>
                    <Route path="/setup/tags">
                        <SetupTags initialTags={[]} complete={tagComplete} showSteps={true}/>
                    </Route>
                </Switch>
            </Col>
        </Row>
    );
};

export default SetupScreen