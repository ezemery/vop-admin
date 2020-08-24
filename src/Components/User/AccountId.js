import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch, useParams,
} from "react-router-dom";
import {TikTokList} from "../TikTok";
import {SetupScreen} from "../Setup";
import {Embed} from "../Embed";
import {Settings} from "../Settings";
import {AppFrame} from "../Frame";
import {UserStore} from "../../Context/store";
import {findUserInUsersById} from "../../services";

export const AccountId = () => {

    let { path } = useRouteMatch();

    const { userId } = useParams();
    const {user} = React.useContext(UserStore);
    const foundUser = findUserInUsersById(user, userId)
    console.log("foundUser in accountId", foundUser, "path",path)
    return (
        <AppFrame>
            <Switch>
                <Route exact path={path}>

                    <TikTokList defaultStatus="new" key="index" hideSearch={true} approvalScreen={true} user={foundUser}/>
                </Route>
                <Route path={`${path}/setup`}>
                    <SetupScreen/>
                </Route>
                <Route path={`${path}/manage`}>
                    <TikTokList defaultStatus="approve" key="manage" user={foundUser} />
                </Route>
                <Route path={`${path}/settings`}>
                    <Settings/>

                </Route>
                <Route path={`${path}/embed`}>
                    <Embed/>
                </Route>
            </Switch>
        </AppFrame>
    );
};
