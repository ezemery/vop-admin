import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch, useParams,
} from "react-router-dom";
import TikTokList from "../TikTok/TikTokList";
import SetupScreen from "../Setup/SetupScreen";
import Embed from "../Embed/Embed";
import Settings from "../Settings/Settings";
import Frame from "../Frame/Frame";
import {UserStore} from "../../Context/store";
import {findUserInUsersById} from "../../services";

const AccountId = () => {

    let { path } = useRouteMatch();

    const { userId } = useParams();
    const {users} = React.useContext(UserStore);
    const user = findUserInUsersById(users, userId)

    return (
        <Frame>
            <Switch>
                <Route exact path={path}>

                    <TikTokList defaultStatus="new" key="index" hideSearch={true} approvalScreen={true} user={user}/>
                </Route>
                <Route path={`${path}/setup`}>
                    <SetupScreen/>
                </Route>
                <Route path={`${path}/manage`}>
                    <TikTokList defaultStatus="approve" key="manage" user={user} />
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
