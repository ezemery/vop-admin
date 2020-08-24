import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch, useParams, Redirect,
} from "react-router-dom";
import {Account} from "./";
import {UserStore} from "../../Context/store";
import {findUserInUsersById} from "../../services";

export const UserId = () => {

    let { path, url } = useRouteMatch();
    const { userId } = useParams();
    const {user} = React.useContext(UserStore);
    const foundUser = findUserInUsersById(user, userId)
    console.log("foundUser in UserId", foundUser, "path",path, "url",url)
    return foundUser ? (
        <Switch>
            <Route exact path={path}>
                <Redirect to={`${url}/account/id/`+userId} />
            </Route>
            <Route path={`${path}/account`}>
                <Account />
            </Route>
        </Switch>
    ) : <Redirect to="/" />;
};

