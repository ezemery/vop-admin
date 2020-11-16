import React from 'react';
import {Switch, Route, useRouteMatch, useParams, Redirect} from 'react-router-dom';
import {TikTokList} from '../TikTok';
import {Embed, CustomizeEmbed} from '../Embed';
import {Settings} from '../Settings';
import {Shop, CreateShop, ViewShop, EditShop} from '../Shop';
import {ConnectAccount, TiktokConnect} from '../ConnectAccount';

import {AppFrame} from '../Frame';
import {UserStore} from '../../Context/store';

export const AccountId = () => {
  const {path, url} = useRouteMatch();

  const {user} = React.useContext(UserStore);



  return (
    <AppFrame>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/awaiting`} />
        </Route>
        <Route path={`${path}/awaiting`}>
          <TikTokList
              defaultStatus="new"
              key="index"
              hideSearch
              approvalScreen
              user={user}
          />
        </Route>
        <Route path={`${path}/connect/tiktok`}>
          <TiktokConnect />
        </Route>
        <Route path={`${path}/manage`}>
          <TikTokList defaultStatus="approve" key="manage" user={user} />
        </Route>
        <Route path={`${path}/settings`}>
          <Settings />
        </Route>
        <Route exact path={`${path}/embed`}>
          <Embed />
        </Route>
        <Route path={`${path}/embed/customize`}>
          <CustomizeEmbed />
        </Route>
        <Route exact path={`${path}/connect`}>
          <ConnectAccount />
        </Route>
        <Route exact path={`${path}/shop`}>
          <Shop />
        </Route>
        <Route path={`${path}/shop/create`}>
          <CreateShop />
        </Route>
        <Route exact path={`${path}/shop/:shop_id`}>
          <ViewShop />
        </Route>
        <Route path={`${path}/shop/edit/:shop_id`}>
          <EditShop />
        </Route>
      </Switch>
    </AppFrame>
  );
};
