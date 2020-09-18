import React, {useEffect, useState} from 'react';
import {
  Switch,
  Route,
  Redirect,
  Link as ReactRouterLink,
} from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Loading, Frame} from '@shopify/polaris';
import {Login} from './Components/Login';
import {EmailConfirm} from './Components/EmailConfirm';
import {Create} from './Components/Signup';

import {Invite} from './Components/Invite';
import {PasswordReset} from './Components/PasswordReset';
import {Account} from "./Components/Account";
import {UserStore, VideoStore, AccountStore} from './Context/store';
import {getUsers, getVideos, logo} from './services';

import '@shopify/polaris/dist/styles.css';
import 'tailwindcss/dist/base.min.css';
import {Connect} from "./Components/Connect";
import {useUsers} from "./Hooks/user.hook";
import {useAccounts} from "./Hooks/account.hook";


const App = () => {
  const userContext = useUsers();
  const accountContext = useAccounts();
  const {account} = accountContext;
  const {user} = userContext;
  const userId = user ? user["id"] : null
  const accountId = account ? account["id"] : null
  useEffect(() => {
    userContext.fetchUserDataAsync();
  }, []);

  useEffect(() => {
    accountContext.fetchAccountDataAsync(userId);
  },[userId]);

  const updateContext = async () => {
    accountContext.fetchAccountDataAsync(userId);
  }

  const theme = {
    colors: {
      topBar: {
        background: '#212B36',
      },
    },
    logo: {
      width: 60,
      topBarSource: logo("#FFF"),
      accessibilityLabel: 'Vop',
    },
  };

  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

  function Link({children, url = '', external, ref, ...rest}) {
    // react-router only supports links to pages it can handle itself. It does not
    // support arbirary links, so anything that is not a path-based link should
    // use a reglar old `a` tag
    if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
      rest.target = '_blank';
      rest.rel = 'noopener noreferrer';
      return (
          <a href={url} {...rest}>
            {children}
          </a>
      );
    }

    return (
        <ReactRouterLink to={url} {...rest}>
          {children}
        </ReactRouterLink>
    );
  }

  return userContext.loading ? (
    <AppProvider theme={theme} i18n={enTranslations} linkComponent={Link}>
      <Frame>
        <Loading />
      </Frame>
    </AppProvider>
  ) : (
    <UserStore.Provider value={userContext}>
      <AccountStore.Provider value={{...accountContext, updateContext}}>
        <AppProvider theme={theme} i18n={enTranslations} linkComponent={Link}>
          <div
            className="App"
            style={{
              minHeight: '100vh',
              width: '100vw',
              backgroundColor: '#EEE',
            }}
          >
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/connect">
                <Connect />
              </Route>
              <Route path="/email/confirm">
                <EmailConfirm />
              </Route>
              <Route path="/password/reset/">
                <PasswordReset />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/invite">
                <Invite />
              </Route>
              <Route exact path="/">
                <Redirect to="/account"/>
              </Route>
              <Route path="/account">
                <Account />
              </Route>
            </Switch>
          </div>
        </AppProvider>
      </AccountStore.Provider>
    </UserStore.Provider>
  );
};

export default App;
