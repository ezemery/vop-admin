import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch, Redirect,
} from "react-router-dom";
import {UserId} from "./";
import {UserStore} from "../../Context/store";

export const User = () => {

    let { path } = useRouteMatch();
    const {user} = React.useContext(UserStore);
    console.log("path",path, "user", user)
    return user.length === 0 ? <Redirect to="/login" /> : (
        <Switch>
            <Route exact path={path}>
                { user.length > 1 ? <>Select a User</> : <Redirect to={`${path}/id/`+user[0].id} /> }
            </Route>
            <Route path={`${path}/id/:userId`}>
                <UserId />
            </Route>
        </Switch>
    );
};

