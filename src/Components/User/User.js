import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch, Redirect,
} from "react-router-dom";
import {UserId} from "./UserId";
import {UserStore} from "../../Context/store";

export const User = () => {

    let { path } = useRouteMatch();

    const {users} = React.useContext(UserStore);

    return users.length === 0 ? <Redirect to="/login" /> : (
        <Switch>
            <Route exact path={path}>
                { users.length > 1 ? <>Select a User</> : <Redirect to={`${path}/id/`+users[0].id} /> }
            </Route>
            <Route path={`${path}/id/:userId`}>
                <UserId />
            </Route>
        </Switch>
    );
};
