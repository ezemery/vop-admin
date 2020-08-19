import React from 'react';
import { Row, Col } from 'antd';
import {Route, Switch, useHistory, useParams} from "react-router-dom";
import 'whatwg-fetch'
import SetupUsername from "./SetupUsername";
import SetupTags from "./SetupTags";

const SetupScreen = () => {

    const history = useHistory();

    const { userId, accountId } = useParams();

    const usernameComplete = () => history.push(`/user/id/${userId}/account/id/${accountId}/setup/tags`);
    const tagComplete = () => window.location.href = `/user/id/${userId}/account/id/${accountId}`;

    return (
        <Row type="flex" justify="space-around" align="middle" style={{minHeight: "100%"}}>
            <Col md={12} sm={12}>
                <Switch>
                    <Route path="/user/id/:userId/account/id/:accountId/setup/username">
                        <SetupUsername complete={usernameComplete} showSteps={true}/>
                    </Route>
                    <Route path="/user/id/:userId/account/id/:accountId/setup/tags">
                        <SetupTags initialTags={[]} complete={tagComplete} showSteps={true}/>
                    </Route>
                </Switch>
            </Col>
        </Row>
    );
};

export default SetupScreen
