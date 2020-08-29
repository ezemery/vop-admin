import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch, useParams, Redirect,
} from "react-router-dom";
import {Account} from "./Account";
import {UserStore} from "../../Context/store";
import {findUserInUsersById} from "../../services";

export const UserId = () => {

    let { path, url } = useRouteMatch();

    const { userId } = useParams();
    const {users} = React.useContext(UserStore);
    const user = findUserInUsersById(users, userId)

    return user ? (
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
