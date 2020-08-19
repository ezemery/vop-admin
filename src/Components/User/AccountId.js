import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import TikTokList from "../TikTok/TikTokList";
import SetupScreen from "../Setup/SetupScreen";
import Embed from "../Embed/Embed";
import Settings from "../Settings/Settings";
import Frame from "../Frame/Frame";

const AccountId = () => {

    let { path } = useRouteMatch();

    return (
        <Frame>
            <Switch>
                <Route exact path={path}>

                    <TikTokList defaultStatus="new" key="index" hideSearch={true} approvalScreen={true}/>
                </Route>
                <Route path={`${path}/setup`}>
                    <SetupScreen/>
                </Route>
                <Route path={`${path}/manage`}>
                    <TikTokList defaultStatus="approve" key="manage" />
                </Route>
                <Route path={`${path}/settings`}>
                    <Settings/>

                </Route>
                <Route path={`${path}/embed`}>
                    <Embed/>
                </Route>
            </Switch>
        </Frame>
    );
};

export default AccountId;
