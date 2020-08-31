import React from 'react';
import {Switch, Route, useRouteMatch, useParams} from 'react-router-dom';
import {TikTokList} from '../TikTok';
import {Embed} from '../Embed';
import {Settings} from '../Settings';
import {ConnectAccount, TiktokConnect} from '../ConnectAccount';

import {AppFrame} from '../Frame';
import {UserStore} from '../../Context/store';
import {findUserInUsersById} from '../../services';

export const AccountId = () => {
  const {path} = useRouteMatch();

  const {userId} = useParams();
  const {users} = React.useContext(UserStore);
  const user = findUserInUsersById(users, userId);

  return (
    <AppFrame>
      <Switch>
        <Route exact path={path}>
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
        <Route path={`${path}/embed`}>
          <Embed />
        </Route>
        <Route path={`${path}/connect`}>
          <ConnectAccount />
        </Route>
      </Switch>
    </AppFrame>
  );
};
