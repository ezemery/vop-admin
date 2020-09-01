import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch, Redirect,
} from "react-router-dom";
import {ShopifyRouter} from "./Shopify";

export const Connect = () => {

    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/shopify`}>
                <ShopifyRouter />
            </Route>
        </Switch>
    );
};
