import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import {AccountId} from "./";

export const Account = () => {

    let { path } = useRouteMatch();
    console.log("path in account",path)

    return (
        <Switch>
            <Route exact path={path}>
                <h3>Please select an account.</h3>
            </Route>
            <Route path={`${path}/id/:accountId`}>
                <AccountId />
            </Route>
        </Switch>
    );
};
