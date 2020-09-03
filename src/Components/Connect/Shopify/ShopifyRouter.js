import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch, Redirect,
} from "react-router-dom";
import {ShopifyAuth} from "./ShopifyAuth";
import {ShopifyCallback} from "./ShopifyCallback";

export const ShopifyRouter = () => {

    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/callback`}>
                <ShopifyCallback/>
            </Route>
            <Route path={`${path}/auth`}>
                <ShopifyAuth />
            </Route>
        </Switch>
    );
};
