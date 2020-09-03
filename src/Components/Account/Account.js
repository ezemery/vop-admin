import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch, Redirect,
} from "react-router-dom";
import {AccountId} from "./AccountId";
import {AccountCreate} from "./AccountCreate";
import {UserStore} from "../../Context/store";

export const Account = () => {

    const { user } = React.useContext(UserStore);

    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                {user ?
                    <Redirect to={`/account/id/${user.id}`}/>
                    :
                    <Redirect to="/login"/>
                }
            </Route>
            <Route path={`${path}/create`}>
                <AccountCreate />
            </Route>
            {user ? <Route path={`${path}/id/:accountId`}>
                <AccountId />
            </Route> : <Redirect to="/login"/>}
        </Switch>
    );
};
